import React from 'react';
import classes from "./index.module.scss";
import Link from "next/link";

const CardMenu = (props) => {
  const {src, title, link } = props;

  return (
    <Link href={link}>
      <a>
        <div className={classes.card} >
          <div style={{backgroundImage: `url(${src})`}} className={classes.card__images}/>
          <h3 className={classes.card__title}>
            <div className={classes.card__hat} />
            {title}
          </h3>
        </div>
      </a>
    </Link>
  );
};
  
export default CardMenu;