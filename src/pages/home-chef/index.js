import React, { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import Link from "next/link";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import Avatar from '@material-ui/core/Avatar';
import {Button, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from "@material-ui/core/Tooltip";

import { LayoutPage } from "@/components/layouts";
import CardFavouriteDishes from "@/components/elements/card/card-favourite-dishes";
import CardHomeChefProfile from "@/components/elements/card/card-homechef-profile";
import CardHighestMeals from "@/components/elements/card-highest-meals";
import RoleModel from "@/components/elements/role-model";

import Recipe from "@/api/Recipe";

import styles from "./index.module.scss";
import 'pure-react-carousel/dist/react-carousel.es.css';
import classes from "@/pages/my-uploads/index.module.scss";
import Pagination from "@material-ui/lab/Pagination";

const useAvatarStyles = makeStyles({
  root: {
    position: "absolute",
    width: "114px",
    height: "114px",
  }
});

const useButtonStyles = makeStyles({
  root: {
    position: 'relative',
    alignSelf: 'flex-end',
    width: "156px !important",
    height: "40px !important",
    padding: "5px 0",
    fontSize: '14px',
    borderWidth: '2px'
  },
  outlinedPrimary: {
    '&:hover': {
      borderWidth: '2px'
    },
  }
});

const HomeChef = ({ account }) => {
  const classes = useAvatarStyles();
  const btnClasses= useButtonStyles();
  const [uploadRecipes, setUploadRecipes] = useState();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Pagination params
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const countPages = (count) => {
    const isRemainExists = (count % itemsPerPage) > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  useEffect(() => {
    getUploadRecipes( );
  }, [page]);

  const getUploadRecipes = async () => {
    try {
      const response = await Recipe.getUploadRecipes(6, page);
      await setNumberOfPages(countPages(response.data.count));
      await setUploadRecipes(response.data.results);
    }
    catch (e) {
      console.log(e);
    }
  };

  const content = (
    <div className={styles.profile}>
      <h2 className={styles.navbar}>
        <Link href="/"><a>Home /</a></Link>
        <span> My Profile</span>
      </h2>

      <section className={`${styles.section} ${styles.info}`}>
        <Avatar classes={{root: classes.root}}
          src={account?.profile?.avatar}
        />

        <div className={styles.info__content}>
          <div className={styles.info__left}>
            <div className={styles.name}>
              <h3 className={`${styles.field} ${styles.name__field}`}>Name</h3>
              <p className={`${styles.value} ${styles.name__value}`}>{account?.profile?.full_name}</p>
            </div>

            <table className={styles.info__left__table}>
              <tbody>
                <tr className={styles.row}>
                  <td className={styles.cell} style={{width: '50%'}}>
                    <h3 className={styles.field}>Email</h3>
                    <p className={styles.value}>{!account?.profile?.email ? '-' : account.profile?.email}</p>
                  </td>
                  <td className={styles.cell}>
                    <h3 className={styles.field}>Phone Number</h3>
                    <p className={styles.value}>{!account?.profile?.phone_number ? '-' : account.profile?.phone_number}</p>
                  </td>
                </tr>

                <tr className={styles.row}>
                  <td className={styles.cell}>
                    <h3 className={styles.field}>City</h3>
                    <p className={styles.value}>{!account?.profile?.city ? '-' : account.profile?.city}</p>
                  </td>
                  <td className={styles.cell}>
                    <h3 className={styles.field}>Language</h3>
                    <p className={styles.value}>{!account?.profile?.language ? '-' : account.profile?.language}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.info__right}>
            <div className={styles.bio}>
              <h3 className={styles.field}>Bio</h3>
              <p className={styles.value}>{!account?.profile?.bio ? '-' : account?.profile?.bio}</p>
            </div>

            <div className={styles.experience}>
              <h3 className={styles.field}>Experience</h3>
              <p className={styles.value}>{!account?.profile?.experience ? '-' : account?.profile?.experience}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>My Role Models</h2>

        <CarouselProvider
          className={styles.roleCarousel}
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={account?.profile?.role_models.length}
          visibleSlides={8}
          step={3}
        >
          <Slider className={styles.roleCarousel__slider}>
            {account?.profile?.role_models &&
            account.profile.role_models.map((role, index) => {
              return (
                <Slide className={styles.roleCarousel__item} index={index}>
                  <RoleModel key={`role_model${role.pk}`} name={role.name} avatar={role.file} />
                </Slide>
              );
            })}
          </Slider>
          <ButtonBack className={styles.roleCarousel__prev}>
            <NavigateBeforeIcon />
          </ButtonBack>
          <ButtonNext className={styles.roleCarousel__next}>
            <NavigateNextIcon />
          </ButtonNext>
        </CarouselProvider>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>My Favourite Dishes</h2>

        <CarouselProvider
          className={styles.favDishesCarousel}
          naturalSlideWidth={220}
          isIntrinsicHeight={true}
          totalSlides={6}
          visibleSlides={4}
          step={3}
        >
          <Slider className={styles.favDishesCarousel__slider}>
                <Slide className={styles.favDishesCarousel__item} index={1}>
                  <CardFavouriteDishes
                  title="Card to heuaheaqgqgqtt"
                  image="http://localhost:4096/media/recipe_files/284/4a30033d69d1269c313995b99eec0fbb.jpg"/>
                </Slide>

            <Slide className={styles.favDishesCarousel__item} index={2}>
              <CardFavouriteDishes
                title="Card to heuaheaqgqgqtt"
                image="http://localhost:4096/media/recipe_files/284/4a30033d69d1269c313995b99eec0fbb.jpg"/>
            </Slide>

            <Slide className={styles.favDishesCarousel__item} index={3}>
              <CardFavouriteDishes
                title="Card to heuaheaqgqgqtt"
                image="http://localhost:4096/media/recipe_files/284/4a30033d69d1269c313995b99eec0fbb.jpg"/>
            </Slide>

            <Slide className={styles.favDishesCarousel__item} index={4}>
              <CardFavouriteDishes
                title="Card to heuaheaqgqgqtt"
                image="http://localhost:4096/media/recipe_files/284/4a30033d69d1269c313995b99eec0fbb.jpg"/>
            </Slide>

            <Slide className={styles.favDishesCarousel__item} index={5}>
              <CardFavouriteDishes
                title="Card to heuaheaqgqgqtt"
                image="http://localhost:4096/media/recipe_files/284/4a30033d69d1269c313995b99eec0fbb.jpg"/>
            </Slide>

            <Slide className={styles.favDishesCarousel__item} index={6}>
              <CardFavouriteDishes
                title="Card to heuaheaqgqgqtt"
                image="http://localhost:4096/media/recipe_files/284/4a30033d69d1269c313995b99eec0fbb.jpg"/>
            </Slide>
          </Slider>
          <ButtonBack className={styles.favDishesCarousel__prev}>
            <NavigateBeforeIcon />
          </ButtonBack>
          <ButtonNext className={styles.favDishesCarousel__next}>
            <NavigateNextIcon />
          </ButtonNext>
        </CarouselProvider>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Other Informations</h2>

        <div className={styles.itemsContainer}>
          <CardHomeChefProfile
            type={1}
            list={account?.profile?.cooking_philosophy}
          />
          <CardHomeChefProfile
            type={2}
            list={account?.profile?.personal_cooking_mission}
          />
          <CardHomeChefProfile
            type={3}
            list={account?.profile?.source_of_inspiration}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionRecipes}>
          <h2 className={styles.sectionTitle}>My Recipes</h2>

          <Tooltip title={expanded ? "Close all" : "Expand all"} aria-label="expand all">
            <NavigateBeforeIcon className={expanded ? styles.closed : styles.expanded} onClick={handleExpandClick}/>
          </Tooltip>
        </div>

        <Collapse in={expanded} timeout="auto" collapsedSize={380}>
          <div className={styles.sectionRecipes__wrapper}>
            <div className={styles.itemsContainer}>
              {uploadRecipes &&
              uploadRecipes.map(item => (
                <CardHighestMeals
                  key={`${item.pk + '1k0'}`}
                  title={item.title}
                  image={item.images[0]?.url}
                  city={item.city}
                  id={item.pk}
                  likes={item?.['likes_number']}
                />)
              )}
            </div>

            {expanded && <Pagination
              classes={{root: styles.sectionRecipes__pagination}}
              count={numberOfPages}
              page={page}
              onChange={(event, number) => setPage(number)}
            />}
          </div>
        </Collapse>
      </section>

      <Button
        color="primary"
        variant="outlined"
        classes={{root: btnClasses.root, outlinedPrimary: btnClasses.outlinedPrimary}}
        href='/profile/account-settings'
      >
        <EditIcon classes={{root: styles.icon}}/>
        <span className={styles.btnName}>Edit All Details</span>
      </Button>
    </div>
  );

  return (
      <LayoutPage content={content} />
  );
};

export default connect((state) => ({
  account: state.account,
}))(HomeChef);
