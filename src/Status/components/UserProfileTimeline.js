import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, makeStyles, Grid } from '@material-ui/core';
import { StatusList } from './StatusList';
import { CreateStatusForm } from './CreateStatusForm';
import { FadeLoader } from 'react-spinners';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    profileCreateStatusForm: {
        paddingBottom: '0 !important',
    },
    profileStatusList: {
        paddingTop: '0 !important',
        [theme.breakpoints.down('md')]: {
            padding: '0px !important',
            paddingBottom: `${theme.spacing(1)}px !important`,
        },
    },
}));

const _UserProfileTimeline = ({
    statuses,
    statusLikePendingMap,
    repostsPendingMap,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    unfollowStatusAuthor,
    fetchStatuses,
    pending,
    currentUser,
    profileOwnerId,
    hasMore,
}) => {
    const classes = useStyles();

    return pending && statuses.length === 0
        ? <div className={classes.centered}><FadeLoader css={'transform: scale(0.5)'} color={'#FF5C01'}/></div>
        : (
            <Grid container>
                {currentUser && currentUser.id === profileOwnerId && (
                    <Grid item xs={12} className={classes.profileCreateStatusForm}>
                        <CreateStatusForm />
                    </Grid>
                )}
                <Grid item xs={12} className={classes.profileStatusList}>
                    <StatusList
                        statuses={statuses}
                        onFavouriteClick={(statusId, favourited) => (favourited ? favouriteStatus(statusId) : unfavouriteStatus(statusId))}
                        pending={pending}
                        onNextPageRequest={fetchStatuses}
                        onFollowRequest={followStatusAuthor}
                        onUnfollowRequest={unfollowStatusAuthor}
                        displayMenu={Boolean(currentUser)}
                        currentUser={currentUser}
                        statusLikePendingMap={statusLikePendingMap}
                        repostsPendingMap={repostsPendingMap}
                        hasMore={hasMore}
                    />
                </Grid>
            </Grid>
        );
};

const mapMobxToProps = ({ userProfileTimeline, userProfile, authorization, createStatus }) => ({
    statuses: userProfileTimeline.statuses,
    statusLikePendingMap: userProfileTimeline.statusLikePendingMap,
    favouriteStatus: userProfileTimeline.favouriteStatus,
    unfavouriteStatus: userProfileTimeline.unfavouriteStatus,
    followStatusAuthor: userProfileTimeline.followStatusAuthor,
    unfollowStatusAuthor: userProfileTimeline.unfollowStatusAuthor,
    pending: userProfileTimeline.pending,
    fetchStatuses: userProfileTimeline.fetchStatuses,
    currentUser: authorization.currentUser,
    profileOwnerId: userProfile.user && userProfile.user.id,
    repostsPendingMap: createStatus.pendingRepostsMap,
    hasMore: userProfileTimeline.hasMore,
});

export const UserProfileTimeline = inject(mapMobxToProps)(observer(_UserProfileTimeline));
