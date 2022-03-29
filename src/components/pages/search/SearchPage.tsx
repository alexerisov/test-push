import React, { useState, useCallback, useEffect } from 'react';
import s from './SearchPage.module.scss';

import { useRouter } from 'next/router';
import Recipe from '@/api/Recipe.js';
import * as yup from 'yup';
import { recommendedList } from '@/utils/datasets';

import { modalActions } from '@/store/actions';
import { Button, NoSsr, Slider, TextField } from '@material-ui/core';
import Image from 'next/image';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { TOOLTIP_GET_INSPIRED } from '@/utils/constants';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Weekmenu } from '@/components/blocks/weekmenu';
import { windowScroll } from '@/utils/windowScroll';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { Autocomplete } from '@material-ui/lab';

import SearchIcon from '~public/icons/Search/Line.svg';
import CloseIcon from '~public/icons/Close Circle/Line.svg';
import CoinIcon from '~public/icons/Coin/Line.svg';
import RecipeIcon from '~public/icons/Receipt/Line.svg';
import ArrowUpIcon from '~public/icons/Arrow Up Simple/Line.svg';

import BurgerIcon from '~public/icons/Burger/Line.svg';
import ServingPlateIcon from '~public/icons/Serving Plate/Line.svg';
import SoupIcon from '~public/icons/Soup/Line.svg';
import IceCreamIcon from '~public/icons/Ice Cream/Line.svg';
import FrenchFriesIcon from '~public/icons/French Fries/Line.svg';
import CarrotIcon from '~public/icons/Carrot/Line.svg';
import DonutIcon from '~public/icons/Donut/Line.svg';

import { useTranslation } from 'next-i18next';
import SearchFilter from '@/components/blocks/search-page/filters-block/FiltersBlock';
import { useAuth } from '@/utils/Hooks';
import http from '@/utils/http';
import useSWRInfinite from 'swr/infinite';
import { CardSearch } from '@/components/elements/card';
import { Spinner } from '@/components/elements';
import useSWR from 'swr';

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

const SearchInput = ({ formik }) => {
  const { t } = useTranslation('searchPage');
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);
  const loading = open && result?.length === 0;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const validationSchema = yup.object({
    search: yup.string()
  });

  const localFormik = useFormik({
    initialValues: {
      search: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      formik.setFieldValue('title', values.search);
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
    localFormik.setFieldValue('search', newOption);
    localFormik.submitForm();
  };

  return (
    <div className={s.search_input_wrapper}>
      <form
        className={s.search_form}
        onSubmit={e => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}>
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
              value={localFormik.values.search}
              placeholder={t('searchInput.placeholder')}
              onChange={e => {
                localFormik.handleChange(e);
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

const recipeFetcher = (url, queryParams, filters) => {
  const extendedParams = {};
  for (let key in filters) {
    extendedParams[key] = filters[key].toString();
  }
  return http
    .get(url, { params: { ...queryParams, ...extendedParams } })
    .then(res => {
      return res?.data;
    })
    .catch(e => {
      console.log('error', e);
    });
};

export const SearchPage = props => {
  const TooltipStyles = useStyledTooltip();
  const { session } = useAuth();
  const { t } = useTranslation('searchPage');
  const [searchParams, setSearchParams] = useState<{}>();
  const tablet = useMediaQuery('(max-width: 1025px)');
  const mobile = useMediaQuery('(max-width: 576px)');
  const router = useRouter();
  const classMarerialUi = useStyles();

  const { data: weekmenuData, error: weekmenuLoading } = useSWR(['/settings/weekmenus', searchParams], recipeFetcher);
  const weekmenuRecipes = weekmenuData?.some(el => el.recipes?.length > 0)
    ? weekmenuData
    : props.weekmenuWithoutFilters;

  const {
    data: productionRecipesData,
    error: isProductionRecipesLoading,
    size: productionRecipesPageSize,
    setSize: setProductionRecipesPageSize
  } = useSWRInfinite(
    index => ['/recipe', searchParams, { page: index + 1, page_size: index ? 9 : 3, sale_status: 5 }],
    recipeFetcher
  );
  //TODO remove flexible index, fix page size to 9, and for first page create accordion

  const {
    data: nonProductionRecipesData,
    error: isNonProductionRecipesLoading,
    size: nonProductionRecipesPageSize,
    setSize: setNonProductionRecipesPageSize
  } = useSWRInfinite(
    index => ['/recipe', searchParams, { page: index + 1, page_size: 9, sale_status: 4 }],
    //TODO check filter by sale_status with multiple values
    recipeFetcher
  );

  const isLoadingInitialData = !productionRecipesData && !isProductionRecipesLoading;
  const isLoadingMoreProd =
    isLoadingInitialData ||
    (productionRecipesPageSize > 0 &&
      productionRecipesData &&
      typeof productionRecipesData[productionRecipesPageSize - 1] === 'undefined');
  const isEmptyProd = productionRecipesData?.[0]?.length === 0;
  const isReachingEndProd =
    productionRecipesData && productionRecipesData[productionRecipesData.length - 1]?.next === null;

  const isLoadingInitialDataNonProd = !nonProductionRecipesData && !isNonProductionRecipesLoading;
  const isLoadingMoreNonProd =
    isLoadingInitialDataNonProd ||
    (nonProductionRecipesPageSize > 0 &&
      nonProductionRecipesData &&
      typeof nonProductionRecipesData[nonProductionRecipesPageSize - 1] === 'undefined');
  const isEmptyNonProd = nonProductionRecipesData?.[0]?.length === 0;
  const isReachingEndNonProd =
    nonProductionRecipesData && nonProductionRecipesData[nonProductionRecipesData.length - 1]?.next === null;

  const productionRecipes = productionRecipesData
    ? [].concat(...productionRecipesData.filter(el => el?.results).map(el => el?.results))
    : null;
  const nonProductionRecipes = nonProductionRecipesData
    ? [].concat(...nonProductionRecipesData.filter(el => el?.results).map(el => el?.results))
    : null;
  const countRecipesData = nonProductionRecipesData
    ? nonProductionRecipesData[nonProductionRecipesData.length - 1]
    : null;

  const [open, setOpen] = useState(productionRecipesData);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      diet_restrictions: null,
      cooking_methods: null,
      cooking_skills: null,
      types: null,
      title: null,
      recipe_set: 0
    },
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const parsedValues = {};
      Object.entries(values).map(([key, value]: any) => {
        if (value) {
          parsedValues[key] = value.toString();
        }
      });
      setSearchParams(parsedValues);
      router.push({ pathname: '/search', query: parsedValues }, undefined, { shallow: true });
    }
  });

  useEffect(() => {
    formik.handleSubmit();
  }, [formik.values]);

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
        <SearchInput formik={formik} />
      </div>
      <div className={s.search__content}>
        {!mobile && <SearchFilter formik={formik} session={session} data={countRecipesData} />}

        <div className={s.search__result}>
          {mobile && <SearchFilter formik={formik} session={session} data={countRecipesData} />}

          <Weekmenu data={weekmenuRecipes} />

          <div className={s.search__result__text}>
            <CoinIcon />
            <p>{t('orderAllIngredientsText')}</p>
          </div>

          <div className={s.search__result__container}>
            {productionRecipes?.length < 1 && (
              <div className={s.search__NoResult__wrap}>
                <Image src="/images/index/pic_nothing_found.png" width={155} height={140} alt="not found" />
                <p className={s.search__NoResult}>Nothing Found</p>
              </div>
            )}

            {productionRecipes?.length > 0 &&
              productionRecipes.map((recipe, index) => <CardSearch key={`${recipe.pk}-${index}`} recipe={recipe} />)}

            <div className={s.search__buttonViewWrap}>
              <button
                className={s.search__viewAll}
                disabled={isLoadingMoreProd || isReachingEndProd}
                onClick={() => {
                  setProductionRecipesPageSize(productionRecipesPageSize + 1);
                }}>
                {isLoadingMoreProd && <Spinner />}
                {isLoadingMoreProd
                  ? t('button.loading')
                  : isReachingEndProd
                  ? t('button.noMore')
                  : t('button.showMore')}
              </button>
            </div>
          </div>

          <div className={s.search__result__container}>
            {nonProductionRecipes?.length > 0 &&
              nonProductionRecipes.map((recipe, index) => <CardSearch key={`${recipe.pk}-${index}`} recipe={recipe} />)}
          </div>

          <div className={s.search__buttonViewWrap}>
            <button
              className={s.search__viewAll}
              disabled={isLoadingMoreNonProd || isReachingEndNonProd}
              onClick={() => {
                setNonProductionRecipesPageSize(nonProductionRecipesPageSize + 1);
              }}>
              {isLoadingMoreNonProd && <Spinner />}
              {isLoadingMoreNonProd
                ? t('button.loading')
                : isReachingEndNonProd
                ? t('button.noMore')
                : t('button.showMore')}
            </button>
          </div>

          {nonProductionRecipesPageSize > 3 ? (
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
