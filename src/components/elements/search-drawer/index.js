import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TuneIcon from '@material-ui/icons/Tune';

import styles from './searchDrawer.module.scss';

const SearchDrawer = ({ children }) => {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={styles.drawer__toggle} onClick={toggleDrawer(anchor, true)} c>
            <TuneIcon fontSize={'small'}/>
          </div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {children}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SearchDrawer;
