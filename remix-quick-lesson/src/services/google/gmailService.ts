import { getAccessToken } from './googleAuth';

export const createOrSendLessonEmail = async (
  recipient: string,
  subject: string,
  body: string,
  sendImmediately = false
): Promise<{ id: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const emailLines = [
    `To: ${recipient}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    body,
  ];
  const emailContent = emailLines.join('\r\n');

  // Base64url encode the message
  const base64Encoded = btoa(unescape(encodeURIComponent(emailContent)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const endpoint = sendImmediately
    ? 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send'
    : 'https://gmail.googleapis.com/gmail/v1/users/me/drafts';

  const payload = sendImmediately
    ? { raw: base64Encoded }
    : { message: { raw: base64Encoded } };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to dispatch email via Gmail.');
  }

  return await res.json();
};
