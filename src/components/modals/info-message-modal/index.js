import React from 'react';
import { LayoutModal } from '@/components/layouts/modal';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';

const InfoMessageModal = (props) => {
  const alertTitle = props.type === 'success' ? "Success" : props.type === 'error' ? "Error" : null;

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  return (
    <LayoutModal
      onClose={onCancel}>
      <Alert style={{ fontSize: '20px' }} severity={props.type}>
        <AlertTitle style={{ fontSize: '25px' }}>{alertTitle}</AlertTitle>
        {props.modalText}
      </Alert>
    </LayoutModal>
  );
};

export default connect()(InfoMessageModal);
