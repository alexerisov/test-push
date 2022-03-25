import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { Button, MenuItem, NoSsr, OutlinedInput, Select, Slider } from '@material-ui/core';
import CloseIcon from '~public/icons/Close Circle/Line.svg';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CloseIconFilled from '~public/icons/Close Circle/Filled.svg';
import { recipeTypesCount, recommendedList } from '@/utils/datasets';
import { numberWithCommas } from '@/utils/converter';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { USER_TYPES } from '~types/profile';
import ArrowDownIcon from '~public/icons/Arrow Down Simple/Line.svg';
import Accordion from '@material-ui/core/Accordion';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import s from './FiltersBlock.module.scss';

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

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  font-size: 24px;
  fill: #777e91;
`;

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

const StyledSelect = styled(Select)`
  width: 100%;
  .PrivateNotchedOutline-root-1:hover {
    border-color: #fff !important;
  }
`;

const RecipeSetSelector = ({ formik, focusRef }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleOpen = () => {
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
    setTimeout(() => {
      focusRef.current.focus({ preventScroll: true });
    }, 100);
  };

  return (
    <Select
      id="recipe-set-selector"
      name="recipe_set"
      label={false}
      input={<OutlinedInput classes={{ input: s.search__input }} notched={false} label={false} />}
      variant="outlined"
      IconComponent={StyledArrowDownIcon}
      onOpen={handleOpen}
      onClose={handleClose}
      className={s.search__dropdown}
      classes={{ icon: s.search__dropdown__circle }}
      MenuProps={{
        PopoverClasses: { paper: s.popover },
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        disableScrollLock: true
      }}
      value={formik.values.recipe_set}
      onChange={formik.handleChange}>
      <MenuItem className={s.search__dropdown__item} key="reccommended" value={0}>
        {'Reccommended'}
      </MenuItem>
      <MenuItem className={s.search__dropdown__item} key="cheapest" value={1}>
        {'Cheapest'}
      </MenuItem>
      <MenuItem className={s.search__dropdown__item} key="latest" value={2}>
        {'Latest'}
      </MenuItem>
      <MenuItem className={s.search__dropdown__item} key="quickest" value={3}>
        {'Quickest'}
      </MenuItem>
    </Select>
  );
};

const SearchFilter = ({ formik, session }) => {
  const focusRef = useRef();
  const TooltipStyles = useStyledTooltip();
  const mobile = useMediaQuery('(max-width: 576px)');
  const { t } = useTranslation('searchPage');

  const handleAnchorAccordion = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleClickClearAll = () => {
    setTitle('');
    setQuery('');
    setRange(1);
    formik.handleSubmit();
  };

  const handleCloseSearchQuery = () => {
    setTitle('');
    setQuery('');
    formik.handleSubmit();
  };

  const handleChangeRange = name => {
    return event => {
      event.preventDefault();
      switch (name) {
        case 'Easy':
          formik.setFieldValue('cooking_skills', 1);
          formik.handleSubmit();
          break;
        case 'Medium':
          formik.setFieldValue('cooking_skills', 2);
          formik.handleSubmit();
          break;
        case 'Complex':
          formik.setFieldValue('cooking_skills', 3);
          formik.handleSubmit();
          break;
        default:
          return;
      }
    };
  };

  if (mobile) {
    return (
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
          <div className={s.search__controls}>
            <p className={s.search__header__text}>{title}</p>
            <button className={s.search__closeButton} onClick={handleCloseSearchQuery}>
              <CloseIcon />
            </button>{' '}
          </div>
        ) : null}
        <div
          className={`${isDropdownActive ? s.search__dropdown_active : s.search__dropdown}`}
          onClick={() => setIsDropdownActive(!isDropdownActive)}>
          {recommendedFilter ? <span>{recommendedFilter}</span> : <span>Recommended</span>}
          <div className={s.search__dropdown__circle}>
            <StyledArrowDownIcon />
          </div>
        </div>
        {isDropdownActive === true && (
          <ul className={s.search__dropdown__list}>
            <li className={s.search__dropdown__item}>Recommended</li>
            {recommendedListMap}
          </ul>
        )}
        <Button
          onClick={() => setShowFilters(prevState => !prevState)}
          className={s.search__moreFiltersButton}
          variant="outlined"
          color="primary">
          Advanced filter
        </Button>
        {true && <SearchFilter />}
        <div className={s.search__line_mobile} />
        <Button
          onClick={() => router.push('/recipe/upload', undefined, { locale: router.locale })}
          className={s.search__uploadButton}
          variant="outlined"
          color="primary">
          <img src="icons/File Upload/Shape.svg" alt="upload icon" />
          Upload Recipe
        </Button>
      </>
    );
  }

  return (
    <React.Fragment>
      <form tabindex="0" ref={focusRef} className={s.search__filter} onSubmit={formik.handleSubmit}>
        {session?.user.user_type === USER_TYPES.CHEF && (
          <>
            <Button
              onClick={() => router.push('/recipe/upload', undefined, { locale: router.locale })}
              className={s.search__uploadButton}
              variant="outlined"
              color="primary">
              {t('uploadRecipeButton')}
            </Button>
            <div className={s.search__filter__line} />
          </>
        )}
        {true && !mobile ? (
          <div className={s.search__header__text__wrap}>
            <p className={s.search__header__text}>title</p>

            <button className={s.search__closeButton} onClick={() => console.log('')}>
              <CloseIcon />
            </button>
          </div>
        ) : (
          <p></p>
        )}

        <RecipeSetSelector formik={formik} focusRef={focusRef} />
        <div className={s.search__filterHeader_left}>
          <p className={s.search__filter__title}>Filter</p>
          {!mobile && (
            <button type="reset" onClick={handleClickClearAll} className={s.search__clearButton}>
              Clear all
            </button>
          )}
        </div>

        {
          <StyledAccordion expanded={true} onChange={() => console.log()}>
            <AccordionSummary
              expandIcon={
                <div className={s.search__clickList}>
                  <StyledArrowDownIcon />
                </div>
              }
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography className={s.search__filter__title}>{t('filters.type.title')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={s.search__filter__list__wrap}>
                <div className={s.search__filter__list}>recipeTypesList</div>
                <div className={s.search__filter__list}>
                  {/*{Object.values(recipeTypesCount).map(*/}
                  {/*  (el, ind) =>*/}
                  {/*    true && (*/}
                  {/*      <div key={`${el}-${ind}`} className={s.search__filter__list_item}>*/}
                  {/*        {numberWithCommas(`${data[el]}`)}*/}
                  {/*      </div>*/}
                  {/*    )*/}
                  {/*)}*/}
                </div>
              </div>
            </AccordionDetails>
          </StyledAccordion>
        }
        <div className={s.search__line_botMargin} />

        <Typography className={s.search__filter__title}>{t('filters.skills.title')}</Typography>
        <MySlider
          defaultValue={2}
          min={1}
          max={3}
          step={1}
          value={formik.values.skills}
          onChange={(event, value) => {
            setRange(value);
            setPage(1);
            formik.setFieldValue('cooking_skills', value);
            formik.handleSubmit();
          }}
          name="cooking_skills"
          id="cooking_skills"
        />
        <div className={s.search__cookingSkills}>
          <button className={s.search__cookingSkills__firstItem} onClick={handleChangeRange('Easy')}>
            {t('filters.skills.easy')}
          </button>
          <button className={s.search__cookingSkills__secondItem} onClick={handleChangeRange('Medium')}>
            {t('filters.skills.medium')}
          </button>
          <button className={s.search__cookingSkills__thirdItem} onClick={handleChangeRange('Complex')}>
            {t('filters.skills.hard')}
          </button>
        </div>
        <div className={s.search__line_topMargin} />

        <StyledAccordion expanded={true} onChange={handleAnchorAccordion('panel3')}>
          <AccordionSummary
            expandIcon={
              <div className={s.search__clickList}>
                <StyledArrowDownIcon />
              </div>
            }
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography className={s.search__filter__title}>{t('filters.method.title')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={s.search__filter__list__wrap}>
              <div className={s.search__filter__list}>cookingMethodsList</div>
              <div className={s.search__filter__list}>
                {/*{Object.values(cookingMethodsCount).map(*/}
                {/*  (el, ind) =>*/}
                {/*    true && (*/}
                {/*      <div key={`${el}-${ind}`} className={s.search__filter__list_item}>*/}
                {/*        {numberWithCommas(`${data[el]}`)}*/}
                {/*      </div>*/}
                {/*    )*/}
                {/*)}*/}
              </div>
            </div>
          </AccordionDetails>
        </StyledAccordion>
        <div className={s.search__line} />

        <StyledAccordion expanded={true} onChange={handleAnchorAccordion('panel4')}>
          <AccordionSummary
            expandIcon={
              <div className={s.search__clickList}>
                <StyledArrowDownIcon />
              </div>
            }
            aria-controls="panel4a-content"
            id="panel4a-header">
            <Typography className={s.search__filter__title}>{t('filters.diet.title')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={s.search__filter__list__wrap}>
              <div className={s.search__filter__list}>dietFilter </div>
              <div className={s.search__filter__list}>
                {/*{Object.values(dietaryrestrictionsCount).map(*/}
                {/*  (el, ind) =>*/}
                {/*    t && (*/}
                {/*      <div key={`${el}-${ind}`} className={s.search__filter__list_item}>*/}
                {/*        {numberWithCommas(`${data[el]}`)}*/}
                {/*      </div>*/}
                {/*    )*/}
                {/*)}*/}
              </div>
            </div>
          </AccordionDetails>
        </StyledAccordion>
        <div className={s.search__line} />

        {true && (
          <button type="reset" onClick={handleClickClearAll} className={s.search__clearButton}>
            <CloseIconFilled style={{ color: '#ffaa00' }} />
            {t('filters.resetButton')}
          </button>
        )}
      </form>
      {mobile && (
        <div className={s.search__filter__footer}>
          <button type="reset" onClick={handleClickClearAll} className={s.search__clearButton}>
            Clear all
          </button>
          <button type="button" className={s.search__applyBtn} onClick={toggleDrawer('right', false)}>
            Apply
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchFilter;
