import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { modalActions, profileActions } from '@/store/actions';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { WhyEatchefBlock } from '@/components/blocks/home-page/why-eatchef';
import { SearchBlock } from '@/components/blocks/home-page/search';
import { WeekMenuBlock } from '@/components/blocks/home-page/week-menu';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const useStyles = makeStyles({
  root: {
    '@media (max-width:576px)': {
      width: '160px !important',
      height: '32px !important',
      fontSize: '12px',
      lineHeight: '14.6px',
      fontWeight: '600',
      padding: 0
    }
  }
});

export const HomePage = props => {
  const router = useRouter();
  const USER_TYPE = {
    viewerType: 0,
    chefType: 1
  };
  const btnStyles = useStyles(props);
  const chefType = USER_TYPE.chefType;
  const viewerType = USER_TYPE.viewerType;
  const [meal, setMeal] = React.useState(null);
  const [weekmenu, setWeekmenu] = React.useState(null);
  const mobile = useMediaQuery('(max-width: 768px)');

  React.useEffect(() => {
    setMeal(props?.mealOfTheWeek);
    setWeekmenu(props?.weekmenu);
  }, []);

  React.useEffect(() => {
    props.dispatch(profileActions.init(props.account.profile));
  }, [props.account.profile]);

  const handleChangeStatus = () => {
    if (props?.profile?.data?.user_type === viewerType) {
      router.push('/profile/become-home-chef');
    } else {
      props.dispatch(modalActions.open('register'));
    }
  };

  const content = (
    <>
      <SearchBlock />
      <WeekMenuBlock data={props?.weekmenu} />
      <WhyEatchefBlock />
    </>
  );

  return (
    <div>
      <NextSeo
        title="Homemade food"
        openGraph={{
          url: `${props?.absolutePath}`,
          title: 'Homemade food'
        }}
      />
      <LayoutPageNew content={content} />
    </div>
  );
};
