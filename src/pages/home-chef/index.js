import React from 'react';
import { connect } from "react-redux";
import {withRouter} from "next/router";
import { Button, makeStyles } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

import { LayoutPage } from "@/components/layouts";
import HomeChefBlock from "@/components/blocks/home-chef-block/homeChefBlock";

import { CHEF_TYPE } from "@/utils/constants";
import {RedirectWithoutAuthAndByCheckingUserType} from "@/utils/authProvider";

import styles from "./index.module.scss";
import 'pure-react-carousel/dist/react-carousel.es.css';

const useButtonStyles = makeStyles({
  root: {
    position: 'relative',
    alignSelf: 'flex-end',
    width: "156px !important",
    height: "40px !important",
    padding: "5px 0",
    fontSize: '14px',
    borderWidth: '2px'
  },
  outlinedPrimary: {
    '&:hover': {
      borderWidth: '2px'
    },
  }
});

const HomeChef = ({ account }) => {
  const btnClasses= useButtonStyles();

  const content = (
    <div className={styles.profile}>
      <HomeChefBlock account={account} />

      <Button
        color="primary"
        variant="outlined"
        classes={{root: btnClasses.root, outlinedPrimary: btnClasses.outlinedPrimary}}
        href='/profile/account-settings'
      >
        <EditIcon classes={{root: styles.icon}}/>
        <span>Edit All Details</span>
      </Button>
    </div>
  );

  return (
      <LayoutPage content={content} />
  );
};

export default withRouter(RedirectWithoutAuthAndByCheckingUserType(connect((state) => ({
  account: state.account,
}))(HomeChef), CHEF_TYPE));
