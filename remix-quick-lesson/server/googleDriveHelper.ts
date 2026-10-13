export interface DriveClientLike {
  files: {
    list: (params: { q: string; fields?: string; spaces?: string }) => Promise<{
      data?: { files?: Array<{ id?: string | null; name?: string | null }> };
    }>;
    create: (params: {
      requestBody: { name: string; mimeType: string; parents?: string[] };
      fields?: string;
    }) => Promise<{
      data?: { id?: string | null; name?: string | null };
    }>;
    update?: (params: {
      fileId: string;
      addParents?: string;
      removeParents?: string;
      fields?: string;
    }) => Promise<{
      data?: any;
    }>;
  };
}

/**
 * Searches for or creates the dedicated 'Quick Lesson' folder in Google Drive.
 */
export async function findOrCreateQuickLessonFolder(
  driveClient: DriveClientLike
): Promise<string> {
  const query = "mimeType = 'application/vnd.google-apps.folder' and name = 'Quick Lesson' and trashed = false";
  const listRes = await driveClient.files.list({
    q: query,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  const files = listRes.data?.files || [];
  if (files.length > 0 && files[0].id) {
    return files[0].id;
  }

  const createRes = await driveClient.files.create({
    requestBody: {
      name: 'Quick Lesson',
      mimeType: 'application/vnd.google-apps.folder',
    },
    fields: 'id',
  });

  if (!createRes.data?.id) {
    throw new Error('Failed to create Quick Lesson folder in Google Drive.');
  }

  return createRes.data.id;
}
