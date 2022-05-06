import type { GetServerSidePropsContext } from 'next';
import { ALLOWED_FILTERS } from '@/utils/datasets';
import type { NextRouter } from 'next/router';

export default function getInitialFilters(context: GetServerSidePropsContext | NextRouter) {
  const query = context.query;
  const result = {};
  for (let key in query) {
    if (ALLOWED_FILTERS.includes(key)) {
      result[key] = query[key].split(',');
    }
  }
  return result;
}
