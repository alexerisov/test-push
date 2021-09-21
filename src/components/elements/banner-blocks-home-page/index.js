import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { USER_TYPE } from '@/utils/datasets';
import { modalActions } from '@/store/actions';

const BannerBlocksHomePage = props => {
  const router = useRouter();

  const handleChangeStatus = () => {
    if (props?.profile?.data?.user_type === USER_TYPE.viewerType) {
      router.push('/profile/become-home-chef');
    } else {
      props.dispatch(modalActions.open('register'));
    }
  };

  const blocksButtons = {
    chef: () => {
      const button =
        props?.profile?.data?.user_type === USER_TYPE.chefType ? (
          <button type="button" onClick={() => router.push('/recipe/upload')} className={classes.blocksButtons}>
            I'm A Chef
          </button>
        ) : (
          <button type="button" onClick={handleChangeStatus} className={classes.blocksButtons}>
            I'm A Chef
          </button>
        );

      return button;
    },
    foodie: () => {
      const button = props?.account?.hasToken ? (
        <button type="button" onClick={() => router.push('/search')} className={classes.blocksButtons}>
          I'm A Foodie
        </button>
      ) : (
        <button type="button" onClick={handleChangeStatus} className={classes.blocksButtons}>
          I'm A Foodie
        </button>
      );

      return button;
    }
  };

  return (
    <div className={classes.itemBlocks}>
      <img src={props.item.image} alt="banner" className={classes.itemBlocks__icon} />
      <div>
        <h3 className={classes.itemBlocks__title}>{props.item.title}</h3>
        <p className={classes.itemBlocks__description}>{props.item.text}</p>
        {blocksButtons[props.item.button] && blocksButtons[props.item.button]()}
      </div>
    </div>
  );
};

export default connect(state => ({
  account: state.account,
  profile: state.profile
}))(BannerBlocksHomePage);
