import React, { useState, useCallback } from 'react';
import s from './SearchPage.module.scss';

import { useRouter } from 'next/router';
import Recipe from '@/api/Recipe.js';
import * as yup from 'yup';
import {
  recipeTypes,
  cookingMethods,
  dietaryrestrictions,
  cookingSkill,
  ordering,
  recommendedList,
  recipeTypesCount,
  dietaryrestrictionsCount,
  cookingMethodsCount
} from '@/utils/datasets';

import { modalActions } from '@/store/actions';
import { Button, NoSsr, Slider, TextField } from '@material-ui/core';
import Image from 'next/image';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { TOOLTIP_GET_INSPIRED } from '@/utils/constants';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { useFormik } from 'formik';
import { MenuItem, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CardSearch } from '@/components/elements/card';
import { Weekmenu } from '@/components/blocks/weekmenu';
import { numberWithCommas } from '@/utils/converter';
import { windowScroll } from '@/utils/windowScroll';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { Spinner } from '@/components/elements';
import { Autocomplete } from '@material-ui/lab';

import SearchIcon from '~public/icons/Search/Line.svg';
import CloseIcon from '~public/icons/Close Circle/Line.svg';
import CloseIconFilled from '~public/icons/Close Circle/Filled.svg';
import CoinIcon from '~public/icons/Coin/Line.svg';
import RecipeIcon from '~public/icons/Receipt/Line.svg';
import ArrowUpIcon from '~public/icons/Arrow Up Simple/Line.svg';
import ArrowDownIcon from '~public/icons/Arrow Down Simple/Line.svg';

import BurgerIcon from '~public/icons/Burger/Line.svg';
import ServingPlateIcon from '~public/icons/Serving Plate/Line.svg';
import SoupIcon from '~public/icons/Soup/Line.svg';
import IceCreamIcon from '~public/icons/Ice Cream/Line.svg';
import FrenchFriesIcon from '~public/icons/French Fries/Line.svg';
import CarrotIcon from '~public/icons/Carrot/Line.svg';
import DonutIcon from '~public/icons/Donut/Line.svg';

import Cookies from 'cookies';
import { useTranslation } from 'next-i18next';
import SearchFilter from '@/components/blocks/search-page/filters-block/FiltersBlock';
import MobileFiltersBlock from '@/components/blocks/search-page/mobile-filters-block/MobileFiltersBlock';
import { useAuth } from '@/utils/Hooks';

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: 0,
    minWidth: 157,
    '& .MuiSelect-root': {
      padding: 4
    }
  }
}));

const ITEM_HEIGHT = 30;

const ITEM_PADDING_TOP = 6;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP
    }
  }
};

const recipeTypesImg = {
  1: BurgerIcon,
  2: ServingPlateIcon,
  3: SoupIcon,
  4: IceCreamIcon,
  5: IceCreamIcon,
  6: FrenchFriesIcon,
  7: CarrotIcon,
  8: DonutIcon
};

const SearchInput = () => {
  const { t } = useTranslation('searchPage');
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);
  const loading = open && result?.length === 0;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const validationSchema = yup.object({
    search: yup.string()
  });

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (!values.search?.trim()) {
        values.search = '';
      } else {
        router.push(
          `search?title=${values.search.trim()}&${!isOnlyEatchefRecipesQueryExist() ? '' : 'only_eatchefs_recipes=Y'}`,
          undefined,
          { locale: router.locale }
        );
      }
      values.search = '';
      formik.setFieldValue('search', '');
    }
  });

  const onChangeInputSearch = search => {
    if (!search.length) {
      setResult([]);
      return;
    }

    if (!isOnlyEatchefRecipesQueryExist()) {
      Recipe.getQueryResult(search)
        .then(res => setResult(res.data))
        .catch(e => {
          console.log('error', e);
        });
    } else {
      Recipe.getQueryResult(search, true)
        .then(res => setResult(res.data))
        .catch(e => {
          console.log('error', e);
        });
    }
  };

  const isOnlyEatchefRecipesQueryExist = () => {
    return !!router?.query?.['only_eatchefs_recipes']?.includes('Y');
  };

  const renderOption = (option, { selected }) => {
    return (
      <span className={s.option}>
        <span className={s.option_icon}>
          <RecipeIcon />
        </span>
        {option}
      </span>
    );
  };

  const handleOptionChange = (_, newOption) => {
    formik.setFieldValue('search', newOption);
    formik.submitForm();
  };

  return (
    <div className={s.search_input_wrapper}>
      <form className={s.search_form} onSubmit={formik.handleSubmit}>
        <Autocomplete
          classes={{
            root: s.search_autocomplete_root,
            paper: s.search_autocomplete_paper,
            listbox: s.search_autocomplete_listbox,
            endAdornment: s.search_autocomplete_close_icon
          }}
          fullWidth
          id="home-page-search"
          options={result?.map(option => option.result)}
          freeSolo
          renderOption={renderOption}
          closeIcon={<CloseIcon />}
          onChange={handleOptionChange}
          renderInput={params => (
            <TextField
              {...params}
              id="home-page-search"
              name="search"
              variant="filled"
              InputProps={{
                ...params.InputProps,
                classes: { root: s.search_input, focused: s.search_input_focused },
                disableUnderline: true
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              value={formik.values.search}
              placeholder={t('searchInput.placeholder')}
              onChange={e => {
                formik.handleChange(e);
                onChangeInputSearch(e.target.value);
              }}
            />
          )}
        />

        <button className={s.search__searchButton} type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

const useStyledTooltip = makeStyles({
  tooltip: {
    padding: '5px 5px !important',
    fontSize: '16px'
  }
});

export const SearchPage = props => {
  const TooltipStyles = useStyledTooltip();
  const { session } = useAuth();
  const { t } = useTranslation('searchPage');
  const tablet = useMediaQuery('(max-width: 1025px)');
  const mobile = useMediaQuery('(max-width: 576px)');
  const router = useRouter();
  const classMarerialUi = useStyles();
  //Recommended filter

  //WeekMenu

  //UnsalableRecipes
  //SalableRecipes

  // Accordion
  const [expanded, setExpanded] = useState(false);

  const handleAnchorAccordion = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Tooltip
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  // Drawer
  const [isDrawerOpened, setDrawerOpened] = useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpened({ ...isDrawerOpened, [anchor]: open });
  };

  // formik
  const createQueryParams = data => {
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]: any) => {
      queryParams.set(key, value);
    });

    return queryParams;
  };

  const formik = useFormik({
    initialValues: {
      diet_restrictions: [],
      cooking_methods: [],
      cooking_skills: [],
      types: [],
      ordering: [],
      only_eatchefs_recipes: [],
      recipe_set: 0
    },
    enableReinitialize: true,
    onSubmit: (values: any) => {}
  });

  const getLabelByStatusOfCheckbox = useCallback(
    ({ fieldName, value, dataList }) => {
      const labelClass = !formik.initialValues[fieldName].includes(String(value))
        ? ''
        : s.search__filter__subLabel_active;

      return (
        <span style={{ fontSize: 14 }} className={labelClass}>
          {dataList[value]}
        </span>
      );
    },
    [formik.initialValues]
  );

  // for (let i = 1; i < Object.keys(dietaryrestrictions).length; i++) {
  //   dietaryrestrictionsList.push(
  //     <FormControlLabel
  //       key={i}
  //       control={
  //         <Checkbox
  //           style={{
  //             color: formik.initialValues['diet_restrictions'].includes(String(i)) ? '#FFAA00' : '#E6E8EC'
  //           }}
  //           checked={formik.initialValues['diet_restrictions'].includes(String(i))}
  //           value={i}
  //           onChange={e => {
  //             onChangeCheckboxInput(e);
  //           }}
  //           name="diet_restrictions"
  //           color="primary"
  //         />
  //       }
  //       label={getLabelByStatusOfCheckbox({
  //         fieldName: 'diet_restrictions',
  //         value: i,
  //         dataList: dietaryrestrictions
  //       })}
  //     />
  //   );
  // }
  //
  // for (let i = 1; i <= Object.keys(cookingSkill).length; i++) {
  //   cookingSkillList.push(
  //     <FormControlLabel
  //       key={i}
  //       control={
  //         <Checkbox
  //           style={{
  //             color: '#FFAA00'
  //           }}
  //           value={i}
  //           checked={formik.initialValues['cooking_skills'].includes(String(i))}
  //           onChange={e => {
  //             onChangeCheckboxInput(e);
  //           }}
  //           name="cooking_skills"
  //           color="primary"
  //         />
  //       }
  //       label={getLabelByStatusOfCheckbox({
  //         fieldName: 'cooking_skills',
  //         value: i,
  //         dataList: cookingSkill
  //       })}
  //     />
  //   );
  // }
  //
  // for (let i = 1; i <= Object.keys(recipeTypes).length; i++) {
  //   if (i !== 5) {
  //     const Icon = recipeTypesImg[i];
  //     recipeTypesList.push(
  //       <FormControlLabel
  //         key={i}
  //         control={
  //           <div className={s.recipe__type__wrapper}>
  //             <Checkbox
  //               style={{
  //                 color: formik.initialValues['types'].includes(String(i)) ? '#FFAA00' : '#E6E8EC'
  //               }}
  //               checked={formik.initialValues['types'].includes(String(i))}
  //               value={i}
  //               onChange={e => {
  //                 onChangeCheckboxInput(e);
  //               }}
  //               name="types"
  //               color="primary"
  //             />
  //             <Icon style={{ fontSize: 18 }} />
  //           </div>
  //         }
  //         label={getLabelByStatusOfCheckbox({
  //           fieldName: 'types',
  //           value: i,
  //           dataList: recipeTypes
  //         })}
  //       />
  //     );
  //   }
  // }
  //
  // for (let i = 1; i <= Object.keys(cookingMethods).length; i++) {
  //   if (i !== 6) {
  //     cookingMethodsList.push(
  //       <FormControlLabel
  //         key={i}
  //         control={
  //           <Checkbox
  //             style={{
  //               color: formik.initialValues['cooking_methods'].includes(String(i)) ? '#FFAA00' : '#E6E8EC'
  //             }}
  //             checked={formik.initialValues['cooking_methods'].includes(String(i))}
  //             value={i}
  //             onChange={e => {
  //               onChangeCheckboxInput(e);
  //             }}
  //             name="cooking_methods"
  //             color="primary"
  //           />
  //         }
  //         label={getLabelByStatusOfCheckbox({
  //           fieldName: 'cooking_methods',
  //           value: i,
  //           dataList: cookingMethods
  //         })}
  //       />
  //     );
  //   }
  // }
  //
  // ordering.forEach((item, index) => {
  //   orderingList.push(
  //     <MenuItem key={index} value={item.valueSort}>
  //       {item.nameSort}
  //     </MenuItem>
  //   );
  // });

  const onChangeCheckboxInput = e => {
    setPage(1);
    setPageSalable(1);
    setPageUnsalable(1);
    formik.handleChange(e);
    formik.handleSubmit();
  };

  const handleClickSearch = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const handleClickClearAll = () => {
    formik.handleSubmit();
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    formik.handleSubmit();
  };

  const handleCloseSearchQuery = () => {
    formik.handleSubmit();
  };

  const recommendedListMap = Object.keys(recommendedList).map((el, ind) => (
    <li
      className={s.search__dropdown__item}
      key={`r${ind}`}
      onClick={() => {
        formik.setFieldValue('recipe_set', `${recommendedList[el]}`.toLowerCase());
        formik.handleSubmit();
      }}>
      {recommendedList[el]}
    </li>
  ));

  const tooltipForGetInspiredCheckbox = (
    <div className={s.search__filter__labelTooltip}>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{ disablePortal: true }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableTouchListener
          title={TOOLTIP_GET_INSPIRED}
          classes={{ tooltip: TooltipStyles.tooltip }}>
          <InfoOutlinedIcon
            fontSize={'small'}
            className={s.search__filter__tooltipIcon}
            onClick={handleTooltipOpen}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
      </ClickAwayListener>
    </div>
  );

  const content = (
    <div className={s.search}>
      <div className={s.search__header}>
        <SearchInput />
      </div>
      <div className={s.search__content}>
        {!mobile && <SearchFilter formik={formik} session={session} />}

        <div className={s.search__result}>
          {mobile && <SearchFilter formik={formik} session={session} />}

          {/* <div className={classes.search__sorting}>
            <InputLabel htmlFor="age-native-simple">Sort by</InputLabel>
            <Select
              MenuProps={MenuProps}
              className={classMarerialUi.selectEmpty}
              variant="outlined"
              name="ordering"
              value={formik.values.ordering}
              onChange={e => {
                onChangeCheckboxInput(e);
              }}>
              {orderingList}
            </Select>
          </div> */}
          <Weekmenu data={props.weekmenuWithoutFilters} />

          <div className={s.search__result__text}>
            <CoinIcon />
            <p>{t('orderAllIngredientsText')}</p>
          </div>

          <div className={s.search__result__container}>
            {/*{salableResults?.length !== 0 ? (*/}
            {/*  <>*/}
            {/*    {salableResults*/}
            {/*      .filter((el, index) => {*/}
            {/*        if (!firstClickToSalableMore && index < 3) {*/}
            {/*          return el;*/}
            {/*        }*/}

            {/*        if (firstClickToSalableMore) {*/}
            {/*          return el;*/}
            {/*        }*/}
            {/*      })*/}
            {/*      .map((recipe, index) => {*/}
            {/*        return (*/}
            {/*          <CardSearch*/}
            {/*            key={`${recipe.pk}-${index}`}*/}
            {/*            title={recipe?.title}*/}
            {/*            image={recipe?.images?.[0]?.url}*/}
            {/*            name={recipe?.user?.full_name}*/}
            {/*            city={recipe?.user?.city}*/}
            {/*            likes={recipe?.likes_number}*/}
            {/*            isParsed={recipe?.is_parsed}*/}
            {/*            publishStatus={recipe?.publish_status}*/}
            {/*            hasVideo={recipe?.video}*/}
            {/*            cookingTime={recipe?.cooking_time}*/}
            {/*            cookingSkill={recipe?.cooking_skills}*/}
            {/*            cookingTypes={recipe?.types}*/}
            {/*            user_saved_recipe={recipe?.user_saved_recipe}*/}
            {/*            price={recipe?.price}*/}
            {/*            token={props.token}*/}
            {/*            id={recipe.pk}*/}
            {/*          />*/}
            {/*        );*/}
            {/*      })}*/}

            {/*    <div className={s.search__buttonViewWrap}>*/}
            {/*      <button*/}
            {/*        className={hasMoreSalableResults === true ? s.search__viewAll : s.search__viewAll_disabled}*/}
            {/*        disabled={hasMoreSalableResults === true ? false : true}*/}
            {/*        onClick={() => {*/}
            {/*          setFirstClickToSalableMore(true);*/}
            {/*          firstClickToSalableMore ? setPageSalable(pageSalable + 1) && setPage(page + 1) : null;*/}
            {/*        }}>*/}
            {/*        {salableLoading ? <Spinner /> : null}*/}
            {/*        Show More*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </>*/}
            {/*) : (*/}
            {/*  <div className={s.search__NoResult__wrap}>*/}
            {/*    <Image src="/images/index/pic_nothing_found.png" width={155} height={140} alt="not found" />*/}
            {/*    <p className={s.search__NoResult}>Nothing Found</p>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
          <div className={s.search__result__container}>
            {/*{unsalableResults.length !== 0*/}
            {/*  ? unsalableResults.map((recipe, index) => {*/}
            {/*      return (*/}
            {/*        <CardSearch*/}
            {/*          key={`${recipe.pk}-${index}`}*/}
            {/*          title={recipe?.title}*/}
            {/*          image={recipe?.images?.[0]?.url}*/}
            {/*          name={recipe?.user?.full_name}*/}
            {/*          city={recipe?.user?.city}*/}
            {/*          likes={recipe?.likes_number}*/}
            {/*          isParsed={recipe?.is_parsed}*/}
            {/*          publishStatus={recipe?.publish_status}*/}
            {/*          hasVideo={recipe?.video}*/}
            {/*          cookingTime={recipe?.cooking_time}*/}
            {/*          cookingSkill={recipe?.cooking_skills}*/}
            {/*          cookingTypes={recipe?.types}*/}
            {/*          user_saved_recipe={recipe?.user_saved_recipe}*/}
            {/*          price={recipe?.price}*/}
            {/*          comments_number={recipe?.comments_number}*/}
            {/*          id={recipe.pk}*/}
            {/*          unsalable={true}*/}
            {/*        />*/}
            {/*      );*/}
            {/*    })*/}
            {/*  : null}*/}
          </div>

          <div className={s.search__buttonViewWrap}>
            <button
              disabled={true === true ? false : true}
              className={true === true ? s.search__viewAll : s.search__viewAll_disabled}
              onClick={() => {}}></button>
          </div>

          {true ? (
            <button
              className={s.search__scrollBtn}
              onClick={() => {
                windowScroll();
              }}>
              <ArrowUpIcon />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <LayoutPageNew content={content} />
    </>
  );
};
