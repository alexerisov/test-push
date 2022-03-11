import React, { useState, useEffect, useCallback } from 'react';
import classes from './index.module.scss';
import LayoutPage from '@/components/layouts/layout-page';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Recipe from '@/api/Recipe.js';
import CardHighestMeals from '@/components/elements/card-highest-meals';
import * as yup from 'yup';
import {
  recipeTypes,
  cookingMethods,
  dietaryrestrictions,
  cookingSkill,
  ordering,
  recommendedList,
  recipeTypesImg,
  recipeTypesCount,
  dietaryrestrictionsCount,
  cookingMethodsCount
} from '@/utils/datasets';
import { modalActions } from '@/store/actions';
import { connect, useDispatch } from 'react-redux';
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
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from '@material-ui/core/InputLabel';
import { Select, MenuItem, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchDrawer from '@/components/elements/search-drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { InputSearch } from '@/components/elements/input';
import { CardSearch } from '@/components/elements/card';
import { Weekmenu } from '@/components/blocks/weekmenu';
import { numberWithCommas } from '@/utils/converter';
import { windowScroll } from '@/utils/windowScroll';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { Spinner } from '@/components/elements';
import { Autocomplete } from '@material-ui/lab';

import { ReactComponent as SearchIcon } from '@/../public/icons/Search/Line.svg';
import { ReactComponent as CloseIcon } from '@/../public/icons/Close Circle/Line.svg';
import { ReactComponent as RecipeIcon } from '@/../public/icons/Receipt/Line.svg';
import { TitleOutlined } from '@material-ui/icons';
import Cookies from 'cookies';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const MySlider = styled(Slider)(() => ({
  color: '#FFAA00',
  height: 2,

  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#FFAA00',
    marginTop: '-9px',
    border: '3px solid #fff',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)'
    }
  },
  '& .MuiSlider-track': {
    height: 2
  },
  '& .MuiSlider-rail': {
    color: '#E6E8EC',
    height: 2
  }
}));

const StyledAccordion = styled(Accordion)`
  background: transparent;

  p {
    font-size: 16px;
    font-weight: 600;
  }

  .MuiAccordionSummary-expandIcon {
    margin-right: 0;
  }

  .MuiAccordionSummary-expandIcon.Mui-expanded {
    div {
      div:last-of-type {
        transform: none;
      }
    }
  }
`;

const useStyledTooltip = makeStyles({
  tooltip: {
    padding: '5px 5px !important',
    fontSize: '16px'
  }
});

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
const SearchInput = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);
  const loading = open && result?.length === 0;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const validationSchema = yup.object({
    search: yup.string('Search for dish name')
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
      <span className={classes.option}>
        <span className={classes.option_icon}>
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
    <div className={classes.search_input_wrapper}>
      <form className={classes.search_form} onSubmit={formik.handleSubmit}>
        <Autocomplete
          classes={{
            root: classes.search_autocomplete_root,
            paper: classes.search_autocomplete_paper,
            listbox: classes.search_autocomplete_listbox,
            endAdornment: classes.search_autocomplete_close_icon
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
                classes: { root: classes.search_input, focused: classes.search_input_focused },
                disableUnderline: true
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              value={formik.values.search}
              placeholder="What do you want to eat?"
              onChange={e => {
                formik.handleChange(e);
                onChangeInputSearch(e.target.value);
              }}
            />
          )}
        />

        <button className={classes.search__searchButton} type="submit">
          <img src="/images/index/icon_search.svg" alt="search-icon" />
        </button>
      </form>
    </div>
  );
};

const Recipes = props => {
  const TooltipStyles = useStyledTooltip();
  const tablet = useMediaQuery('(max-width: 1025px)');
  const mobile = useMediaQuery('(max-width: 576px)');
  const router = useRouter();
  const classMarerialUi = useStyles();
  //Recommended filter
  const [recommendedFilter, setRecommendedFilter] = useState('');
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const [query, setQuery] = useState();
  const [title, setTitle] = useState();
  const [range, setRange] = useState(1);
  const [data, setData] = useState();
  const [result, setResult] = useState([]);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  //WeekMenu
  const [weekmenu, setWeekmenu] = useState([]);
  const [weekmenuResults, setWeekmenuRessults] = useState([]);

  const [firstSearchWeekmenuByTitle, setFirstSearchWeekmenuByTitle] = useState(true);
  //UnsalableRecipes
  const [unsalableResults, setUnsalableResults] = useState([]);
  const [hasMoreUnsalableResults, setHasMoreUnsalableResults] = useState(true);
  const [pageUnsalable, setPageUnsalable] = useState(1);
  const [unsalableLoading, setUnsalableLoading] = useState(false);
  const [firstSearchUnsalableByTitle, setFirstSearchUnsalableByTitle] = useState(true);
  //SalableRecipes
  const [salableResults, setSalableResults] = useState([]);
  const [firstClickToSalableMore, setFirstClickToSalableMore] = useState(false);
  const [hasMoreSalableResults, setHasMoreSalableResults] = useState(true);
  const [pageSalable, setPageSalable] = useState(1);
  const [firstSearchSalableByTitle, setFirstSearchSalableByTitle] = useState(true);
  const [salableLoading, setSalableLoading] = useState(false);
  useEffect(() => {
    if (weekmenu.length !== 0) {
      const recipesArray = weekmenu.map(el => el.recipes);
      setWeekmenuRessults(recipesArray.flat());
    }
  }, [weekmenu, setWeekmenu]);

  useEffect(() => {
    if (query) {
      // console.log('query', createQueryParams(query).toString());
      Recipe.getWeekmenu(createQueryParams(query))
        .then(res => {
          console.log('query', query);
          setWeekmenu(res.data);
          // console.log('new weekmenu', res.data);
        })
        .catch(e => console.error(e));
    }
  }, [JSON.stringify(query), title]);

  useEffect(async () => {
    pageUnsalable > 1 && setShowScrollBtn(true);
  }, [pageUnsalable]);

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

  const handleChangeRange = name => {
    return event => {
      event.preventDefault();
      switch (name) {
        case 'Easy':
          setRange(1);
          setPageSalable(1);
          setPageUnsalable(1);
          formik.setFieldValue('cooking_skills', 1);
          formik.handleSubmit();
          break;
        case 'Medium':
          setRange(2);
          setPageSalable(1);
          setPageUnsalable(1);
          formik.setFieldValue('cooking_skills', 2);
          formik.handleSubmit();
          break;
        case 'Complex':
          setRange(3);
          setPageSalable(1);
          setPageUnsalable(1);
          formik.setFieldValue('cooking_skills', 3);
          formik.handleSubmit();
          break;
        default:
          return;
      }
    };
  };
  // formik
  const createQueryParams = data => {
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      queryParams.set(key, value ?? '');
    });

    return queryParams;
  };

  const getInitialValuesForFormik = useCallback(
    name => {
      if (name === 'ordering') {
        return query?.[name] || '-likes_number';
      }

      if (query?.[name]?.length) {
        return query?.[name].split(',');
      }

      return [];
    },
    [JSON.stringify(query)]
  );

  const formik = useFormik({
    initialValues: {
      diet_restrictions: [...getInitialValuesForFormik('diet_restrictions')],
      cooking_methods: [...getInitialValuesForFormik('cooking_methods')],
      cooking_skills: [...getInitialValuesForFormik('cooking_skills')],
      types: [...getInitialValuesForFormik('types')],
      ordering: [getInitialValuesForFormik('ordering')],
      only_eatchefs_recipes: [...getInitialValuesForFormik('only_eatchefs_recipes')],
      recipe_set: [...getInitialValuesForFormik('recipe_set')]
    },
    enableReinitialize: true,
    onSubmit: values => {
      values.title = title;
      values.page = page;
      setSalableResults([]);
      setUnsalableResults([]);
      // setWeekmenuRessults([]);
      setWeekmenu([]);
      router.push(
        {
          search: `?${createQueryParams(values).toString()}`
        },
        null,
        { scroll: false, locale: router.locale }
      );
    }
  });

  const weekmenuWithoutDuplicate = () => {
    const seen = new Set();
    const filteredArr = weekmenuResults.flat().filter(el => {
      const duplicate = seen.has(el.pk);
      seen.add(el.pk);
      return !duplicate;
    });

    if (filteredArr.length === 0) {
      return props?.weekmenuWithoutFilters;
    }

    return [{ recipes: filteredArr }];
  };

  const dietaryrestrictionsList = [];
  const cookingMethodsList = [];
  const recipeTypesList = [];
  const cookingSkillList = [];

  const orderingList = [];

  const getLabelByStatusOfCheckbox = useCallback(
    ({ fieldName, value, dataList }) => {
      const labelClass = !formik.initialValues[fieldName].includes(String(value))
        ? ''
        : classes.search__filter__subLabel_active;

      return <span className={labelClass}>{dataList[value]}</span>;
    },
    [formik.initialValues]
  );

  for (let i = 1; i < Object.keys(dietaryrestrictions).length; i++) {
    dietaryrestrictionsList.push(
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            style={{
              color: formik.initialValues['diet_restrictions'].includes(String(i)) ? '#FFAA00' : '#E6E8EC'
            }}
            checked={formik.initialValues['diet_restrictions'].includes(String(i))}
            value={i}
            onChange={e => {
              onChangeCheckboxInput(e);
            }}
            name="diet_restrictions"
            color="primary"
          />
        }
        label={getLabelByStatusOfCheckbox({
          fieldName: 'diet_restrictions',
          value: i,
          dataList: dietaryrestrictions
        })}
      />
    );
  }

  for (let i = 1; i <= Object.keys(cookingSkill).length; i++) {
    cookingSkillList.push(
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            style={{
              color: '#FFAA00'
            }}
            value={i}
            checked={formik.initialValues['cooking_skills'].includes(String(i))}
            onChange={e => {
              onChangeCheckboxInput(e);
            }}
            name="cooking_skills"
            color="primary"
          />
        }
        label={getLabelByStatusOfCheckbox({
          fieldName: 'cooking_skills',
          value: i,
          dataList: cookingSkill
        })}
      />
    );
  }

  for (let i = 1; i <= Object.keys(recipeTypes).length; i++) {
    if (i !== 5) {
      recipeTypesList.push(
        <FormControlLabel
          key={i}
          control={
            <>
              <Checkbox
                style={{
                  color: formik.initialValues['types'].includes(String(i)) ? '#FFAA00' : '#E6E8EC'
                }}
                checked={formik.initialValues['types'].includes(String(i))}
                value={i}
                onChange={e => {
                  onChangeCheckboxInput(e);
                }}
                name="types"
                color="primary"
              />
              <img
                style={{
                  marginRight: '12px'
                }}
                src={recipeTypesImg[i]}
              />
            </>
          }
          label={getLabelByStatusOfCheckbox({
            fieldName: 'types',
            value: i,
            dataList: recipeTypes
          })}
        />
      );
    }
  }

  for (let i = 1; i <= Object.keys(cookingMethods).length; i++) {
    if (i !== 6) {
      cookingMethodsList.push(
        <FormControlLabel
          key={i}
          control={
            <Checkbox
              style={{
                color: formik.initialValues['cooking_methods'].includes(String(i)) ? '#FFAA00' : '#E6E8EC'
              }}
              checked={formik.initialValues['cooking_methods'].includes(String(i))}
              value={i}
              onChange={e => {
                onChangeCheckboxInput(e);
              }}
              name="cooking_methods"
              color="primary"
            />
          }
          label={getLabelByStatusOfCheckbox({
            fieldName: 'cooking_methods',
            value: i,
            dataList: cookingMethods
          })}
        />
      );
    }
  }

  ordering.forEach((item, index) => {
    orderingList.push(
      <MenuItem key={index} value={item.valueSort}>
        {item.nameSort}
      </MenuItem>
    );
  });

  const onChangeCheckboxInput = e => {
    setPage(1);
    setPageSalable(1);
    setPageUnsalable(1);
    formik.handleChange(e);
    formik.handleSubmit();
  };

  useEffect(() => {
    setFirstSearchUnsalableByTitle(true);
    setFirstSearchSalableByTitle(true);
    setFirstSearchWeekmenuByTitle(true);
    setTitle(router.query.title);
    setPage(router.query.page ? Number(router.query.page) : 1);
    setPageUnsalable(router.query.page ? Number(router.query.page) : 1);
    setPageSalable(router.query.page ? Number(router.query.page) : 1);
    setQuery(router.query);
  }, [router]);
  useEffect(() => {
    if (query) {
      Recipe.getSearchResult(query)
        .then(res => {
          setData(res.data);
        })
        .catch(e => {
          console.log('error', e);
        });
    }
  }, [query, pageSalable, pageUnsalable, title]);

  useEffect(() => {
    if (query) {
      //UnsalableResults
      setUnsalableLoading(true);
      Recipe.getSearchResult({
        ...query,
        ordering: 'user_saved_recipe=true',
        sale_status: '4,6,7',
        page_size: 12,
        page: pageUnsalable
      })
        .then(res => {
          setUnsalableResults(unsalableResults.concat(res.data.results));
          if (res.data.next) {
            setHasMoreUnsalableResults(true);
          } else {
            setHasMoreUnsalableResults(false);
          }
          if (title && firstSearchUnsalableByTitle) {
            setUnsalableResults(res.data.results);
            setFirstSearchUnsalableByTitle(false);
          }
          if (!res?.data?.results?.length) {
            setExpanded(false);
          }
          setUnsalableLoading(false);
        })
        .catch(e => {
          console.log('error', e);
          setUnsalableLoading(false);
        });
    }
  }, [query, pageUnsalable]);

  //SalableResults
  useEffect(() => {
    Recipe.getSearchResult(query ? query : {})
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.log('error', e);
      });
  }, [JSON.stringify(query)]);
  // search banner

  useEffect(() => {
    setSalableLoading(true);
    Recipe.getSearchResult(
      query
        ? { ...query, sale_status: 5, page_size: 9, page: pageSalable }
        : { sale_status: 5, page_size: 9, page: pageSalable }
    )
      .then(res => {
        setSalableResults(salableResults.concat(res.data.results));

        if (res.data.next) {
          setHasMoreSalableResults(true);
        } else {
          setHasMoreSalableResults(false);
        }
        if (title && firstSearchSalableByTitle) {
          setSalableResults(res.data.results);
          setFirstSearchSalableByTitle(false);
        }
        if (!res?.data?.results?.length) {
          setExpanded(false);
        }

        setSalableLoading(false);
      })
      .catch(e => {
        console.log('error', e);
        setSalableLoading(false);
      });
  }, [query, pageSalable]);

  const handleClickSearch = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const handleClickClearAll = () => {
    setTitle('');
    setQuery('');
    setRange(1);
    formik.handleSubmit();
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    formik.handleSubmit();
  };

  const handleCloseSearchQuery = () => {
    setTitle('');
    setQuery('');
    formik.handleSubmit();
  };
  const recommendedListMap = Object.keys(recommendedList).map((el, ind) => (
    <li
      className={classes.search__dropdown__item}
      key={`r${ind}`}
      onClick={() => {
        setRecommendedFilter(`${recommendedList[el]}`);
        setIsDropdownActive(false);
        formik.setFieldValue('recipe_set', `${recommendedList[el]}`.toLowerCase());

        formik.handleSubmit();
      }}>
      {recommendedList[el]}
    </li>
  ));

  const searchField = (
    <>
      <div className={classes.search__header}>
        <SearchInput />
      </div>
    </>
  );

  const tooltipForGetInspiredCheckbox = (
    <div className={classes.search__filter__labelTooltip}>
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
            className={classes.search__filter__tooltipIcon}
            onClick={handleTooltipOpen}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
      </ClickAwayListener>
    </div>
  );

  const isQueryEmpty =
    !query ||
    Object.keys(query)?.length === 0 ||
    (Object.keys(query)?.length === 1 && router.query.title === '') ||
    (router.query.diet_restrictions === '' &&
      (router.query.title === '' || !router.query.title) &&
      router.query.cooking_methods === '' &&
      router.query.cooking_skills === '' &&
      router.query.types === '' &&
      router.query.ordering === '-likes_number' &&
      router.query.only_eatchefs_recipes === '' &&
      router.query.recipe_set === '');

  const weekmenuData = isQueryEmpty ? props?.weekmenuWithoutFilters : weekmenuWithoutDuplicate();

  const searchFilter = (
    <>
      <div className={classes.search__filter} onSubmit={formik.handleSubmit}>
        {props.userType === 1 && (
          <>
            <Button
              onClick={() => router.push('/recipe/upload', undefined, { locale: router.locale })}
              className={classes.search__uploadButton}
              variant="outlined"
              color="primary">
              Upload Recipe
            </Button>
            <div className={classes.search__filter__line} />
          </>
        )}
        {title && !mobile ? (
          <div className={classes.search__header__text__wrap}>
            <p className={classes.search__header__text}>{title}</p>

            <button className={classes.search__closeButton} onClick={handleCloseSearchQuery}>
              <img src="icons/Close-Circle/Line.svg" alt="close-icon" />
            </button>
          </div>
        ) : (
          <p></p>
        )}
        {/* <div className={classes.search__filterHeader_left}>
          <p className={classes.search__filter__title}>Filter</p>
          {!mobile && (
            <button type="reset" onClick={handleClickClearAll} className={classes.search__clearButton}>
              Clear all
            </button>
          )}
        </div> */}

        <NoSsr>
          <div
            className={`${isDropdownActive ? classes.search__dropdown_active : classes.search__dropdown}`}
            onClick={() => setIsDropdownActive(!isDropdownActive)}>
            {recommendedFilter ? <span>{recommendedFilter}</span> : <span>Recommended</span>}
            <div className={classes.search__dropdown__circle}>
              <img src="icons/Arrow Down Simple/Line.svg" />
            </div>
          </div>
          {isDropdownActive === true && (
            <ul className={classes.search__dropdown__list}>
              <li
                className={classes.search__dropdown__item}
                onClick={() => {
                  setRecommendedFilter(``);
                  setIsDropdownActive(false);
                  formik.setFieldValue('recipe_set', ``);

                  formik.handleSubmit();
                }}>
                Recommended
              </li>
              {recommendedListMap}
            </ul>
          )}

          {
            <StyledAccordion expanded={expanded === 'panel1'} onChange={handleAnchorAccordion('panel1')}>
              <AccordionSummary
                expandIcon={
                  <div className={classes.search__clickList}>
                    <img src="icons/Arrow Down Simple/Line.svg" />
                  </div>
                }
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography className={classes.search__filter__title}>Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.search__filter__list__wrap}>
                  <div className={classes.search__filter__list}>{recipeTypesList}</div>
                  <div className={classes.search__filter__list}>
                    {Object.values(recipeTypesCount).map(
                      (el, ind) =>
                        data && (
                          <div key={`${el}-${ind}`} className={classes.search__filter__list_item}>
                            {numberWithCommas(`${data[el]}`)}
                          </div>
                        )
                    )}
                  </div>
                </div>
              </AccordionDetails>
            </StyledAccordion>
          }
          <div className={classes.search__line_botMargin} />

          <Typography className={classes.search__filter__title}>Cooking Skills</Typography>
          <MySlider
            defaultValue={2}
            min={1}
            max={3}
            step={1}
            value={range}
            onChange={(event, value) => {
              setRange(value);
              setPage(1);
              formik.setFieldValue('cooking_skills', value);
              formik.handleSubmit();
            }}
            name="cooking_skills"
            id="cooking_skills"
          />
          <div className={classes.search__cookingSkills}>
            <button className={classes.search__cookingSkills__firstItem} onClick={handleChangeRange('Easy')}>
              Easy
            </button>
            <button className={classes.search__cookingSkills__secondItem} onClick={handleChangeRange('Medium')}>
              Medium
            </button>
            <button className={classes.search__cookingSkills__thirdItem} onClick={handleChangeRange('Complex')}>
              Complex
            </button>
          </div>
          <div className={classes.search__line_topMargin} />

          <StyledAccordion expanded={expanded === 'panel3'} onChange={handleAnchorAccordion('panel3')}>
            <AccordionSummary
              expandIcon={
                <div className={classes.search__clickList}>
                  <img src="icons/Arrow Down Simple/Line.svg" />
                </div>
              }
              aria-controls="panel3a-content"
              id="panel3a-header">
              <Typography className={classes.search__filter__title}>Cooking Method</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.search__filter__list__wrap}>
                <div className={classes.search__filter__list}>{cookingMethodsList}</div>
                <div className={classes.search__filter__list}>
                  {Object.values(cookingMethodsCount).map(
                    (el, ind) =>
                      data && (
                        <div key={`${el}-${ind}`} className={classes.search__filter__list_item}>
                          {numberWithCommas(`${data[el]}`)}
                        </div>
                      )
                  )}
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
          <div className={classes.search__line} />

          <StyledAccordion expanded={expanded === 'panel4'} onChange={handleAnchorAccordion('panel4')}>
            <AccordionSummary
              expandIcon={
                <div className={classes.search__clickList}>
                  <img src="icons/Arrow Down Simple/Line.svg" />
                </div>
              }
              aria-controls="panel4a-content"
              id="panel4a-header">
              <Typography className={classes.search__filter__title}>Dietary Restrictions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.search__filter__list__wrap}>
                <div className={classes.search__filter__list}>{dietaryrestrictionsList} </div>
                <div className={classes.search__filter__list}>
                  {Object.values(dietaryrestrictionsCount).map(
                    (el, ind) =>
                      data && (
                        <div key={`${el}-${ind}`} className={classes.search__filter__list_item}>
                          {numberWithCommas(`${data[el]}`)}
                        </div>
                      )
                  )}
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
          <div className={classes.search__line} />

          {!isQueryEmpty && (
            <button type="reset" onClick={handleClickClearAll} className={classes.search__clearButton}>
              <img src="icons/Close-Circle/Shape.svg" alt="close-icon" /> Reset filter
            </button>
          )}
        </NoSsr>
      </div>
      {mobile && (
        <div className={classes.search__filter__footer}>
          <button type="reset" onClick={handleClickClearAll} className={classes.search__clearButton}>
            Clear all
          </button>
          <button type="button" className={classes.search__applyBtn} onClick={toggleDrawer('right', false)}>
            Apply
          </button>
        </div>
      )}
    </>
  );
  const mobileFilters = (
    <div className={classes.search__mobileFilters}>
      <NoSsr>
        {
          <StyledAccordion expanded={expanded === 'panel1'} onChange={handleAnchorAccordion('panel1')}>
            <AccordionSummary
              expandIcon={
                <div className={classes.search__clickList}>
                  <img src="icons/Arrow Down Simple/Line.svg" />
                </div>
              }
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography className={classes.search__filter__title}>Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.search__filter__list__wrap}>
                <div className={classes.search__filter__list}>{recipeTypesList}</div>
                <div className={classes.search__filter__list}>
                  {Object.values(recipeTypesCount).map(
                    (el, ind) =>
                      data && (
                        <div key={`${el}-${ind}`} className={classes.search__filter__list_item}>
                          {numberWithCommas(`${data[el]}`)}
                        </div>
                      )
                  )}
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
        }
        <div className={classes.search__line_botMargin} />

        <Typography className={classes.search__filter__title}>Cooking Skills</Typography>
        <MySlider
          defaultValue={1}
          min={0}
          max={2}
          step={1}
          value={range}
          onChange={(event, value) => {
            setRange(value);
            setPage(1);
            formik.setFieldValue('cooking_skills', value);
            formik.handleSubmit();
          }}
          name="cooking_skills"
          id="cooking_skills"
        />
        <div className={classes.search__cookingSkills}>
          <button className={classes.search__cookingSkills__firstItem} onClick={handleChangeRange('Easy')}>
            Easy
          </button>
          <button className={classes.search__cookingSkills__secondItem} onClick={handleChangeRange('Medium')}>
            Medium
          </button>
          <button className={classes.search__cookingSkills__thirdItem} onClick={handleChangeRange('Complex')}>
            Complex
          </button>
        </div>
        <div className={classes.search__line_topMargin} />

        <StyledAccordion expanded={expanded === 'panel3'} onChange={handleAnchorAccordion('panel3')}>
          <AccordionSummary
            expandIcon={
              <div className={classes.search__clickList}>
                <img src="icons/Arrow Down Simple/Line.svg" />
              </div>
            }
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography className={classes.search__filter__title}>Cooking Method</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list__wrap}>
              <div className={classes.search__filter__list}>{cookingMethodsList}</div>
              <div className={classes.search__filter__list}>
                {Object.values(cookingMethodsCount).map(
                  (el, ind) =>
                    data && (
                      <div key={`${el}-${ind}`} className={classes.search__filter__list_item}>
                        {numberWithCommas(`${data[el]}`)}
                      </div>
                    )
                )}
              </div>
            </div>
          </AccordionDetails>
        </StyledAccordion>
        <div className={classes.search__line} />

        <StyledAccordion expanded={expanded === 'panel4'} onChange={handleAnchorAccordion('panel4')}>
          <AccordionSummary
            expandIcon={
              <div className={classes.search__clickList}>
                <img src="icons/Arrow Down Simple/Line.svg" />
              </div>
            }
            aria-controls="panel4a-content"
            id="panel4a-header">
            <Typography className={classes.search__filter__title}>Dietary Restrictions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list__wrap}>
              <div className={classes.search__filter__list}>{dietaryrestrictionsList} </div>
              <div className={classes.search__filter__list}>
                {Object.values(dietaryrestrictionsCount).map(
                  (el, ind) =>
                    data && (
                      <div key={`${el}-${ind}`} className={classes.search__filter__list_item}>
                        {numberWithCommas(`${data[el]}`)}
                      </div>
                    )
                )}
              </div>
            </div>
          </AccordionDetails>
        </StyledAccordion>
        <div className={classes.search__line} />
        {query && Object.keys(query).length == 0 ? null : (
          <button type="reset" onClick={handleClickClearAll} className={classes.search__clearButton}>
            <img src="icons/Close-Circle/Shape.svg" alt="close-icon" /> Reset filter
          </button>
        )}
      </NoSsr>
    </div>
  );

  const content = (
    <div className={classes.search}>
      {searchField}
      <div className={classes.search__content}>
        {!mobile && <form>{searchFilter}</form>}

        <div className={classes.search__result}>
          {mobile && (
            <>
              {/* //{' '}
              <div className={classes.search__wrapper}>
                // {mobile ? <InputSearch /> : searchField}
                //{' '}
                <SearchDrawer toggleDrawer={(anchor, open) => toggleDrawer(anchor, open)} toggleValue={isDrawerOpened}>
                  // {searchFilter}
                  //{' '}
                </SearchDrawer>
                //{' '}
              </div> */}
              {mobile && title ? (
                <div className={classes.search__controls}>
                  <p className={classes.search__header__text}>{title}</p>
                  <button className={classes.search__closeButton} onClick={handleCloseSearchQuery}>
                    <img src="icons/Close-Circle/Line.svg" alt="close-icon" />
                  </button>{' '}
                </div>
              ) : null}
              <div
                className={`${isDropdownActive ? classes.search__dropdown_active : classes.search__dropdown}`}
                onClick={() => setIsDropdownActive(!isDropdownActive)}>
                {recommendedFilter ? <span>{recommendedFilter}</span> : <span>Recommended</span>}
                <div className={classes.search__dropdown__circle}>
                  <img src="icons/Arrow Down Simple/Line.svg" />
                </div>
              </div>
              {isDropdownActive === true && (
                <ul className={classes.search__dropdown__list}>
                  <li className={classes.search__dropdown__item}>Recommended</li>
                  {recommendedListMap}
                </ul>
              )}
              <Button
                onClick={() => setShowFilters(prevState => !prevState)}
                className={classes.search__moreFiltersButton}
                variant="outlined"
                color="primary">
                Advanced filter
              </Button>
              {showFilters && mobileFilters}
              <div className={classes.search__line_mobile} />
              <Button
                onClick={() => router.push('/recipe/upload', undefined, { locale: router.locale })}
                className={classes.search__uploadButton}
                variant="outlined"
                color="primary">
                <img src="icons/File Upload/Shape.svg" alt="upload icon" />
                Upload Recipe
              </Button>
            </>
          )}

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
          <Weekmenu data={weekmenuData} />

          <div className={classes.search__result__text}>
            <img src="icons/Coin/Line.svg" alt="close-icon" />
            <p>You can order all the ingredients</p>
          </div>

          <div className={classes.search__result__container}>
            {salableResults?.length !== 0 ? (
              <>
                {salableResults
                  .filter((el, index) => {
                    if (!firstClickToSalableMore && index < 3) {
                      return el;
                    }

                    if (firstClickToSalableMore) {
                      return el;
                    }
                  })
                  .map((recipe, index) => {
                    return (
                      <CardSearch
                        key={`${recipe.pk}-${index}`}
                        title={recipe?.title}
                        image={recipe?.images?.[0]?.url}
                        name={recipe?.user?.full_name}
                        city={recipe?.user?.city}
                        likes={recipe?.likes_number}
                        isParsed={recipe?.is_parsed}
                        publishStatus={recipe?.publish_status}
                        hasVideo={recipe?.video}
                        cookingTime={recipe?.cooking_time}
                        cookingSkill={recipe?.cooking_skills}
                        cookingTypes={recipe?.types}
                        user_saved_recipe={recipe?.user_saved_recipe}
                        price={recipe?.price}
                        token={props.token}
                        id={recipe.pk}
                      />
                    );
                  })}

                <div className={classes.search__buttonViewWrap}>
                  <button
                    className={
                      hasMoreSalableResults === true ? classes.search__viewAll : classes.search__viewAll_disabled
                    }
                    disabled={hasMoreSalableResults === true ? false : true}
                    onClick={() => {
                      setFirstClickToSalableMore(true);
                      firstClickToSalableMore ? setPageSalable(pageSalable + 1) && setPage(page + 1) : null;
                    }}>
                    {salableLoading ? <Spinner /> : null}
                    Show More
                  </button>
                </div>
              </>
            ) : (
              <div className={classes.search__NoResult__wrap}>
                <Image src="/images/index/pic_nothing_found.png" width={155} height={140} alt="not found" />
                <p className={classes.search__NoResult}>Nothing Found</p>
              </div>
            )}
          </div>
          <div className={classes.search__result__container}>
            {unsalableResults.length !== 0
              ? unsalableResults.map((recipe, index) => {
                  return (
                    <CardSearch
                      key={`${recipe.pk}-${index}`}
                      title={recipe?.title}
                      image={recipe?.images?.[0]?.url}
                      name={recipe?.user?.full_name}
                      city={recipe?.user?.city}
                      likes={recipe?.likes_number}
                      isParsed={recipe?.is_parsed}
                      publishStatus={recipe?.publish_status}
                      hasVideo={recipe?.video}
                      cookingTime={recipe?.cooking_time}
                      cookingSkill={recipe?.cooking_skills}
                      cookingTypes={recipe?.types}
                      user_saved_recipe={recipe?.user_saved_recipe}
                      price={recipe?.price}
                      comments_number={recipe?.comments_number}
                      id={recipe.pk}
                      unsalable={true}
                    />
                  );
                })
              : null}
          </div>

          <div className={classes.search__buttonViewWrap}>
            <button
              disabled={hasMoreUnsalableResults === true ? false : true}
              className={hasMoreUnsalableResults === true ? classes.search__viewAll : classes.search__viewAll_disabled}
              onClick={() => {
                setPageUnsalable(pageUnsalable + 1);
                setPage(page + 1);
              }}>
              {unsalableLoading ? <Spinner /> : null}
              Show More
            </button>
          </div>

          {showScrollBtn ? (
            <button
              className={classes.search__scrollBtn}
              onClick={() => {
                windowScroll();
                setShowScrollBtn(false);
              }}>
              <img src="icons/Arrow Up Simple/Line.svg" alt="arrow-icon" />
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

export default connect(state => ({
  search: state.search,
  token: state.account.hasToken,
  userType: state.account?.profile?.user_type
}))(Recipes);

export async function getServerSidePropsProps(context) {
  const cookies = new Cookies(context.req, context.res);
  const targetCookies = cookies.get('aucr');
  const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));

  try {
    const response = await Recipe.getMealOfWeek(token);
    const banners = await Recipe.getHomepageCarouselItems();
    const weekmenu = await Recipe.getWeekmenu('');
    const mealOfWeekBlock = response?.data?.length ? response?.data?.[0] : null;

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        weekmenuWithoutFilters: weekmenu.data
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        notFound: true
      }
    };
  }
}
