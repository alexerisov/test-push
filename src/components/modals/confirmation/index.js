import React from 'react';
import {LayoutModal} from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./index.module.scss";
import { Button } from "@material-ui/core";

function Сonfirmation (props) {

  const onСonfirm = (e) => {
    e.preventDefault();
    props.dispatch(modalActions.close(true));
  }

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.confirmation}>
      <form className={classes.confirmation__form}>
        <h2>Are you sure?</h2>
        <Button
          type="submit"
          variant='contained'
          color='primary'
          onClick={onСonfirm}
        >
          Confirm
        </Button>
      </form>
    </div>
  }

  return (
      <LayoutModal
          onClose={onCancel}
          themeName="white">
          {renderContent()}
      </LayoutModal>
  );
}

export default connect()(Сonfirmation);
