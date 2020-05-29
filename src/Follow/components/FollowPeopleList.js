import React from "react";
import { inject, observer } from "mobx-react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import { FollowPeopleItem } from "./";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    followListWrapper: {}
}));

const _FollowPeopleList = ({
    fetchFollowPeople,
    followPeopleItems,
    actionWithFollow
}) => {
    const classes = useStyles();

    return (
        <div className={classes.followListWrapper}>
            <InfiniteScroll
                next={fetchFollowPeople}
                hasMore
                loader={
                    <CircularProgress
                        size={15}
                        color="primary"
                        className={classes.centered}
                    />
                }
                dataLength={followPeopleItems.length}
                style={{ overflowY: "hidden" }}
            >
                {followPeopleItems.map(user => (
                    <FollowPeopleItem
                        user={user}
                        actionWithFollow={actionWithFollow}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};

const mapMobxToProps = ({ followPeople, followAction }) => ({
    fetchFollowPeople: followPeople.fetchFollowPeople,
    followPeopleItems: followPeople.followPeopleItems,
    actionWithFollow: followAction.actionWithFollow
});

export const FollowPeopleList = inject(mapMobxToProps)(observer(_FollowPeopleList));