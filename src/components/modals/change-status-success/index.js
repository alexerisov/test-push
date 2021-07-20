import React from 'react';
import {LayoutModal} from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./change-status-successful.module.scss";

function ChangeStatusSuccess (props) {
  
  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.ChangeSuccess}>
      <img src="/images/index/upload_success.svg" alt="Success"></img>
      <h2 className={classes.ChangeSuccess__title}>
        Congratulations!
      </h2>
      <p className={classes.ChangeSuccess__subtitle}>
        Now you are a Home Chef!
      </p>
    </div>;
  };

  return (
      <LayoutModal
        onClose={onCancel}
        themeName="white_small"
      >
        {renderContent()}
      </LayoutModal>
  );
}

export default connect()(ChangeStatusSuccess);
