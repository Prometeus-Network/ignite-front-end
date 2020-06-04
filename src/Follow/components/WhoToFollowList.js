import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, makeStyles } from '@material-ui/core';

import { SideBarList, UnfollowDialog } from '.';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
}));

const _WhoToFollowList = ({
    isMobile,
    fetchWhoToFollow,
    whoToFollowItems,
    actionWithFollow,
    pending,
    selectedUser,
    unfollowUser,
    setUnfollowDialogOpen,
    unfollowDialogOpen,
}) => {
    const classes = useStyles();
    const viewCount = isMobile ? 3 : 5;

    useEffect(() => {
        fetchWhoToFollow();
    }, []);

    return whoToFollowItems.slice(0, viewCount).length === 0 && pending ? (
        <CircularProgress size={15} className={classes.centered} />
    ) : (
        <>
            <SideBarList
                users={whoToFollowItems.slice(0, viewCount)}
                actionWithFollow={actionWithFollow}
            />
            <UnfollowDialog
                username={selectedUser.username}
                unfollowAction={unfollowUser}
                unfollowDialogOpen={unfollowDialogOpen}
                setUnfollowDialogOpen={setUnfollowDialogOpen}
            />
        </>
    );
};

const mapMobxToProps = ({ whoToFollow, followAction }) => ({
    fetchWhoToFollow: whoToFollow.fetchWhoToFollow,
    whoToFollowItems: whoToFollow.whoToFollowItems,
    pending: whoToFollow.pending,
    actionWithFollow: followAction.actionWithFollow,
    selectedUser: followAction.selectedUser,
    unfollowUser: followAction.unfollowUser,
    setUnfollowDialogOpen: followAction.setUnfollowDialogOpen,
    unfollowDialogOpen: followAction.unfollowDialogOpen,
});

export const WhoToFollowList = inject(mapMobxToProps)(observer(_WhoToFollowList));
