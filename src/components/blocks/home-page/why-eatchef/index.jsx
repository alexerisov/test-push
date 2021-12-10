import React from 'react';
import classes from './index.module.scss';
import { IconButton, OutlinedInput } from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';
import { ReactComponent as ArrowIcon } from '../../../../../public/icons/Arrow Right 2/Line.svg';

const CircleButton = () => (
  <IconButton className={classes.signup_input_button} style={{ background: '#FFAA00', color: 'white' }} size="32px">
    <ArrowIcon className={classes.signup_input_icon} />
  </IconButton>
);

const SignUpInput = () => <OutlinedInput className={classes.signup_input} fullWidth endAdornment={<CircleButton />} />;

const SignUpBlock = () => {
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
      <SignUpInput />
    </div>
  );
};

const ThreeImages = () => {
  return (
    <div>
      <img src="/images/index/three-images.png" alt="image3" className={classes.three_images} />
    </div>
  );
};

export const WhyEatchefBlock = () => {
  return (
    <section className={classes.layout}>
      <div className={classes.layout_column1}>
        <div className={classes.layout_column1}>
          <SignUpBlock />
        </div>
      </div>
      <div className={classes.layout_column2}>
        <ThreeImages />
      </div>
    </section>
  );
};
