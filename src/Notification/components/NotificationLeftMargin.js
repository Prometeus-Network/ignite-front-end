import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    notificationLeftMargin: {
        backgroundColor: theme.palette.background.light,
        paddingLeft: theme.spacing(6),
        borderRight: "1px solid rgb(241, 235, 232)"
    },
}));

export const NotificationLeftMargin = () => {
    const classes = useStyles();

    return <div className={classes.notificationLeftMargin} />;
};
