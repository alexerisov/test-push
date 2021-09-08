import React from 'react';
import { useRouter } from 'next/router';
import {LayoutModal} from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import { PUBLISH_STATUS } from "@/utils/datasets";

import classes from "./upload-successful.module.scss";

function UploadSuccessful (props) {
  const router = useRouter();

  function handleClick (e) {
    e.preventDefault();
    router.push(`/recipe/${props?.pk}`);
    props.dispatch(modalActions.close());
  }

  const onCancel = () => {
    router.push(`/recipe/${props?.pk}`);
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.UploadSuccess}>
      <img src="/images/index/upload_success.svg" alt="Success"></img>
      {!props.handleClick &&
        <h2 className={classes.UploadSuccess__title}>
          {props.publishStatus === PUBLISH_STATUS.published
            ? 'Recipe submitted to EatChefs Administration team for approval'
            : 'Recipe has been saved'
          }
        </h2>
      }

      {props.handleClick &&
        <h2 className={classes.UploadSuccess__title}>
          {"Chef's Pencil submitted to EatChefs Administration team"}
        </h2>
      }
      <button
        type="button"
        className={classes.UploadSuccess__button}
        onClick={props.handleClick ?? handleClick}
      >
        {props.handleClick ? "Return to home" : "See preview" }
      </button>
    </div>;
  };

  return (
      <LayoutModal
        onClose={props.handleCancel ?? onCancel}
        themeName="white_small"
      >
        {renderContent()}
      </LayoutModal>
  );
}

export default connect()(UploadSuccessful);
