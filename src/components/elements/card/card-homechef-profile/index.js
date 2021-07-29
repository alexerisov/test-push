import React from 'react';
import { makeStyles } from "@material-ui/core";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import classes from "./index.module.scss";

import hat from './hat.svg';
import bulb from './bulb.svg';
import rocket from './rocket.svg';

const useStyles = makeStyles({
  content: {
    padding: 0
  },
  root: {
    boxShadow: "0px 0px 20px #4848480F !important"
  }
});

const CardHomeChefProfile = ({ list, type }) => {
  const cardStyles = useStyles();

  const choosePhoto = (type) => {
    switch (type) {
      // Cooking_philosophy
      case 1:
        return hat;
      // Personal_cooking_mission
      case 2:
        return rocket;
      // Source_of_inspiration
      case 3:
        return bulb;
    }
  };

  const chooseTitle = (type) => {
    switch (type) {
      // Cooking_philosophy
      case 1:
        return 'Cooking philosophy';
      // Personal_cooking_mission
      case 2:
        return 'Personal cooking mission';
      // Source_of_inspiration
      case 3:
        return 'Source of inspiration';
    }
  };

  return (
    <Card className={classes.card} classes={{root: cardStyles.root}}>
      <CardContent classes={{root: cardStyles.content}}>
        <p className={classes.title}>{chooseTitle(type)}</p>

        <div className={classes.listContainer}>
          <img className={classes.image} src={choosePhoto(type)} alt="image"/>

          <ul className={classes.list}>
            {list?.length &&
            list.map((item, index) => (
              <li key={`homechef-card-${index}`} className={classes.item}>
                  <span className={classes.item__circle}>
                    {index + 1}
                  </span>

                <p className={classes.item__text}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardHomeChefProfile;
