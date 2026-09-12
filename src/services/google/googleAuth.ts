import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseConfig from '../../../firebase-applet-config.json';
import { GoogleUser } from '../../types/workspace';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const GOOGLE_CLIENT_ID = '83313259481-7a4qfskhhkfer4etpbmg655ki24be5uk.apps.googleusercontent.com';

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/forms.body',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.students',
  'https://www.googleapis.com/auth/classroom.courseworkmaterials',
];

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach((scope) => provider.addScope(scope));

let cachedAccessToken: string | null = null;
let cachedUser: GoogleUser | null = null;
let isSigningIn = false;

const fetchUserInfo = async (token: string): Promise<GoogleUser> => {
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const d = await res.json();
      return { uid: d.sub || 'google-user', displayName: d.name || 'Google Teacher', email: d.email, photoURL: d.picture };
    }
  } catch { /* ignore */ }
  return { uid: 'google-user', displayName: 'Google Teacher', email: '', photoURL: '' };
};

export const initAuth = (onSuccess?: (user: GoogleUser, token: string) => void, onFailure?: () => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if ((user || cachedUser) && cachedAccessToken) {
      const u = cachedUser || { uid: user?.uid || 'user', displayName: user?.displayName || 'Teacher', email: user?.email || undefined, photoURL: user?.photoURL || undefined };
      if (onSuccess) onSuccess(u, cachedAccessToken);
    } else if (!isSigningIn) {
      cachedAccessToken = null;
      cachedUser = null;
      if (onFailure) onFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: GoogleUser; token: string } | null> => {
  isSigningIn = true;
  try {
    const g = (window as any)?.google?.accounts?.oauth2;
    if (g?.initTokenClient) {
      return await new Promise((resolve, reject) => {
        const client = g.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: WORKSPACE_SCOPES.join(' '),
          callback: async (resp: any) => {
            if (resp.error) return reject(new Error(resp.error_description || resp.error));
            cachedAccessToken = resp.access_token;
            const u = await fetchUserInfo(resp.access_token);
            cachedUser = u;
            resolve({ user: u, token: resp.access_token });
          },
        });
        client.requestAccessToken({ prompt: 'consent' });
      });
    }
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) throw new Error('Could not retrieve access token from Google.');
    cachedAccessToken = credential.accessToken;
    const u: GoogleUser = { uid: result.user.uid, displayName: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL };
    cachedUser = u;
    return { user: u, token: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => cachedAccessToken;

export const googleSignOut = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
  cachedUser = null;
};

