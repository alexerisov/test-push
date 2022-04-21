import type { GetServerSidePropsContext } from 'next';
import { ALLOWED_FILTERS } from '@/utils/datasets';

export default function getInitialFilters(context: GetServerSidePropsContext) {
  const query = context.query;
  const result = {};
  for (let key in query) {
    if (ALLOWED_FILTERS.includes(key)) {
      result[key] = query[key].split(',');
    }
  }
  return result;
}
