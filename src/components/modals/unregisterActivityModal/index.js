import React from 'react';
import { LayoutModal } from '@/components/layouts';
import { useActions } from '@/customHooks/useActions';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { modalActions } from '@/store/actions';
import classes from './index.module.scss';
import { useDispatch } from 'react-redux';

const topBtn = makeStyles({
  root: {
    width: '196px !important',
    height: '43px !important',
    margin: '26px 0 10px'
  }
});

const botBtn = makeStyles({
  root: {
    width: '166px !important',
    height: '43px !important'
  }
});

function UnregisterActivityModal(props) {
  const dispatch = useDispatch();

  const registationBtn = topBtn();
  const signInBtn = botBtn();

  const onCancel = () => {
    dispatch(modalActions.close());
  };
  //HEREeeeeeeeeeeee
  const toRegister = () => {
    dispatch(modalActions.open(''));
  };
  const toLogin = () => {
    dispatch(modalActions.open('register'));
  };
  const renderContent = () => {
    return (
      <div className={classes.modal}>
        <h3 className={classes.modal__title}>Put Your Dishes in the Spotlight!</h3>
        <p className={classes.modal__subtitle}>Join Eatchefs and Let Foodies Feast </p>
        <p className={classes.modal__subtitle}>Their Eyes on Your Skills</p>
        <Button classes={{ root: registationBtn.root }} variant="contained" color="primary" onClick={toRegister}>
          Join EatChefs
        </Button>
        <Button classes={{ root: signInBtn.root }} variant="contained" color="primary" onClick={toLogin}>
          Sign In
        </Button>
      </div>
    );
  };
  return (
    <LayoutModal onClose={onCancel} themeName="white_medium">
      {renderContent()}
    </LayoutModal>
  );
}

export default UnregisterActivityModal;
