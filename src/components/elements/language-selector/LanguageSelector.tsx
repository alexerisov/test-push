import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import s from './LanguageSelector.module.scss';

import FlagUS from '../../../../public/icons/flags/us.svg';
import FlagNL from '../../../../public/icons/flags/nl.svg';
import { ListItemIcon, MenuItem, Select } from '@material-ui/core';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { useRouter } from 'next/router';
import { LANGUAGES } from '@/utils/datasets';
import { useDispatch } from 'react-redux';
import { accountActions } from '@/store/actions';
import http from '@/utils/http';
import { useAuth } from '@/utils/Hooks';

export const LanguageSelector = () => {
  const { i18n } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useAuth();
  const profileLanguage = session?.user?.language;

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

  useEffect(async () => {
    const storedLanguage = await JSON.parse(localStorage.getItem('language'));
    if (storedLanguage) {
      return setCurrentLanguage(storedLanguage);
    }
    console.log(i18n);
    if (profileLanguage) {
      for (let key in LANGUAGES) {
        console.log('authed');
        if (profileLanguage === LANGUAGES[key]) {
          setCurrentLanguage(key);
        }
      }
    }
  }, [currentLanguage]);

  const updateProfileLangage = language => {
    if (profileLanguage) {
      return http
        .patch(`account/me`, { language: LANGUAGES[language] })
        .then(res => {
          console.log('res', res);
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

  const onChangeSelect = event => {
    console.log(event.target.value);
    setCurrentLanguage(event.target.value);
    saveLanguageToLocalStorage(event.target.value);
    updateProfileLangage(event.target.value);
    router.push(router.asPath, undefined, { locale: event.target.value });
  };

  const getOptionList = list => {
    return list.map(el => {
      return (
        <MenuItem key={el.value} value={el.value} className={s.menu__item}>
          <ListItemIcon>
            <BasicIcon icon={el.icon} size={'24px'} viewBox={'0 0 640 480'} />
          </ListItemIcon>
        </MenuItem>
      );
    });
  };

  return (
    <div>
      <Select
        id="language-selector"
        value={currentLanguage}
        onChange={onChangeSelect}
        className={s.select}
        variant="outlined"
        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            className: s.paper
          }
        }}>
        {getOptionList(languageList)}
      </Select>
    </div>
  );
};
