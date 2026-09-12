import { getAccessToken } from './googleAuth';
import { PickerSelectedDoc } from '../../types/workspace';

declare const window: any;
declare const google: any;
declare const gapi: any;

export const loadGooglePickerApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.google?.picker) {
      resolve();
      return;
    }
    if (typeof window !== 'undefined' && window.gapi) {
      window.gapi.load('picker', {
        callback: () => resolve(),
        onerror: () => reject(new Error('Unable to load Google Picker library.')),
      });
    } else {
      reject(new Error('Google API client script not yet loaded.'));
    }
  });
};

export const openGooglePicker = async (
  onSelect: (doc: PickerSelectedDoc) => void
): Promise<void> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('Please sign in to Google to browse Drive files.');
  }

  await loadGooglePickerApi();

  const pickerOrigin =
    window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
      ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
      : window.location.origin;

  const docsView = new google.picker.DocsView(google.picker.ViewId.DOCS)
    .setIncludeFolders(true)
    .setSelectFolderEnabled(false);

  const picker = new google.picker.PickerBuilder()
    .addView(docsView)
    .setOAuthToken(token)
    .setCallback((data: any) => {
      if (data.action === google.picker.Action.PICKED) {
        const file = data.docs?.[0];
        if (file) {
          onSelect({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            url: file.url,
            description: file.description || '',
          });
        }
      }
    })
    .setOrigin(pickerOrigin)
    .build();

  picker.setVisible(true);
};
