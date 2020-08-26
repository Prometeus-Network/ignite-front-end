import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tabs, Tab, makeStyles } from "@material-ui/core";

import { TopicsPopularScroll } from "./TopicsPopularScroll";
import { TopicNotFound } from "./TopicNotFound";
import { UnfollowDialog } from "../../Follow/components";
import { StatusListItem } from "../../Status/components/StatusListItem";
import { MemezatorDialog } from "../../Memezator/components";
import Loader from "../../components/Loader";
import { MenuIcon } from "../../icons/MenuIcon";

const useStyles = makeStyles(theme => ({
    topicListHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "-2px",
        [theme.breakpoints.down("sm")]: {
            position: "fixed",
            width: "100%",
            top: 50,
            background: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.border.main}`,
            zIndex: 20
        }
    },
    topicTab: {
        fontSize: "15px",
        fontWeight: 600
    },
    topicListHeaderMenu: {
        display: "none",
        marginRight: "15px",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        }
    },
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        marginTop: "100px"
    }
}));

const _TopicStatusList = ({
    fetchAction,
    error,
    currentUser,
    pending,
    hasMore,
    statusesOnTopic,
    statusLikePendingMap,
    repostsPendingMap,
    changeTabAndFetchStatuses,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    setIsTopicsMenuOpen,
    unfollowStatusAuthorWithDialog,
    currentStatusUsername,
    unfollowStatusAuthor,
    setUnfollowDialogOpen,
    unfollowDialogOpen
}) => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState("hot");

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setTabValue(newValue);
        changeTabAndFetchStatuses(newValue);
    };

    return (
        <>
            <div className={classes.topicListHeader}>
                <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                >
                    <Tab
                        classes={{ wrapper: classes.topicTab }}
                        label="Hot"
                        value="hot"
                        disabled={pending}
                        disableRipple
                    />
                    <Tab
                        classes={{ wrapper: classes.topicTab }}
                        label="Fresh"
                        value="fresh"
                        disabled={pending}
                        disableRipple
                    />
                </Tabs>
                <div
                    className={classes.topicListHeaderMenu}
                    onClick={() => setIsTopicsMenuOpen(true)}
                >
                    <MenuIcon />
                </div>
            </div>

            <TopicsPopularScroll />

            {pending && statusesOnTopic.length === 0 ? (
                <div className={classes.centered}>
                    <Loader size="lg" />
                </div>
            ) : !error ? (
                <InfiniteScroll
                    next={fetchAction}
                    loader={
                        <div className={classes.centered}>
                            <Loader size="lg" />
                        </div>
                    }
                    dataLength={statusesOnTopic.length}
                    style={{ overflowY: "hidden" }}
                    hasMore={hasMore}
                >
                    {statusesOnTopic.map(status => (
                        <StatusListItem
                            key={status.id}
                            status={status}
                            onFavouriteStatusChange={(statusId, favourited) =>
                                favourited
                                    ? favouriteStatus(statusId)
                                    : unfavouriteStatus(statusId)
                            }
                            onFollowRequest={followStatusAuthor}
                            onUnfollowRequest={unfollowStatusAuthorWithDialog}
                            displayMenu={Boolean(currentUser)}
                            currentUserIsAuthor={
                                currentUser && currentUser.id === status.account.id
                            }
                            statusLikePending={statusLikePendingMap[status.id]}
                            repostPending={repostsPendingMap[status.id]}
                            link
                            isMeme={status.is_meme}
                        />
                    ))}
                </InfiniteScroll>
            ) : (
                <TopicNotFound />
            )}

            <UnfollowDialog
                username={currentStatusUsername}
                unfollowAction={unfollowStatusAuthor}
                unfollowDialogOpen={unfollowDialogOpen}
                setUnfollowDialogOpen={setUnfollowDialogOpen}
            />
            <MemezatorDialog />
        </>
    );
};

const mapMobxToProps = ({
    authorization,
    topicStatuses,
    topicsPopular,
    createStatus
}) => ({
    currentUser: authorization.currentUser,
    pending: topicStatuses.pending,
    hasMore: topicStatuses.hasMore,
    statusesOnTopic: topicStatuses.statusesOnTopic,
    statusLikePendingMap: topicStatuses.statusLikePendingMap,
    repostsPendingMap: createStatus.pendingRepostsMap,
    changeTabAndFetchStatuses: topicStatuses.changeTabAndFetchStatuses,
    favouriteStatus: topicStatuses.favouriteStatus,
    unfavouriteStatus: topicStatuses.unfavouriteStatus,
    followStatusAuthor: topicStatuses.followStatusAuthor,
    setIsTopicsMenuOpen: topicsPopular.setIsTopicsMenuOpen,
    unfollowStatusAuthorWithDialog: topicStatuses.unfollowStatusAuthorWithDialog,
    currentStatusUsername: topicStatuses.currentStatusUsername,
    unfollowStatusAuthor: topicStatuses.unfollowStatusAuthor,
    setUnfollowDialogOpen: topicStatuses.setUnfollowDialogOpen,
    unfollowDialogOpen: topicStatuses.unfollowDialogOpen
});

export const TopicStatusList = inject(mapMobxToProps)(observer(_TopicStatusList));
