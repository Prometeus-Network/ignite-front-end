import React from "react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";
import { Link } from "mobx-router";

import { trimString } from "../../utils/string-utils";
import { Routes } from "../../routes";
import { UserFollowButton } from "./UserFollowButton";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";

const useStyles = makeStyles(theme => ({
    usersList: {
        display: "flex",
        padding: 16,
        border: `1px solid ${theme.palette.border.main}`,
        borderTop: "none",
        textDecoration: "none",

        "&:first-child": {
            borderTop: `1px solid ${theme.palette.border.main}`,
            borderRadius: "4px 4px 0 0"
        },

        "&:last-child": {
            borderRadius: "0 0 4px 4px"
        },

        "&:hover": {
            background: theme.palette.background.light
        }
    },
    usersListAvatar: {
        marginRight: 12,
        height: 35,
        width: 35
    },
    usersListContent: {
        width: "100%",

        "& > p": {
            fontWeight: 300,
            fontSize: "13px",
            lineHeight: "16px",
            margin: "4px 0 0",
            color: theme.palette.text.main
        }
    },
    usersListRow: {
        display: "flex",
        justifyContent: "space-between",

        "& p": {
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",
            textDecoration: "none",
            color: theme.palette.text.main
        },

        "& small": {
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "18px",
            color: theme.palette.text.secondary
        }
    }
}));

export const UsersListItem = ({ user, actionWithFollow, routerStore, currentUser }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.usersList}
            key={user.id}
            view={Routes.userProfile}
            params={{ username: user.username }}
            store={routerStore}
        >
            <Avatar
                className={classes.usersListAvatar}
                src={
                    user.avatar ||
                    "http://localhost:3000/avatars/original/missing.png"
                }
            />
            <div className={classes.usersListContent}>
                <div className={classes.usersListRow}>
                    <Typography>
                        <div>{user.display_name}</div>
                        <small>@{user.username}</small>
                    </Typography>
                    <ClickEventPropagationStopper>
                        {currentUser && 
                            <UserFollowButton
                                user={user}
                                actionWithFollow={actionWithFollow}
                            />
                        }
                    </ClickEventPropagationStopper>
                </div>
                <p>{user.bio}</p>
            </div>
        </Link>
    );
};
