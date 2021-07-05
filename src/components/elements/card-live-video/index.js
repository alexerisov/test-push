import React from 'react';
import classes from "./index.module.scss";
import RaitingIcon from "@/components/elements/rating-icon";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from "next/link";

const CardLiveVideo = () => {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.card__content}>
          <img src="/images/index/food.png" className={classes.card__avatar} />
          <div className={classes.card__column}>
            <p>Chicken Makhani (Roasted in nuts)</p>
            <span className={classes.card__raiting}><RaitingIcon /></span>
            <Link href="/"><a>Watch Live video</a></Link>
          </div>
        </CardContent>
      </Card>
    );
  };
  
export default CardLiveVideo;