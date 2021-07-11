import React from 'react';
import { useRouter } from 'next/router';
import {LayoutModal} from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./upload-successful.module.scss";

function UploadSuccessful (props) {
  const router = useRouter();

  function handleClick (e) {
    e.preventDefault();
    router.push('/profile/account-settings');
    props.dispatch(modalActions.close());
  }

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.UploadSuccess}>
      <img src="/images/index/upload_success.svg" alt="Success"></img>
      <h2 className={classes.UploadSuccess__title}>
        Recipe successfully upload
      </h2>
      <button
        type="button"
        className={classes.UploadSuccess__button}
        onClick={handleClick}
      >
        See prewiew
      </button>
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

export default connect()(UploadSuccessful);
