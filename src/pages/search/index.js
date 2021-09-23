import React, { useState, useEffect, useCallback } from 'react';
import classes from './index.module.scss';
import LayoutPage from '@/components/layouts/layout-page';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Recipe from '@/api/Recipe.js';
import CardHighestMeals from '@/components/elements/card-highest-meals';
import { recipeTypes, cookingMethods, dietaryrestrictions, cookingSkill, ordering } from '@/utils/datasets';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import { NoSsr } from '@material-ui/core';

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
import { Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchDrawer from '@/components/elements/search-drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { InputSearch } from '@/components/elements/input';

const StyledAccordion = styled(Accordion)`
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

const Recipes = props => {
  const TooltipStyles = useStyledTooltip();
  const mobile = useMediaQuery('(max-width: 992px)');
  const router = useRouter();
  const classMarerialUi = useStyles();

  const [query, setQuery] = useState();
  const [title, setTitle] = useState();
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [result, setResult] = useState([]);
  const [typeSelection, setTypeSelection] = useState('Food');

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
    [query]
  );

  const formik = useFormik({
    initialValues: {
      diet_restrictions: [...getInitialValuesForFormik('diet_restrictions')],
      cooking_methods: [...getInitialValuesForFormik('cooking_methods')],
      cooking_skills: [...getInitialValuesForFormik('cooking_skills')],
      types: [...getInitialValuesForFormik('types')],
      ordering: [getInitialValuesForFormik('ordering')],
      only_eatchefs_recipes: [...getInitialValuesForFormik('only_eatchefs_recipes')]
    },
    enableReinitialize: true,
    onSubmit: values => {
      values.title = title;
      values.page = page;

      if (typeSelection === 'Beverages') {
        values.types = [5];
      }

      router.push(
        {
          search: `?${createQueryParams(values).toString()}`
        },
        null,
        { scroll: false }
      );
    }
  });

  const dietaryrestrictionsList = [];
  const cookingMethodsList = [];
  const recipeTypesList = [];
  const cookingSkillList = [];

  const orderingList = [];

  const numberCardsDisplayed = 10;

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
              color: '#FFAA00'
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
            <Checkbox
              style={{
                color: '#FFAA00'
              }}
              checked={formik.initialValues['types'].includes(String(i))}
              value={i}
              onChange={e => {
                onChangeCheckboxInput(e);
              }}
              name="types"
              color="primary"
            />
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
    cookingMethodsList.push(
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            style={{
              color: '#FFAA00'
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

  ordering.forEach((item, index) => {
    orderingList.push(
      <MenuItem key={index} value={item.valueSort}>
        {item.nameSort}
      </MenuItem>
    );
  });

  const onChangeCheckboxInput = e => {
    setPage(1);
    formik.handleChange(e);
    formik.handleSubmit();
  };

  useEffect(() => {
    setTitle(router.query.title);
    setPage(router.query.page ? Number(router.query.page) : 1);
    setQuery(router.query);
  }, [router]);

  useEffect(() => {
    if (query) {
      Recipe.getSearchResult(query)
        .then(res => {
          setResult(res.data.results);
          setData(res.data);

          if (!res?.data?.results?.length) {
            setExpanded(false);
          }
        })
        .catch(e => {
          console.log('error', e);
        });
    }
  }, [query]);

  // search banner

  const handleClickSearch = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const handleClickClearAll = () => {
    router.push('/search');
    setTimeout(router.reload, 100);
  };

  const setTypeSelectionFood = event => {
    event.preventDefault();
    setPage(1);
    setTypeSelection('Food');
    formik.values.types = [];
    formik.handleSubmit();
  };

  const setTypeSelectionBeverages = event => {
    event.preventDefault();
    setPage(1);
    setTypeSelection('Beverages');
    formik.handleSubmit();
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    formik.handleSubmit();
  };

  const searchField = (
    <div className={classes.search__header}>
      {title ? (
        <p>
          Search results for : <span>"{title}"</span>
        </p>
      ) : (
        <p></p>
      )}
      <button className={classes.search__searchButton} onClick={handleClickSearch('search')}>
        <img src="/images/index/icon_search.svg" />
      </button>
    </div>
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

  const searchFilter = (
    <>
      <div className={classes.search__filter} onSubmit={formik.handleSubmit}>
        <div className={classes.search__filterHeader_left}>
          <p className={classes.search__filter__title}>Filter</p>
          {!mobile && (
            <button type="reset" onClick={handleClickClearAll} className={classes.search__clearButton}>
              Clear all
            </button>
          )}
          {/* <Link href="/search"><a>Clear all</a></Link> */}
        </div>
        <div className={classes.search__filter__button__wrapper}>
          <button
            type="submit"
            className={`${classes.search__filter__button} ${
              typeSelection === 'Food' && classes.search__filter__button_active
            }`}
            onClick={event => setTypeSelectionFood(event)}>
            Food
          </button>
          <button
            type="submit"
            className={`${classes.search__filter__button} ${
              typeSelection === 'Beverages' && classes.search__filter__button_active
            }`}
            onClick={event => setTypeSelectionBeverages(event)}>
            Beverages
          </button>
        </div>
        <NoSsr>
          <div className={classes.search__filter__label}>
            <FormControlLabel
              key={'only_eatchefs_recipes'}
              control={
                <Checkbox
                  style={{
                    color: '#FFAA00'
                  }}
                  value={'Y'}
                  checked={formik.initialValues['only_eatchefs_recipes'].includes('Y')}
                  onChange={e => {
                    onChangeCheckboxInput(e);
                  }}
                  name="only_eatchefs_recipes"
                  color="primary"
                />
              }
              label={<span className={classes.search__filter__primaryLabel}>Get Inspired!</span>}
            />
            {tooltipForGetInspiredCheckbox}
          </div>
          {typeSelection !== 'Beverages' && (
            <StyledAccordion expanded={expanded === 'panel1'} onChange={handleAnchorAccordion('panel1')}>
              <AccordionSummary
                expandIcon={
                  <div className={classes.search__clickList}>
                    <div></div>
                    <div className={classes.search__clickList__active}></div>
                  </div>
                }
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography className={classes.search__filter__title}>Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.search__filter__list}>{recipeTypesList}</div>
              </AccordionDetails>
            </StyledAccordion>
          )}
          <StyledAccordion expanded={expanded === 'panel2'} onChange={handleAnchorAccordion('panel2')}>
            <AccordionSummary
              expandIcon={
                <div className={classes.search__clickList}>
                  <div></div>
                  <div className={classes.search__clickList__active}></div>
                </div>
              }
              aria-controls="panel2a-content"
              id="panel2a-header">
              <Typography className={classes.search__filter__title}>Cooking Skills</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.search__filter__list}>{cookingSkillList}</div>
            </AccordionDetails>
          </StyledAccordion>
          <StyledAccordion expanded={expanded === 'panel3'} onChange={handleAnchorAccordion('panel3')}>
            <AccordionSummary
              expandIcon={
                <div className={classes.search__clickList}>
                  <div></div>
                  <div className={classes.search__clickList__active}></div>
                </div>
              }
              aria-controls="panel3a-content"
              id="panel3a-header">
              <Typography className={classes.search__filter__title}>Cooking Method</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.search__filter__list}>{cookingMethodsList}</div>
            </AccordionDetails>
          </StyledAccordion>
          <StyledAccordion expanded={expanded === 'panel4'} onChange={handleAnchorAccordion('panel4')}>
            <AccordionSummary
              expandIcon={
                <div className={classes.search__clickList}>
                  <div></div>
                  <div className={classes.search__clickList__active}></div>
                </div>
              }
              aria-controls="panel4a-content"
              id="panel4a-header">
              <Typography className={classes.search__filter__title}>Dietary Restrictions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.search__filter__list}>{dietaryrestrictionsList}</div>
            </AccordionDetails>
          </StyledAccordion>
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

  const content = (
    <div className={classes.search}>
      {!mobile && searchField}
      <div className={classes.search__content}>
        {!mobile && <form>{searchFilter}</form>}

        <div className={classes.search__result}>
          {mobile && (
            <div className={classes.search__wrapper}>
              {mobile ? <InputSearch /> : searchField}

              <SearchDrawer toggleDrawer={(anchor, open) => toggleDrawer(anchor, open)} toggleValue={isDrawerOpened}>
                {searchFilter}
              </SearchDrawer>
            </div>
          )}
          <div className={classes.search__sorting}>
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
          </div>
          <div className={classes.search__result__container}>
            {result.length !== 0 ? (
              result.map((recipe, index) => {
                return (
                  <CardHighestMeals
                    key={`${recipe.pk}-${index}`}
                    title={recipe?.title}
                    image={recipe?.images[0]?.url}
                    name={recipe?.user?.full_name}
                    city={recipe?.user?.city}
                    likes={recipe?.likes_number}
                    isParced={recipe?.is_parsed}
                    publishStatus={recipe?.publish_status}
                    hasVideo={recipe?.video}
                    id={recipe.pk}
                  />
                );
              })
            ) : (
              <p className={classes.search__NoResult}>No Recipes Found</p>
            )}
          </div>
          <div>
            {data?.results?.length !== 0 && data?.count && (
              <Pagination
                count={Math.ceil(data.count / numberCardsDisplayed)}
                color="primary"
                page={page && page}
                onChange={(event, value) => handleChangePage(event, value)}
                size={mobile ? 'small' : 'large'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <LayoutPage content={content} />
    </>
  );
};

export default connect(state => ({
  search: state.search
}))(Recipes);
