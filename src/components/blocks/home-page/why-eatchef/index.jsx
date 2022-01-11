import React from 'react';
import classes from './index.module.scss';
import { Button, IconButton, OutlinedInput } from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';
import { ReactComponent as ArrowIcon } from '../../../../../public/icons/Arrow Right 2/Line.svg';
import { connect, useDispatch, useSelector } from 'react-redux';
import { accountActions, modalActions } from '@/store/actions';
import { useFormik } from 'formik';
import Image from 'next/image';
import { BasicIcon } from '@/components/basic-elements/basic-icon';

const CircleButton = () => {
  return (
    <IconButton className={classes.signup_input_button} style={{ background: '#FFAA00', color: 'white' }} size="32px">
      <ArrowIcon className={classes.signup_input_icon} />
    </IconButton>
  );
};

const SignUpInput = () => {
  const dispatch = useDispatch();

  const handleClickLogin = name => {
    return () => {
      dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  return (
    <OutlinedInput
      onClick={handleClickLogin('register')}
      name="email"
      placeholder="Enter your email"
      className={classes.signup_input}
      fullWidth
      endAdornment={<CircleButton />}
    />
  );
};

const UploadRecipeButton = () => (
  <Button
    endIcon={<BasicIcon icon={ArrowIcon} />}
    variant="contained"
    href="/recipe/upload"
    className={classes.signup_upload}>
    Upload Your Recipe
  </Button>
);

const SignUpBlock = () => {
  const isAuthorized = useSelector(state => state.account.hasToken);

  return (
    <div className={classes.signup}>
      <div className={classes.signup_title}>Why Eatchefs for Chefs? ‍🍳</div>
      <div className={classes.signup_description}>
        We’re giving ambitious at-home cooks the chance to get exposure for their culinary masterpieces!
      </div>

      <div className={classes.signup_step}>
        <div className={classes.signup_step_wrapper}>
          <div className={classes.signup_step_badge}>01</div>
          <span className={classes.signup_step_text}>Share your best meals</span>
        </div>
        <div className={classes.signup_step_wrapper}>
          <div className={classes.signup_step_badge}>02</div>
          <span className={classes.signup_step_text}>Sell your best recipes</span>
        </div>
      </div>
      {!isAuthorized && <SignUpInput />}
      {isAuthorized && <UploadRecipeButton />}
    </div>
  );
};

const ThreeImages = () => {
  const isAuthorized = useSelector(state => state.account.hasToken);

  return (
    <div>
      {!isAuthorized && (
        <Image src="/images/index/three-images.png" alt="image3" width={447} height={502} layout="responsive" />
      )}
      {isAuthorized && (
        <Image src="/images/index/two-images.png" alt="image3" width={447} height={502} layout="responsive" />
      )}
    </div>
  );
};

export const WhyEatchefBlock = props => {
  return (
    <section className={classes.layout}>
      <div className={classes.layout_column1}>
        <div className={classes.layout_column1}>
          <SignUpBlock dispatch={props.dispatch} />
        </div>
      </div>
      <div className={classes.layout_column2}>
        <ThreeImages />
      </div>
    </section>
  );
};
