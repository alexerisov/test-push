import React from 'react';
import LayoutModal from '@/components/layouts/modal';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './index.module.scss';

const InfoMessageModal = props => {
  const { title } = props;

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return (
      <div className={classes.info}>
        <h3 className={classes.info__title}>{title}</h3>
        <div className={classes.info__buttonContainer}>
          <button type="button" className={classes.info__button} onClick={onCancel}>
            Continue
          </button>
        </div>
      </div>
    );
  };

  return (
    <LayoutModal onClose={onCancel} themeName="white_small">
      {renderContent()}
    </LayoutModal>
  );
};

export default connect()(InfoMessageModal);
