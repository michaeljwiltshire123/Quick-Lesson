import { getAccessToken } from './googleAuth';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  iconLink?: string;
  modifiedTime?: string;
}

export const fetchRecentDriveFiles = async (): Promise<DriveFileItem[]> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const query = encodeURIComponent("trashed = false and (mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.presentation' or mimeType = 'application/pdf')");
  const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&pageSize=10&fields=files(id,name,mimeType,webViewLink,iconLink,modifiedTime)&orderBy=modifiedTime desc`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to fetch files from Google Drive.');
  }

  const data = await res.json();
  return data.files || [];
};

export const saveLessonPlanToDrive = async (
  fileName: string,
  content: string
): Promise<{ id: string; webViewLink?: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const metadata = {
    name: `${fileName}.txt`,
    mimeType: 'text/plain',
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
    content +
    closeDelimiter;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to save file to Google Drive.');
  }

  return await res.json();
};
