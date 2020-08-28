import React from "react";
import { inject, observer } from "mobx-react";
import {
    AppBar as MuiAppBar,
    Hidden,
    Toolbar,
    withTheme,
    makeStyles
} from "@material-ui/core";

import {
    AppBarLink,
    UserAppBarMenu,
    ExpandDrawerButton,
    NavigationalDrawer,
    AppBarLogo,
    AppBarLanguageSelect
} from "./";
import {
    OpenLoginDialogButton,
    GenericAuthorizationDialog
} from "../../Authorization/components";
import {
    CreateStatusDialog,
    OpenCreateStatusDialogButton,
    OpenCreateStatusDialogFloatingActionButton
} from "../../Status/components";
import { SearchInput } from "../../Search/components";
import { Routes } from "../../routes";
import { localized } from "../../localization/components";
import { BellIcon } from "../../icons/BellIcon";
import { ChatIcon } from "../../icons/ChatIcon";
import { TopicsIcon } from "../../icons/TopicsIcon";
import { MemezatorIcon } from "../../icons/MemezatorIcon";
import { CommunitiesIcon } from "../../icons/CommunitiesIcon";
import { CustomHomeOutlinedIcon } from "../../icons/CustomHomeOutlinedIcon";

const useStyles = makeStyles(theme => ({
    appBarContainer: {
        background: "#fff",
        boxShadow: "none"
    },
    headerContainer: {
        borderBottom: `1px solid ${theme.palette.border.main}`,
        background: "#fff",
        boxShadow: "none",
        minHeight: "50px"
    },
    navStyle: {
        display: "flex",
        justifyContent: "space-between",
        height: 50,
        width: "90%",
        maxWidth: "1170px",
        margin: "auto"
    },
    navItemList: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    mobileNav: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            position: "fixed",
            bottom: 0,
            display: "flex",
            justifyContent: "space-around",
            height: 50,
            width: "100%",
            background: theme.palette.background.light,
            zIndex: 10
        }
    },
    navSecondary: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: 170
    },
    searchWrapper: {
        display: "flex",
        marginLeft: "15px"
    }
}));

const _AppBar = ({
    currentActiveRoute,
    routerStore,
    currentUser,
    notificationsCount,
    isSearchActive,
    theme,
    l
}) => {
    const classes = useStyles();

    const navTitleList = {
        "/": l("appbar.home"),
        "/chat": l("appbar.chat"),
        "/notifications": l("appbar.notifications"),
        "/topics": l("appbar.topics"),
        "/edit-profile": l("appbar.edit-profile"),
        "/memezator": l("appbar.memezator"),
        "/communities": l("appbar.communities"),
        "/community": l("appbar.community"),
        "/transactions": l("appbar.transactions"),
    };

    return (
        <>
            <MuiAppBar classes={{ root: classes.appBarContainer }}>
                <Toolbar classes={{ root: classes.headerContainer }}>
                    <Hidden mdUp>
                        {currentUser ? <ExpandDrawerButton /> : <div />}
                    </Hidden>
                    <nav className={classes.navStyle}>
                        <div className={classes.navItemList}>
                            <AppBarLogo />
                            <AppBarLink
                                text={l("appbar.home")}
                                targetView={Routes.home}
                                active={currentActiveRoute === "home"}
                                icon={
                                    <CustomHomeOutlinedIcon
                                        color={
                                            currentActiveRoute === "home"
                                                ? theme.palette.primary.main
                                                : theme.palette.text.primary
                                        }
                                    />
                                }
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="homeLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                            <AppBarLink
                                text={l("appbar.notifications")}
                                targetView={Routes.notifications}
                                active={currentActiveRoute === "notifications"}
                                icon={
                                    <BellIcon
                                        color={
                                            currentActiveRoute === "notifications" &&
                                            theme.palette.primary.main
                                        }
                                        count={notificationsCount}
                                    />
                                }
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="notificationsLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                            {/* <AppBarLink
                                text={l("appbar.chat")}
                                targetView={Routes.chat}
                                active={currentActiveRoute === "chat"}
                                icon={
                                    <ChatIcon
                                        color={
                                            currentActiveRoute === "chat" &&
                                            theme.palette.primary.main
                                        }
                                    />
                                }
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="chatLink"
                                hidden={Boolean(window.AndroidCallback)}
                            /> */}
                            <AppBarLink
                                text={l("appbar.topics")}
                                targetView={Routes.topics}
                                active={currentActiveRoute === "topics"}
                                icon={
                                    <TopicsIcon
                                        color={
                                            currentActiveRoute === "topics" &&
                                            theme.palette.primary.main
                                        }
                                    />
                                }
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="topicsLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                            <AppBarLink
                                text={l("appbar.memezator")}
                                targetView={Routes.memezator}
                                active={currentActiveRoute === "memezator"}
                                icon={
                                    <MemezatorIcon
                                        color={
                                            currentActiveRoute === "memezator" &&
                                            theme.palette.primary.main
                                        }
                                    />
                                }
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="memezatorLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                            <AppBarLink
                                text={l("appbar.communities")}
                                targetView={Routes.communities}
                                active={currentActiveRoute === "communities"}
                                icon={
                                    <CommunitiesIcon
                                        color={
                                            currentActiveRoute === "communities" &&
                                            theme.palette.primary.main
                                        }
                                    />
                                }
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="communitiesLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                        </div>
                        <div className={classes.navSecondary}>
                            <SearchInput />

                            <Hidden smDown>
                                <UserAppBarMenu />
                            </Hidden>
                            {currentUser ? (
                                <Hidden smDown>
                                    <OpenCreateStatusDialogButton />
                                </Hidden>
                            ) : (
                                <div />
                            )}
                            {!currentUser && <OpenLoginDialogButton />}
                            <Hidden smDown>
                                <div className="select-language">
                                    <AppBarLanguageSelect />
                                </div>
                            </Hidden>

                            <div className="mobile_header">
                                <GenericAuthorizationDialog />
                                <span className="mobile_header-title">
                                    {currentUser &&
                                        !isSearchActive &&
                                        navTitleList[`/${window.location.pathname.split("/")[1]}`]}
                                </span>
                                <div className={classes.searchWrapper}>
                                    <SearchInput />
                                    <div className="select-language">
                                        <AppBarLanguageSelect />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NavigationalDrawer />
                        <CreateStatusDialog />
                    </nav>
                </Toolbar>
            </MuiAppBar>

            {currentUser && <OpenCreateStatusDialogFloatingActionButton />}

            <nav className={classes.mobileNav}>
                <AppBarLink
                    text={l("appbar.home")}
                    targetView={Routes.home}
                    active={currentActiveRoute === "home"}
                    icon={
                        <CustomHomeOutlinedIcon
                            color={
                                currentActiveRoute === "home"
                                    ? theme.palette.primary.main
                                    : theme.palette.text.primary
                            }
                        />
                    }
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="homeLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
                <AppBarLink
                    text={l("appbar.notifications")}
                    targetView={Routes.notifications}
                    active={currentActiveRoute === "notifications"}
                    icon={
                        <BellIcon
                            color={
                                currentActiveRoute === "notifications" &&
                                theme.palette.primary.main
                            }
                            count={notificationsCount}
                        />
                    }
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="notificationsLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
                {/* <AppBarLink
                    text={l("appbar.chat")}
                    targetView={Routes.chat}
                    active={currentActiveRoute === "chat"}
                    icon={
                        <ChatIcon
                            color={
                                currentActiveRoute === "chat" &&
                                theme.palette.primary.main
                            }
                        />
                    }
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="chatLink"
                    hidden={Boolean(window.AndroidCallback)}
                /> */}
                <AppBarLink
                    text={l("appbar.topics")}
                    targetView={Routes.topics}
                    active={currentActiveRoute === "topics"}
                    icon={
                        <TopicsIcon
                            color={
                                currentActiveRoute === "topics" &&
                                theme.palette.primary.main
                            }
                        />
                    }
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="topicsLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
                <AppBarLink
                    text={l("appbar.memezator")}
                    targetView={Routes.memezator}
                    active={currentActiveRoute === "memezator"}
                    icon={
                        <MemezatorIcon
                            color={
                                currentActiveRoute === "memezator" &&
                                theme.palette.primary.main
                            }
                        />
                    }
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="memezatorLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
                <AppBarLink
                    text={l("appbar.communities")}
                    targetView={Routes.communities}
                    active={currentActiveRoute === "communities"}
                    icon={
                        <CommunitiesIcon
                            color={
                                currentActiveRoute === "communities" &&
                                theme.palette.primary.main
                            }
                        />
                    }
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="communitiesLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
            </nav>
        </>
    );
};

const mapMobxToProps = ({ store, authorization, notifications, searchUsers }) => ({
    routerStore: store,
    currentUser: authorization.currentUser,
    notificationsCount: notifications.notificationsCount,
    isSearchActive: searchUsers.isSearchActive
});

export const AppBar = localized(
    withTheme(inject(mapMobxToProps)(observer(_AppBar)))
);
