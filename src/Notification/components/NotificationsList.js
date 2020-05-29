import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification } from './Notification';
import { localized } from '../../localization/components';
import { SadIconLarge } from '../../icons/SadIconLarge';
import { BellIcon } from '../../icons/BellIcon';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    link: {
        color: theme.palette.primary.main,
    },
    noNotificationsContainer: {
        border: '1px solid #F1EBE8',
    },
    noNotificationsContent: {
        display: 'flex',
        padding: theme.spacing(2),
    },
    noNotificationsLabel: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2),
    },
    notificationsError: {
        border: '1px solid #F1EBE8',
        borderBottom: 'none',
        height: '100%',
    },
    notificationsErrorInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '65px',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#A2A2A2',
        '& p': {
            fontFamily: 'Museo Sans Cyrl Bold',
            fontSize: '20px',
            margin: '24px 0 4px 0',
            color: '#1C1C1C',
        },
    },
}));

const noNotifications = {
    en: (classes) => (
        <div className={classes.noNotificationsContainer}>
            <div className={classes.noNotificationsContent}>
                <SadIconLarge />
                <div className={classes.noNotificationsLabel}>
                    <Typography>
                        <strong>You have no notifications yet.</strong>
                    </Typography>
                    <Typography>
                        Get to know other
                        {' '}
                        <a href="#" className={classes.link}>users</a>
                        {' '}
                        to start a conversation
                    </Typography>
                </div>
            </div>
        </div>
    ),
    ko: (classes) => (
        <div className={classes.noNotificationsContainer}>
            <div className={classes.noNotificationsContent}>
                <SadIconLarge />
                <div className={classes.noNotificationsLabel}>
                    <Typography>
                        <strong>아직 알림이 없다. </strong>
                    </Typography>
                    <Typography>
                        다른
                        {' '}
                        <a href="#" className={classes.link}>사용자</a>
                        {' '}
                        에 대해 알아보고 대화를 시작하십시오.
                    </Typography>
                </div>
            </div>
        </div>
    ),
};

const _NotificationsList = ({ notifications, fetchNotifications, currentUser, hasMore, l, locale }) => {
    const classes = useStyles();

    if (!currentUser) {
        return (
            <div className={classes.notificationsError}>
                <div className={classes.notificationsErrorInfo}>
                    <BellIcon width="50" height="50" color="#A1A1A1" />
                    <p>Nothing to display yet!</p>
                    <span>Please login or sign up to receive notifications</span>
                </div>
            </div>
        );
    }

    if (notifications.length === 0 && !hasMore) {
        return noNotifications[locale](classes);
    }

    return (
        <div id="notificationsList" className="paddingBottomRoot">
            <InfiniteScroll
                next={fetchNotifications}
                hasMore={hasMore}
                loader={(
                    <CircularProgress
                        size={25}
                        color="primary"
                        className={classes.centered}
                    />
                )}
                dataLength={notifications.length}
                style={{ overflowY: 'hidden' }}
            >
                {notifications.map(notification => (
                    <Notification
                        notification={notification}
                        key={notification.id}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};

const mapMobxToProps = ({ notifications, authorization }) => ({
    notifications: notifications.notifications,
    fetchNotifications: notifications.fetchNotifications,
    currentUser: authorization.currentUser,
    hasMore: notifications.hasMore,
});

export const NotificationsList = localized(
    inject(mapMobxToProps)(observer(_NotificationsList)),
);
