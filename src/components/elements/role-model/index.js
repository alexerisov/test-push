import React from 'react';
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import styles from './role-model.module.scss';

const useStyles = makeStyles({
  root: {
    width: "95px",
    height: "95px",
    marginBottom: "6px",
    border: "1px solid #ffaa00"
  }
});

const RoleModel = ({ name, avatar }) => {
  const classes = useStyles();

  return (
    <div className={styles.wrapper}>
      <Avatar src={avatar} classes={{root: classes.root}}/>
      <p className={styles.name}>{name ?? 'No name'}</p>
    </div>
  );
};

export default RoleModel;
