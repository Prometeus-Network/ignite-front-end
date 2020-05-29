import React from "react";
import { inject } from "mobx-react";
import { Avatar, makeStyles } from "@material-ui/core";
import { Link } from "mobx-router";

import { trimString } from "../../utils/string-utils";
import { Routes } from "../../routes";
import { FollowButton } from "./";

const useStyles = makeStyles(() => ({
    whoToFollowBodyItem: {
        padding: "16px",
        borderBottom: "1px solid #F1EBE8",
        display: "flex",

        "& a": {
            display: "inline-block"
        }
    },
    whoToFollowBodyItemAvatar: {
        width: "24px",
        height: "24px",
        borderBottom: "1px solid #F1EBE8"
    },
    whoToFollowBodyItemContent: {
        fontFamily: "Museo Sans Cyrl Regular",
        fontStyle: "normal",
        paddingLeft: "8px",

        "& a": {
            textDecoration: "none"
        },

        "& h3": {
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",
            margin: "0 0 4px 0",
            color: "#1C1C1C"
        },

        "& small": {
            display: "block",
            marginBottom: "8px",
            fontWeight: 300,
            fontSize: "12px",
            lineHeight: "14px",
            color: "#A2A2A2"
        }
    }
}));

const _SideBarList = ({ users, actionWithFollow, routerStore }) => {
    const classes = useStyles();

    return users.map(user => (
        <div className={classes.whoToFollowBodyItem} key={user.id}>
            <Link
                view={Routes.userProfile}
                params={{ username: user.id }}
                store={routerStore}
            >
                <Avatar
                    className={classes.whoToFollowBodyItemAvatar}
                    src={
                        user.avatar ||
                        "http://localhost:3000/avatars/original/missing.png"
                    }
                />
            </Link>
            <div className={classes.whoToFollowBodyItemContent}>
                <Link
                    view={Routes.userProfile}
                    params={{ username: user.id }}
                    store={routerStore}
                >
                    <h3>{trimString(user.display_name, 24)}</h3>
                </Link>
                <small>@{trimString(user.username, 24)}</small>
                <FollowButton user={user} actionWithFollow={actionWithFollow} />
            </div>
        </div>
    ));
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store
});

export const SideBarList = inject(mapMobxToProps)(_SideBarList);