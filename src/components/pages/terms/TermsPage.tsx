import React from 'react';
import s from './TermsPage.module.scss';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { useTranslation } from 'next-i18next';

export const TermsPage = () => {
  const { t } = useTranslation('termsOfUse');

  const content = <div className={s.container} dangerouslySetInnerHTML={{ __html: t('termsOfUse') }} />;

  return <LayoutPageNew content={content} />;
};
