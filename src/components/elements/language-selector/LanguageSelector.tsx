import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import s from './LanguageSelector.module.scss';

import ArrowDownIcon from '~public/icons/Arrow Down Simple/Line.svg';
import FlagUS from '~public/icons/flags/us.svg';
import FlagNL from '~public/icons/flags/nl.svg';
import { MenuItem, Select } from '@material-ui/core';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { useRouter } from 'next/router';
import { LANGUAGES } from '@/utils/datasets';
import { useDispatch } from 'react-redux';
import { accountActions } from '@/store/actions';
import http from '@/utils/http';
import { useAuth } from '@/utils/Hooks';

export const LanguageSelector = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { session, status: loading } = useAuth();
  const profileLanguage = session?.user?.language;

  const languagesIcon = {
    en: FlagUS,
    nl: FlagNL
  };

  const languageList = [
    {
      value: 'en',
      icon: FlagUS
    },
    {
      value: 'nl',
      icon: FlagNL
    }
  ];

  const [currentLanguage, setCurrentLanguage] = React.useState<string>('nl');

  useEffect(() => {
    getInitialLanguage();
    async function getInitialLanguage() {
      let initialLanguage;
      const storedLanguage = await JSON.parse(localStorage.getItem('language'));
      if (storedLanguage) {
        initialLanguage = storedLanguage;
      } else {
        if (session) {
          if (profileLanguage in LANGUAGES) {
            initialLanguage = LANGUAGES[profileLanguage];
          }
        } else {
          initialLanguage = 'nl';
        }
      }
      onChangeSelect({ target: { value: initialLanguage } });
    }
  }, [session]);

  const updateProfileLangage = language => {
    if (profileLanguage) {
      return http
        .patch(`account/me`, { language: LANGUAGES[language] })
        .then(res => {
          dispatch(accountActions.remind());
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const saveLanguageToLocalStorage = async language => {
    await localStorage.setItem('language', JSON.stringify(language));
  };

  const onChangeSelect = async event => {
    await saveLanguageToLocalStorage(event.target.value);

    if (profileLanguage) {
      await updateProfileLangage(event.target.value);
    }

    await setCurrentLanguage(event.target.value);

    router.push(router.asPath, undefined, { locale: event.target.value, scroll: false });
  };

  const getOptionList = list => {
    return list.map(el => {
      return (
        <MenuItem
          key={el.value}
          value={el.value}
          classes={{ selected: s.menu__item__selected }}
          className={s.menu__item}>
          <BasicIcon icon={el.icon} size={'24px'} viewBox={'0 0 640 480'} />
          <span className={s.menu__text}>{el.value}</span>
        </MenuItem>
      );
    });
  };

  const renderValue = value => {
    return <BasicIcon icon={languagesIcon[value]} size={'24px'} viewBox={'0 0 640 480'} />;
  };

  return (
    <div>
      <Select
        id="language-selector"
        value={currentLanguage}
        onChange={onChangeSelect}
        className={s.select}
        IconComponent={ArrowDownIcon}
        classes={{ icon: s.icon }}
        renderValue={renderValue}
        variant="outlined"
        MenuProps={{
          disableScrollLock: true,
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          classes: {
            paper: s.paper,
            list: s.list
          }
        }}>
        {getOptionList(languageList)}
      </Select>
    </div>
  );
};
