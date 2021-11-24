import React from 'react';
import classes from './index.module.scss';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Collapse } from '@material-ui/core';

function a11yProps(index) {
  return {
    id: `inputs-block-tab-${index}`,
    'aria-controls': `inputs-block-tabpanel-${index}`
  };
}
const TabContext = React.createContext({});

export const InputsBlock = props => {
  const [value, setValue] = React.useState(0);
  const [isTabWillChange, setIsTabWillChange] = React.useState(true);

  const BlockTabs = [];
  const BlockBody = [];

  console.log('this', self);

  props.children.forEach(el => {
    console.log(el.type.name);
    if (el.props.isTabs) {
      BlockTabs.push(el);
    } else {
      BlockBody.push(el);
    }
  });

  const handleChange = (event, newValue) => {
    setIsTabWillChange(false);
    setTimeout(() => {
      setValue(newValue);
      setIsTabWillChange(true);
    }, 300);
  };

  return (
    <div className={classes.block}>
      <TabContext.Provider value={{ value, handleChange, isTabWillChange, setIsTabWillChange }}>
        <div className={classes.block__header}>
          <div className={classes.block__title}>{props.title}</div>
          {BlockTabs}
        </div>
        <div className={classes.block__body}>{BlockBody}</div>
      </TabContext.Provider>
    </div>
  );
};

const InputsBlockTab = props => {
  return <></>;
};

const InputsBlockTabs = props => {
  const context = React.useContext(TabContext);
  return (
    <Tabs
      disableRipple
      classes={{
        root: classes.tabs,
        indicator: classes.tabs__indicator,
        flexContainer: classes.tabs__container,
        scroller: classes.tabs__scroller
      }}
      value={context.value}
      onChange={context.handleChange}
      aria-label="inputs-block-tabs">
      {props.children?.length &&
        props.children.map((tab, i) => (
          <Tab
            key={i}
            disabled={tab.props.disabled}
            label={tab.props.label}
            {...a11yProps(i)}
            disableRipple
            classes={{ root: classes.tab, selected: classes.tab__selected }}
          />
        ))}
    </Tabs>
  );
};

const InputsBlockTabPanel = props => {
  const { children, index, ...other } = props;

  const context = React.useContext(TabContext);

  return (
    <Collapse direction="down" in={context.isTabWillChange} timeout={300} mountOnEnter unmountOnExit>
      <div
        className={classes.block__body}
        role="tabpanel"
        hidden={context.value !== index}
        id={`inputs-block-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {context.value === index && children}
      </div>
    </Collapse>
  );
};

InputsBlock.Tabs = InputsBlockTabs;
InputsBlock.Tab = InputsBlockTab;
InputsBlock.TabPanel = InputsBlockTabPanel;
