import React from 'react';
import { connect } from 'react-redux';
import { modalActions } from '@/store/actions';
import * as modals from './config';
import { CSSTransition } from 'react-transition-group';
import { isWindowExist } from '@/utils/isTypeOfWindow';



const Modals = (props) => {
  const getModal = () => {
    const { modal, dispatch } = props;
    const modalProps = {
      ...modal.params,
      history: props.history,
      close: (result) => {
        dispatch(modalActions.close(result));
      },
    };
    if (modal.show) {
      if (!(modal.params && modal.params.noOverflow)) {
        hideBodyOverflow();
      }
      if (modals[modal.name]) {
        const Component = modals[modal.name];
        return <Component {...modalProps} />;
      }
    } else {
      resetBodyOverflow();
    }
    return null;
  };

  const hideBodyOverflow = () => {
    if (isWindowExist()) {
      document.body.classList.add('open-modal');
    }
  };

  const resetBodyOverflow = () => {
    if (isWindowExist()) {
      document.body.classList.remove('open-modal');
    }
  };

  return (
    <CSSTransition
      in={props.modal.show}
      timeout={300}
      classNames='modal-anim'
      onEnter={() => hideBodyOverflow()}
      onExited={() => resetBodyOverflow()}>
      <>{getModal()}</>
    </CSSTransition>
  );
};

export default connect((state) => ({
  modal: state.modal,
}))(Modals);
