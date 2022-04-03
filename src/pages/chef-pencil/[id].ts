import ChefPencil from '@/api/ChefPencil.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { ChefPencilPage } from '@/components/pages/chef-pencil/ChefPencilPage';
import { GetServerSideProps } from 'next';

export default ChefPencilPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params.id;

  try {
    const response = await ChefPencil.getTargetChefPencil(id);
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
};
