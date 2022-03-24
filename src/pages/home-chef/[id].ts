import 'pure-react-carousel/dist/react-carousel.es.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { HomeChefPage } from '@/components/pages/home-chef/HomeChefPage';

export default HomeChefPage;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  };
}
