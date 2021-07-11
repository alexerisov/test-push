import React from 'react';

const LayoutModal = (props) => {
  const onClose = (event) => {
    event.preventDefault();
    props.onClose();
  };

  const onCloseOverflow = (event) => {
    if (props.overflowClose && event.target?.dataset?.modal === 'overflow') {
      onClose(event);
    }
  };

  const { children, header, footer, overflowTransparent, toolClose, themeName = "default" } = props;

  return (
    <div
      data-modal='overflow'
      className={`LayoutModalOverflow
      ${overflowTransparent ? 'LayoutModalOverflow_transparent' : ''}`}
      onClick={(e) => onCloseOverflow(e)}>
      <div className={`LayoutModal LayoutModal_theme_${themeName}`}>
        {toolClose ? (
          <a className='LayoutModal__close' href='#' onClick={onClose}>
            &#128473;
          </a>
        ) : null}

        <div className='LayoutModal__inner'>
          {header && (
            <div className='LayoutModal__header'>
              <h2>{header}</h2>
            </div>
          )}
          <div className='LayoutModal__content'>{children}</div>
          {footer && <div className='LayoutModal__footer'>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

LayoutModal.defaultProps = {
  onClose: () => { },
  overflowTransparent: false,
  overflowClose: true,
  toolClose: true,
};

export default LayoutModal;
