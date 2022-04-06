import { Session } from 'next-auth';
import { useEffect, useMemo } from 'react';
import useSwr, { mutate } from 'swr';
import http from '@/utils/http';
import log from 'loglevel';
import { useSession } from 'next-auth/react';

const REFRESH_INTERVAL = 5 * 60; // in seconds
const sessionUrl = '/api/auth/session';

async function fetcher(url: string) {
  try {
    const response = await fetch(url);
    await log.debug(response);
    if (!response.ok) {
      throw new Error(`Could not fetch session from ${url}`);
    }

    const session: Session = await response?.json();

    if (!session || Object.keys(session).length === 0) {
      return null;
    }
  } catch (e) {
    log.error(e);
  }
}

export function useAuth(refreshInterval: number = REFRESH_INTERVAL) {
  // const { data, error } = useSwr('/api/auth/session', fetcher, {
  //   revalidateOnFocus: true,
  //   revalidateOnMount: true,
  //   revalidateOnReconnect: true
  // });
  //
  // useEffect(() => {
  //   const intervalId = setInterval(() => mutate(sessionUrl), (refreshInterval || REFRESH_INTERVAL) * 1000);
  //
  //   return () => clearInterval(intervalId);
  // }, []);
  const { data, status } = useSession();

  return useMemo(
    () => ({
      session: data,
      status
    }),
    [status, data]
  );
}
