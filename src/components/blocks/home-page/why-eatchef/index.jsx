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
import { useTranslation } from 'next-i18next';

const CircleButton = () => {
  return (
    <IconButton className={classes.signup_input_button} style={{ background: '#FFAA00', color: 'white' }} size="32px">
      <ArrowIcon className={classes.signup_input_icon} />
    </IconButton>
  );
};

const SignUpInput = () => {
  const { t } = useTranslation('homePage');
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
      placeholder={t('whyEatchefBlock.emailInputPlaceholder')}
      className={classes.signup_input}
      fullWidth
      endAdornment={<CircleButton />}
    />
  );
};

const UploadRecipeButton = () => {
  const { t } = useTranslation('homePage');

  return (
    <Button
      endIcon={<BasicIcon icon={ArrowIcon} />}
      variant="contained"
      href="/recipe/upload"
      className={classes.signup_upload}>
      {t('whyEatchefBlock.buttonText')}
    </Button>
  );
};

const SignUpBlock = () => {
  const { t } = useTranslation('homePage');
  const isAuthorized = useSelector(state => state.account.hasToken);

  return (
    <div className={classes.signup}>
      <div className={classes.signup_title}>{t('whyEatchefBlock.title')}</div>
      <div className={classes.signup_description}>{t('whyEatchefBlock.subtitle')}</div>

      {!isAuthorized && (
        <div className={classes.signup_step}>
          <div className={classes.signup_step_wrapper}>
            <div className={classes.signup_step_badge}>01</div>
            <span className={classes.signup_step_text}>{t('whyEatchefBlock.step1')}</span>
          </div>
          <div className={classes.signup_step_wrapper}>
            <div className={classes.signup_step_badge}>02</div>
            <span className={classes.signup_step_text}>{t('whyEatchefBlock.step2')}</span>
          </div>
        </div>
      )}
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
