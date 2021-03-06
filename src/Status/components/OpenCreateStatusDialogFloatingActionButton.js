import React from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, makeStyles } from '@material-ui/core';
import { EditIcon } from '../../icons/EditIcon';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        display: 'none',
        bottom: window.AndroidCallback ? theme.spacing(2) : theme.spacing(8),
        right: theme.spacing(2),
        zIndex: 1000,
        [theme.breakpoints.down('sm')]: {
            display: 'inline-flex',
        },
    },
}));

const _OpenCreateStatusDialogFloatingActionButton = ({ setCreateStatusDialogOpen }) => {
    const classes = useStyles();

    return (
        <Fab
            color="primary"
            onClick={() => setCreateStatusDialogOpen(true)}
            className={classes.fab}
        >
            <EditIcon />
        </Fab>
    );
};

const mapMobxToProps = ({ createStatus }) => ({
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen,
});

export const OpenCreateStatusDialogFloatingActionButton = inject(mapMobxToProps)(observer(_OpenCreateStatusDialogFloatingActionButton));
