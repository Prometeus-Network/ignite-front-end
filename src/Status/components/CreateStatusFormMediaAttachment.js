import React, { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
    centered: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    mediaFile: {
        position: "relative",
        width: 100,
        height: 100,
        minWidth: 100,
        marginRight: theme.spacing(2),
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    mediaFileClose: {
        color: "#fff",
        position: "absolute",
        right: 0,
        top: 0
    }
}));

export const CreateStatusFormMediaAttachment = ({ fileContainer, onDelete }) => {
    const [hovered, setHovered] = useState(false);
    const classes = useStyles();

    const hoveredStyle = {
        backgroundImage: `url(${fileContainer.url})`,
        boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.2)"
    };

    const notHoveredStyle = {
        backgroundImage: `url(${fileContainer.url})`
    };

    return (
        <div
            className={classes.mediaFile}
            style={hovered ? hoveredStyle : notHoveredStyle}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
            key={fileContainer.fileId}
        >
            {!fileContainer.pending && (
                <IconButton
                    onClick={() => onDelete(fileContainer.fileId)}
                    classes={{ root: classes.mediaFileClose }}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
            )}
            {fileContainer.pending && (
                <div className={classes.centered}>
                    <Loader size="md" css="top: 11px; left: 13px" />
                </div>
            )}
        </div>
    );
};
