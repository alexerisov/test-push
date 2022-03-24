import Cookies from 'cookies';
import ChefPencil from '@/api/ChefPencil.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { ChefPencilPage } from '@/components/pages/chef-pencil/ChefPencilPage';

export default ChefPencilPage;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const cookies = new Cookies(context.req, context.res);
  const targetCookies = cookies.get('aucr');
  const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));

  try {
    const response = await ChefPencil.getTargetChefPencil(id, token);
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        pencilData: response.data,
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        notFound: true
      }
    };
  }
}
