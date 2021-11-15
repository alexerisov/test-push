import React, { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { NoSsr } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    marginRight: 43
  },
  [theme.breakpoints.only('xs')]: {
    container: {
      padding: '2px 0 24px 0 '
    },
    title: {
      fontSize: '22px',
      lineHeight: '27px',
      margin: 9,
      textAlign: 'center'
    }
  },
  [theme.breakpoints.only('sm')]: {
    container: {
      padding: '18px  0 36px 0'
    },
    title: {
      fontSize: '24px',
      lineHeight: '29px'
    }
  },
  [theme.breakpoints.up('md')]: {
    container: {
      padding: '32px  0 54px 0'
    },
    title: {
      fontSize: '30px',
      lineHeight: '37px'
    }
  }
}));

const StyledTabs = withStyles(theme => ({
  flexContainer: {
    gap: 18,
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      padding: '2px 0 24px 0 ',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6
    },
    [theme.breakpoints.only('sm')]: {
      padding: '18px  0 36px 0'
    },
    [theme.breakpoints.up('md')]: {
      padding: '32px  0 54px 0'
    }
  },
  indicator: {
    display: 'none'
  }
}))(props => <Tabs {...props} />);

const StyledTab = withStyles(theme => ({
  root: {
    opacity: 1,
    padding: '0 20px',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
    borderRadius: '11px',
    textTransform: 'none',
    fontStyle: 'normal',
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.only('xs')]: {
      lineHeight: '16px',
      fontSize: '20px',
      borderWidth: 1,
      borderRadius: '5px'
    },
    [theme.breakpoints.only('sm')]: {
      lineHeight: '18px',
      fontSize: '22px',
      borderRadius: '5px'
    },
    [theme.breakpoints.only('md')]: {
      lineHeight: '29px',
      fontSize: '24px'
    },
    [theme.breakpoints.up('lg')]: {
      lineHeight: '29px',
      fontSize: '24px'
    }
  },
  selected: {
    cursor: 'default',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      color: 'white'
    }
  }
}))(props => <Tab disableRipple {...props} />);

export const CartTabs = props => {
  const { selectedTab, onTabChange } = props;
  const styles = useStyles();

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  return (
    <>
      <NoSsr>
        <StyledTabs value={selectedTab} onChange={onTabChange} aria-label="simple tabs example">
          <div className={styles.title}>Cart</div>
          <StyledTab label="Dishes" {...a11yProps(1)} />
          <StyledTab label="Ingredients" {...a11yProps(2)} />
        </StyledTabs>
      </NoSsr>
    </>
  );
};
