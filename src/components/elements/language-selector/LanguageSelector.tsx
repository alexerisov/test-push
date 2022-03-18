import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import s from './LanguageSelector.module.scss';

import FlagUS from '../../../../public/icons/flags/us.svg';
import FlagNL from '../../../../public/icons/flags/nl.svg';
import { IconButton, ListItemIcon, ListItemText, MenuItem, Select } from '@material-ui/core';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { useRouter } from 'next/router';
import { LANGUAGES } from '@/utils/datasets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { accountActions, profileActions } from '@/store/actions';
import classes from '@/components/forms/form-edit-account-user/index.module.scss';

const ITEM_HEIGHT = 24;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP
    }
  }
};

export const LanguageSelector = () => {
  const { i18n } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile?.data);
  const isAuthorized = useSelector((state: RootState) => state.account?.hasToken);
  const profileLanguage = profile?.language;

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
    console.log(i18n);
    if (isAuthorized) {
      if (profileLanguage in LANGUAGES) {
        console.log('authed', profileLanguage);
        setCurrentLanguage(LANGUAGES[profileLanguage]);
        i18n.changeLanguage(profileLanguage);
      }
    } else {
      const storedLanguage = await JSON.parse(localStorage.getItem('language'));
      if (storedLanguage) {
        setCurrentLanguage(storedLanguage);
        i18n.changeLanguage(storedLanguage);
      } else {
        setCurrentLanguage('nl');
        i18n.changeLanguage('nl');
      }
    }
  }, [isAuthorized]);

  const updateProfileLangage = language => {
    dispatch(profileActions.updateProfileUser({ ...profile, language: LANGUAGES[language] }))
      .then(res => {
        dispatch(accountActions.remind());
      })
      .catch(error => {
        console.log(error);
      });
  };

  const saveLanguageToLocalStorage = async language => {
    await localStorage.setItem('language', JSON.stringify(language));
  };

  const onChangeSelect = async event => {
    console.log(event.target.value);
    await saveLanguageToLocalStorage(event.target.value);
    if (profileLanguage) {
      await updateProfileLangage(event.target.value);
    }
    await setCurrentLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
    router.push(router.asPath, undefined, { locale: event.target.value, shallow: true });
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
      <pre>{JSON.stringify(currentLanguage)}</pre>
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
