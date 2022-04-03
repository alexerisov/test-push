import React from 'react';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import close from './close.svg';

import styles from './searchDrawer.module.scss';

const MyDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 100%;
    padding: 19px 17px;
  }

  .MuiButtonBase-root {
    margin-right: 0;
  }

  .MuiTouchRipple-root {
    right: 20px;
  }
`;

const SearchDrawer = ({ children, toggleValue, toggleDrawer }) => {
  const list = anchor => (
    <div role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
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
      {['right'].map(anchor => (
        <React.Fragment key={anchor}>
          <div className={styles.drawer__toggle} onClick={toggleDrawer(anchor, true)}>
            <TuneIcon fontSize={'small'} />
          </div>
          <MyDrawer anchor={anchor} open={toggleValue[anchor]}>
            <img src={close} className={styles.drawer__closeIcon} onClick={toggleDrawer(anchor, false)} />
            {children}
          </MyDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SearchDrawer;
