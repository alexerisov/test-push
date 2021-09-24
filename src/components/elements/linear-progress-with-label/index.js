import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import classes from './index.module.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function LinearProgressWithLabel(props) {
  const mobile = useMediaQuery('(max-width:576px)');

  return (
    <div className={classes.linearProgress}>
      <Box width={!mobile ? '200px' : '120px'} mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </div>
  );
}

export default LinearProgressWithLabel;
