import React from 'react';
import classes from "./index.module.scss";
import CardLiveVideo from "@/components/elements/card-live-video";

const LiveVideoCardsBlock = () => {
    return (
      <section className={classes.container}>
        <CardLiveVideo />
        <CardLiveVideo />
        <CardLiveVideo />
      </section>
    );
  };
  
export default LiveVideoCardsBlock;