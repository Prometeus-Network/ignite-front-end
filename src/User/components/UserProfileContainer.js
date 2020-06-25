import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Hidden, makeStyles } from '@material-ui/core';
import { UserProfileHeader } from './UserProfileHeader';
import { UserFollowersList } from './UserFollowersList';
import { UserFollowingList } from './UserFollowingList';
import { UserProfileTimeline } from '../../Status/components';
import { WhoToFollow } from '../../Follow/components/WhoToFollow';
import { ExploreOurFeaturesDescription } from '../../PrometeusDescription';
import { DescriptionNetworkBanner } from '../../PrometeusDescription/DescriptionNetworkBanner';
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '150px',
        display: 'table',
        [theme.breakpoints.down('sm')]: {
            marginTop: '50px',
        },
    },
}));

const _UserProfileContainer = ({
    user,
    fetchingUser,
    relationships,
    fetchingRelationships,
    error,
    activeTab,
    followUser,
    unfollowUser,
    setActiveTab,
    currentUser,
}) => {
    const classes = useStyles();

    let tabContent;

    switch (activeTab) {
    case 'posts':
        tabContent = <UserProfileTimeline />;
        break;
    case 'followers':
        tabContent = <UserFollowersList />;
        break;
    case 'following':
        tabContent = <UserFollowingList />;
        break;
    default:
        tabContent = <UserProfileTimeline />;
        break;
    }

    if (fetchingUser || !user) {
        return (
            <div className={classes.centered}><Loader size="lg" /></div>
        );
    }

    return (
        <Grid container className="content-container">
            <Grid item className="user-profile-header">
                <UserProfileHeader
                    followers={user.followers_count}
                    following={user.follows_count}
                    avatar={user.avatar}
                    statuses={user.statuses_count}
                    activeTab={activeTab}
                    currentUserFollows={user.following}
                    onFollowRequest={followUser}
                    onUnfollowRequest={unfollowUser}
                    onTabSelected={setActiveTab}
                    username={user.username}
                    displayName={user.display_name}
                    bio={user.bio}
                    currentUser={currentUser}
                    currentUserFollowingCount={currentUser && currentUser.follows_count}
                    createdAt={new Date(user.created_at)}
                />
                <DescriptionNetworkBanner />
            </Grid>
            <Grid item className="user-profile-content-container">
                {tabContent}
            </Grid>
            <Grid item className="right-banners-container">
                {currentUser ? (
                    <Hidden only={['md']}>
                        <WhoToFollow />
                    </Hidden>
                ) : (
                    <ExploreOurFeaturesDescription />
                )}
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ userProfile, authorization }) => ({
    user: userProfile.user,
    fetchingUser: userProfile.fetchingUser,
    relationships: userProfile.relationships,
    fetchingRelationships: userProfile.fetchingRelationships,
    error: userProfile.error,
    activeTab: userProfile.activeTab,
    followUser: userProfile.followUser,
    unfollowUser: userProfile.unfollowUser,
    setActiveTab: userProfile.setActiveTab,
    currentUser: authorization.currentUser,
});

export const UserProfileContainer = inject(mapMobxToProps)(observer(_UserProfileContainer));
