import useSwr from 'swr';
import { getLogger } from 'loglevel';

const log = getLogger('next-auth');
const REFRESH_INTERVAL = 5 * 60 * 1000; // in seconds
const sessionUrl = '/api/auth/session';

export async function fetchSession() {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

// ### useSwr() approach works for now ###sign
export function useAuth(refreshInterval: number = REFRESH_INTERVAL) {
  const { data, error } = useSwr(sessionUrl, fetchSession, {
    refreshInterval: refreshInterval,
    onSuccess: data => log.debug({ message: 'Session fetched', data }),
    onError: err => log.error({ message: 'Session fetching error', error: err })
  });

  return {
    session: data,
    status: typeof data === 'undefined' && typeof error === 'undefined'
  };
}
