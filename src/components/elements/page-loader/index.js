import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const PageLoader = ({ duration = 500 }) => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(
      function () {
        setDisplay(false);
      },
      duration
    );
  }, []);

  return (
    <>
      {display ?
        <p>load</p> : null}
    </>
  );
};

export default connect()(PageLoader);
