import { Slider } from '@material-ui/core';
import React from 'react';
import ArrowDownIcon from '~public/icons/Arrow Down Simple/Line.svg';
import Accordion from '@material-ui/core/Accordion';
import { makeStyles, styled } from '@material-ui/core/styles';

const MySlider = styled(Slider)(() => ({
  color: '#FFAA00',
  height: 2,

  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#FFAA00',
    marginTop: '-9px',
    border: '3px solid #fff',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)'
    }
  },
  '& .MuiSlider-track': {
    height: 2
  },
  '& .MuiSlider-rail': {
    color: '#E6E8EC',
    height: 2
  }
}));

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  font-size: 24px;
  fill: #777e91;
`;

const StyledAccordion = styled(Accordion)`
  background: transparent;

  p {
    font-size: 16px;
    font-weight: 600;
  }

  .MuiAccordionSummary-expandIcon {
    margin-right: 0;
  }

  .MuiAccordionSummary-expandIcon.Mui-expanded {
    div {
      div:last-of-type {
        transform: none;
      }
    }
  }
`;

const useStyledTooltip = makeStyles({
  tooltip: {
    padding: '5px 5px !important',
    fontSize: '16px'
  }
});

const MobileFiltersBlock = ({ formik }) => {
  const TooltipStyles = useStyledTooltip();
  return (

  );
};

export default MobileFiltersBlock;
