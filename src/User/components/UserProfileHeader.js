import React from "react";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import { format } from "date-fns";
import { Button, Grid, Link, Typography } from "@material-ui/core";

import { UserProfileAvatar } from "./UserProfileAvatar";
import { UserProfileTab } from "./UserProfileTab";
import { UpdateUserProfileButton } from "./UpdateUserProfileButton";
import { UserProfileHeaderButton } from "./UserProfileHeaderButton";
import { UserBalanceButton } from "./UserBalanceButton";
import { localized } from "../../localization/components";
import { useRouter } from "../../store/hooks";
import { Routes } from "../../routes";

const _UserProfileHeader = ({
    avatar,
    following,
    followers,
    currentUserFollows,
    statuses,
    activeTab,
    onFollowRequest,
    onUnfollowRequest,
    onTabSelected,
    username,
    displayName,
    bio,
    externalUrl,
    userBalance,
    createdAt,
    currentUser,
    currentUserFollowingCount,
    l,
    dateFnsLocale
}) => {
    const store = useRouter();

    let profileButton = null;

    if (currentUser) {
        if (currentUser.username !== username) {
            profileButton = currentUserFollows ? (
                <Grid className="user-profile-header-content-bottom-follow-button">
                    <UserProfileHeaderButton
                        username={username}
                        onUnfollowRequest={onUnfollowRequest}
                    />
                </Grid>
            ) : (
                <Grid className="user-profile-header-content-bottom-follow-button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onFollowRequest(username)}
                        disableElevation
                    >
                        {l("user.profile.follow")}
                    </Button>
                </Grid>
            );
        } else {
            profileButton = <UpdateUserProfileButton />;
        }
    }

    return (
        <Grid container className="user-profile-header-content another-user">
            <Grid className="user-profile-header-content-top">
                <Grid container>
                    <Grid item xs={12} className="justify-content-center">
                        <UserProfileAvatar avatarUrl={avatar} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="user-card-info">
                            <Typography variant={"h4"}>{displayName}</Typography>
                            <Typography>@{username}</Typography>
                            {externalUrl && (
                                <Link
                                    href={externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {externalUrl}
                                </Link>
                            )}
                            {bio && (
                                <Typography
                                    variant={"h6"}
                                    className="user-card-info-bio"
                                >
                                    <Markdown source={bio} plugins={[breaks]} />
                                </Typography>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="user-profile-header-content-bottom">
                <Grid className="user-profile-header-content-bottom-follows">
                    <UserProfileTab
                        active={activeTab === "posts"}
                        header={
                            currentUser && currentUser.username === username
                                ? currentUser.statuses_count
                                : statuses
                        }
                        subheader={l("user.profile.posts")}
                        onSelectActive={() => onTabSelected("posts")}
                        linkProps={{
                            view: Routes.userProfile,
                            params: { username },
                            store
                        }}
                    />
                    <UserProfileTab
                        active={activeTab === "followers"}
                        header={
                            currentUser && currentUser.username === username
                                ? currentUser.followers_count
                                : followers
                        }
                        subheader={l("user.profile.followers")}
                        onSelectActive={() => onTabSelected("followers")}
                        linkProps={{
                            view: Routes.userFollowers,
                            params: { username },
                            store
                        }}
                    />
                    <UserProfileTab
                        active={activeTab === "following"}
                        header={
                            currentUser && currentUser.username === username
                                ? currentUserFollowingCount
                                : following
                        }
                        subheader={l("user.profile.following")}
                        onSelectActive={() => onTabSelected("following")}
                        linkProps={{
                            view: Routes.userFollowing,
                            params: { username },
                            store
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography
                        variant="body1"
                        className="user-profile-info-member-since"
                        align="center"
                    >
                        {l("user.profile.member-since")}{" "}
                        {format(createdAt, "MMMM yyyy", { locale: dateFnsLocale })}
                    </Typography>
                </Grid>
                {currentUser && currentUser.username === username && (
                    <UserBalanceButton userBalance={userBalance} withMargin />
                )}
                {profileButton}
            </Grid>
        </Grid>
    );
};

export const UserProfileHeader = localized(_UserProfileHeader);
