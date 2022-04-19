import { useMemo } from 'react';
import useSwr from 'swr';
import log from 'loglevel';

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
    onSuccess: data => log.debug({ message: 'session fetched', data }),
    onError: err => log.error({ message: 'session fetching error', error: err })
  });

  return {
    session: data,
    status: typeof data === 'undefined' && typeof error === 'undefined'
  };
}
