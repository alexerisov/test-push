import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { Button, Checkbox, MenuItem, NoSsr, OutlinedInput, Select, Slider, SwipeableDrawer } from '@material-ui/core';
import CloseIcon from '~public/icons/Close/Line.svg';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CloseIconFilled from '~public/icons/Close Circle/Filled.svg';
import { cookingMethods, dietaryrestrictions, recipeTypes, recipeTypesCount, recommendedList } from '@/utils/datasets';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { USER_TYPES } from '~types/profile';
import ArrowDownIcon from '~public/icons/Arrow Down Simple/Line.svg';
import Accordion from '@material-ui/core/Accordion';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import s from './FiltersBlock.module.scss';
import CheckboxIconUnchecked from '@/components/elements/checkbox-icon/checkbox-icon-unchecked';
import CheckboxIcon from '@/components/elements/checkbox-icon';
import { useFormik } from 'formik';

import ArrowLeft from '~public/icons/Arrow Left Simple/Line.svg';
import UploadIcon from '~public/icons/File Upload/Shape.svg';
import BurgerIcon from '~public/icons/Burger/Line.svg';
import ServingPlateIcon from '~public/icons/Serving Plate/Line.svg';
import SoupIcon from '~public/icons/Soup/Line.svg';
import IceCreamIcon from '~public/icons/Ice Cream/Line.svg';
import FrenchFriesIcon from '~public/icons/French Fries/Line.svg';
import CarrotIcon from '~public/icons/Carrot/Line.svg';
import DonutIcon from '~public/icons/Donut/Line.svg';
import { useRouter } from 'next/router';

const CssTextField = styled(OutlinedInput)({
  '& label.Mui-focused': {
    color: 'white'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'yellow'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: 'white'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'yellow'
    }
  }
});

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

const recipeTypesImg = {
  1: BurgerIcon,
  2: ServingPlateIcon,
  3: SoupIcon,
  4: IceCreamIcon,
  6: FrenchFriesIcon,
  7: CarrotIcon,
  8: DonutIcon
};

const RecipeSetSelector = ({ formik, focusRef }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { t } = useTranslation('searchPage');
  const handleOpen = () => {
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
    if (focusRef.current) {
      setTimeout(() => {
        focusRef.current.focus({ preventScroll: true });
      }, 100);
    }
  };

  return (
    <Select
      id="recipe-set-selector"
      name="recipe_set"
      label={false}
      input={<CssTextField classes={{ input: s.search__input }} notched={false} label={false} />}
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
        {t('recipeSet.recommended')}
      </MenuItem>
      <MenuItem className={s.search__dropdown__item} key="cheapest" value={1}>
        {t('recipeSet.cheapest')}
      </MenuItem>
      <MenuItem className={s.search__dropdown__item} key="latest" value={2}>
        {t('recipeSet.latest')}
      </MenuItem>
      <MenuItem className={s.search__dropdown__item} key="quickest" value={3}>
        {t('recipeSet.quickest')}
      </MenuItem>
    </Select>
  );
};

const FilterAccordion = ({ formik, list, iconList, header, data, formikKey }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { t } = useTranslation('recipeClassifications');

  const getInitialValues = () => {
    const initialValues = {};
    Object.keys(list).map(el => {
      initialValues[el] = false;
    });
    return initialValues;
  };

  const localFormik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: values => {
      const checkedValues = Object.keys(values).filter(el => Boolean(values[el]));
      const result = checkedValues?.length > 0 ? checkedValues : null;
      formik.setFieldValue(formikKey, result);
    }
  });
  formik[`reset_${formikKey}`] = () => localFormik.resetForm();
  const handleChange = event => {
    localFormik.handleChange(event);
    localFormik.handleSubmit();
  };

  return (
    <StyledAccordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={isExpanded}
      classes={{ root: s.accordion }}
      onChange={() => setIsExpanded(!isExpanded)}>
      <AccordionSummary
        expandIcon={
          <div className={s.search__clickList}>
            <StyledArrowDownIcon />
          </div>
        }
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography className={s.search__filter__title}>{t(`${formikKey}.title`)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={s.search__filter__list__wrap}>
          <div className={s.search__filter__list}>
            {Object.keys(list).map(el => {
              const Icon = iconList?.[el];
              const isActive = localFormik.values[el];
              const countKey = `${list[el]?.toLowerCase()}_num`;
              const label = t(`${formikKey}.${list[el]?.toLowerCase()}`);
              return (
                <div className={s.checkbox__wrapper}>
                  <NoSsr>
                    <Checkbox
                      className={s.checkbox}
                      icon={<CheckboxIconUnchecked />}
                      checkedIcon={<CheckboxIcon />}
                      checked={localFormik.values[`${el}`]}
                      value={localFormik.values[`${el}`]}
                      onChange={handleChange}
                      id={`${header}-${el}`}
                      name={`${el}`}
                    />
                  </NoSsr>
                  {Icon && <Icon style={{ fontSize: 18 }} />}

                  <label
                    className={`${s.label} ${isActive && s.search__filter__subLabel_active}`}
                    htmlFor={`${header}-${el}`}>
                    {label}
                    <span className={s.count}>{data?.[countKey]}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

const SkillsSlider = ({ formik }) => {
  const { t } = useTranslation('recipeClassifications');

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

  return (
    <React.Fragment>
      <Typography className={s.search__filter__title}>{t('cookingSkill.title')}</Typography>
      <MySlider
        defaultValue={2}
        min={1}
        max={3}
        step={1}
        value={formik.values.cooking_skills}
        onChange={(event, value) => formik.setFieldValue('cooking_skills', value)}
        name="cooking_skills"
        id="cooking_skills"
      />
      <div className={s.search__cookingSkills}>
        <button className={s.search__cookingSkills__firstItem} onClick={handleChangeRange('Easy')}>
          {t('cookingSkill.easy')}
        </button>
        <button className={s.search__cookingSkills__secondItem} onClick={handleChangeRange('Medium')}>
          {t('cookingSkill.medium')}
        </button>
        <button className={s.search__cookingSkills__thirdItem} onClick={handleChangeRange('Complex')}>
          {t('cookingSkill.hard')}
        </button>
      </div>
    </React.Fragment>
  );
};

const SearchFilter = ({ formik, session, data }) => {
  const router = useRouter();
  const focusRef = useRef();
  const TooltipStyles = useStyledTooltip();
  const mobile = useMediaQuery('(max-width: 576px)');
  const { t } = useTranslation(['recipeClassifications', 'searchPage']);
  const [showFilters, setShowFilters] = useState(false);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClickClearAll = () => {
    formik.resetForm();
    formik.reset_types();
    formik.reset_cooking_methods();
    formik.reset_diet_restrictions();
    formik.handleSubmit();
  };

  if (mobile) {
    const toggleDrawer = open => event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setIsDrawerOpen(open);
    };

    return (
      <>
        <Button onClick={toggleDrawer(true)} className={s.search__moreFiltersButton} variant="outlined" color="primary">
          {t('searchPage:advancedFilter')}
        </Button>
        <SwipeableDrawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          <div className={s.search__mobileFilters}>
            <div className={s.search__line} />
            <button type="reset" onClick={toggleDrawer(false)} className={s.advancedFilter}>
              <ArrowLeft />
              {t('searchPage:advancedFilter')}
            </button>
            <div className={s.search__line_botMargin} />

            <Typography className={s.block__title}>{t('searchPage:blockTitles.sorting')}</Typography>
            <div className={s.search__line} />
            <RecipeSetSelector formik={formik} focusRef={focusRef} />
            <div className={s.search__line_botMargin} />

            <Typography className={s.block__title}>{t('searchPage:blockTitles.filters')}</Typography>
            <div className={s.search__line} />
            <FilterAccordion
              header={t('recipeClassifications:types.title')}
              formik={formik}
              formikKey="types"
              list={recipeTypes}
              iconList={recipeTypesImg}
              data={data}
            />
            <div className={s.search__line_botMargin} />
            <SkillsSlider formik={formik} />
            <div className={s.search__line_topMargin} />
            <FilterAccordion
              header={t('recipeClassifications:cooking_methods.title')}
              formik={formik}
              formikKey="cooking_methods"
              list={cookingMethods}
              data={data}
            />
            <div className={s.search__line} />
            <FilterAccordion
              header={t('recipeClassifications:diet_restrictions.title')}
              formik={formik}
              formikKey="diet_restrictions"
              list={dietaryrestrictions}
              data={data}
            />
            <div className={s.search__line} />
            <div className={s.search__filter__footer}>
              <button
                type="button"
                className={s.search__applyBtn}
                onClick={() => {
                  formik.handleSubmit();
                  setIsDrawerOpen(false);
                }}>
                {t('searchPage:apply')}
              </button>
              <button
                type="reset"
                onClick={() => {
                  handleClickClearAll();
                  setIsDrawerOpen(false);
                }}
                className={s.search__resetBtn}>
                <CloseIcon />
                {t('searchPage:resetFilterButton')}
              </button>
            </div>
          </div>
        </SwipeableDrawer>
        <div className={s.search__line_mobile} />
        {session?.user.user_type === USER_TYPES.CHEF && (
          <Button
            onClick={() => router.push('/recipe/upload', undefined, { locale: router.locale })}
            className={s.search__uploadButton}
            variant="outlined"
            color="primary">
            <UploadIcon />
            {t('searchPage:uploadRecipeButton')}
          </Button>
        )}
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
              {t('searchPage:uploadRecipeButton')}
            </Button>
            <div className={s.search__filter__line} />
          </>
        )}

        <Typography className={s.block__title}>{t('searchPage:blockTitles.sorting')}</Typography>
        <div className={s.search__line} />
        <RecipeSetSelector formik={formik} focusRef={focusRef} />
        <div className={s.search__line_botMargin} />

        <Typography className={s.block__title}>{t('searchPage:blockTitles.filters')}</Typography>
        <div className={s.search__line} />
        <FilterAccordion
          header={t('recipeClassifications:types.title')}
          formik={formik}
          formikKey="types"
          list={recipeTypes}
          iconList={recipeTypesImg}
          data={data}
        />
        <div className={s.search__line_botMargin} />

        <SkillsSlider formik={formik} />

        <div className={s.search__line_topMargin} />

        <FilterAccordion
          header={t('recipeClassifications:cooking_methods.title')}
          formik={formik}
          formikKey="cooking_methods"
          list={cookingMethods}
          data={data}
        />

        <div className={s.search__line} />

        <FilterAccordion
          header={t('recipeClassifications:diet_restrictions.title')}
          formik={formik}
          formikKey="diet_restrictions"
          list={dietaryrestrictions}
          data={data}
        />
        <div className={s.search__line} />

        {Object.values(formik.values).some(el => el) && (
          <button type="reset" onClick={handleClickClearAll} className={s.search__clearButton}>
            <CloseIconFilled style={{ color: '#ffaa00' }} />
            {t('searchPage:resetFilterButton')}
          </button>
        )}
      </form>
    </React.Fragment>
  );
};

export default SearchFilter;
