import React, {useEffect, useState} from 'react';
import Link from "next/link";
import { makeStyles } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Collapse from "@material-ui/core/Collapse";
import Pagination from "@material-ui/lab/Pagination";
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";

import RoleModel from "@/components/elements/role-model";
import CardFavouriteDishes from "@/components/elements/card/card-favourite-dishes";
import CardHomeChefProfile from "@/components/elements/card/card-homechef-profile";
import CardHighestMeals from "@/components/elements/card-highest-meals";

import Recipe from "@/api/Recipe";

import styles from './homeChefBlock.module.scss';

const useAvatarStyles = makeStyles({
  root: {
    position: "absolute",
    width: "114px",
    height: "114px",
  }
});

const HomeChefBlock = ({ account, user }) => {
  const classes = useAvatarStyles();
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

  const chooseUser = () => {
    return !user ? account : user;
  };

  return (
    <>
      <h2 className={styles.navbar}>
        <Link href="/"><a>Home /</a></Link>
        <span> My Profile</span>
      </h2>

      <section className={`${styles.section} ${styles.info}`}>
        <Avatar classes={{root: classes.root}}
                src={chooseUser()?.profile?.avatar}
        />

        <div className={styles.info__content}>
          <div className={styles.info__left}>
            <div className={styles.name}>
              <h3 className={`${styles.field} ${styles.name__field}`}>Name</h3>
              <p className={`${styles.value} ${styles.name__value}`}>{chooseUser()?.profile?.full_name}</p>
            </div>

            <table className={styles.info__left__table}>
              <tbody>
              <tr className={styles.row}>
                <td className={styles.cell} style={{width: '50%'}}>
                  <h3 className={styles.field}>Email</h3>
                  <p className={styles.value}>{!chooseUser()?.profile?.email ? '-' : chooseUser().profile?.email}</p>
                </td>
                <td className={styles.cell}>
                  <h3 className={styles.field}>Phone Number</h3>
                  <p className={styles.value}>
                    {!chooseUser()?.profile?.phone_number ? '-' : chooseUser().profile?.phone_number}
                  </p>
                </td>
              </tr>

              <tr className={styles.row}>
                <td className={styles.cell}>
                  <h3 className={styles.field}>City</h3>
                  <p className={styles.value}>{!chooseUser()?.profile?.city ? '-' : chooseUser().profile?.city}</p>
                </td>
                <td className={styles.cell}>
                  <h3 className={styles.field}>Language</h3>
                  <p className={styles.value}>
                    {!chooseUser()?.profile?.language ? '-' : chooseUser().profile?.language}
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.info__right}>
            <div className={styles.bio}>
              <h3 className={styles.field}>Bio</h3>
              <p className={styles.value}>{!chooseUser()?.profile?.bio ? '-' : chooseUser()?.profile?.bio}</p>
            </div>

            <div className={styles.experience}>
              <h3 className={styles.field}>Experience</h3>
              <p className={styles.value}>
                {!chooseUser()?.profile?.experience ? '-' : chooseUser()?.profile?.experience}
              </p>
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
          totalSlides={chooseUser()?.profile?.role_models.length}
          visibleSlides={8}
          step={3}
        >
          <Slider className={styles.roleCarousel__slider}>
            {chooseUser()?.profile?.role_models.length
              ?
              chooseUser().profile.role_models.map((role, index) => {
                return (
                  <Slide key={`role_model${role.pk}`} className={styles.roleCarousel__item} index={index}>
                    <RoleModel name={role.name} avatar={role.file} />
                  </Slide>
                );
              })
              :
              'No Role models exists yet!'
            }
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
            {chooseUser()?.profile?.favourite_recipes?.length
              ?
              chooseUser()?.profile?.favourite_recipes?.map(item => {
                return (
                  <Slide key={`card-favorite-dish-${item.pk}`} className={styles.favDishesCarousel__item} index={1}>
                    <CardFavouriteDishes
                      recipeId={item.pk}
                      title={item.title}
                      image={item.images[0]}
                    />
                  </Slide>
                );
              })
              :
              'No favourite dishes exists yet!'
            }
          </Slider>
          {chooseUser()?.profile?.favourite_recipes?.length &&
          <>
            <ButtonBack className={styles.favDishesCarousel__prev}>
              <NavigateBeforeIcon/>
            </ButtonBack>
            <ButtonNext className={styles.favDishesCarousel__next}>
              <NavigateNextIcon/>
            </ButtonNext>
          </>
          }
        </CarouselProvider>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Other Informations</h2>

        <div className={styles.itemsContainer}>
          <CardHomeChefProfile
            type={1}
            list={chooseUser()?.profile?.cooking_philosophy}
          />
          <CardHomeChefProfile
            type={2}
            list={chooseUser()?.profile?.personal_cooking_mission}
          />
          <CardHomeChefProfile
            type={3}
            list={chooseUser()?.profile?.source_of_inspiration}
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
                  name={item.user.full_name}
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
    </>
  );
};

export default HomeChefBlock;
