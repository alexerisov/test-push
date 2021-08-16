import React from 'react';
import classes from './index.module.scss';
import { notificationTypesText, notificationTypesTitle } from '@/utils/datasets';

const CardNotification = props => {
  const { id, code, data, payload, onDelete } = props;

  const { text, link } = notificationTypesText[code](payload);

  return (
    <div className={classes.card}>
      <h3 className={classes.card__title}>{notificationTypesTitle[code](payload) || ''}</h3>
      <a href={link} className={classes.card__text}>
        {text}
      </a>
      <p className={classes.card__data}>{data.slice(0, 10)}</p>
      <button
        className={classes.card__delete}
        onClick={() => {
          onDelete(id);
        }}></button>
    </div>
  );
};

export default CardNotification;
