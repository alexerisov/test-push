import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { connect } from 'react-redux';
import Account from '@/api/Account';
import { CardNotification } from '@/components/elements/card';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { useSession } from 'next-auth/react';

const NotificationsPage = props => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const currentDate = new Date().toLocaleDateString('ko-KR', options).replace(/. /gi, '-').slice(0, -1);
      const newNotList = [];
      const oldNotList = [];
      Account.getNotifications().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].created_at.slice(0, 10) === currentDate) {
            newNotList.push(res.data[i]);
          } else {
            oldNotList.push(res.data[i]);
          }
        }
        setNowNotificationList(newNotList);
        setOldNotificationList(oldNotList);
      });
    }
  }, [session]);

  const [nowNotificationList, setNowNotificationList] = useState([]);
  const [oldNotificationList, setOldNotificationList] = useState([]);

  const handleNotificationDelete = id => {
    Account.deleteNotification(id).then(() => {
      const updateNowNotificationList = nowNotificationList.filter(n => n.id !== id);
      const updateOldNotificationList = oldNotificationList.filter(n => n.id !== id);
      setNowNotificationList(updateNowNotificationList);
      setOldNotificationList(updateOldNotificationList);
    });
  };

  const content = (
    <div className={classes.notifications}>
      <h1 className={classes.notifications__title}>Notifications</h1>
      <div className={classes.notifications__content}>
        <div className={classes.notifications__contentItem}>
          <h2 className={classes.notifications__contentItem__title}>Today</h2>
          {nowNotificationList.length !== 0 ? (
            nowNotificationList.map((item, index) => {
              return (
                <CardNotification
                  key={item.id}
                  payload={item.payload}
                  data={item.created_at}
                  code={item.code}
                  id={item.id}
                  onDelete={handleNotificationDelete}
                />
              );
            })
          ) : (
            <p className={classes.notifications__noNotifications}>No new notifications.</p>
          )}
        </div>
        <div className={classes.notifications__contentItem}>
          <h2 className={classes.notifications__contentItem__title}>Earlier</h2>
          {oldNotificationList.length !== 0 ? (
            oldNotificationList.map((item, index) => {
              return (
                <CardNotification
                  key={item.id}
                  payload={item.payload}
                  data={item.created_at}
                  code={item.code}
                  id={item.id}
                  onDelete={handleNotificationDelete}
                />
              );
            })
          ) : (
            <p className={classes.notifications__noNotifications}>No old notifications.</p>
          )}
        </div>
      </div>
    </div>
  );

  return <LayoutPageNew content={content} />;
};

export default connect(state => ({
  account: state.account
}))(NotificationsPage);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
