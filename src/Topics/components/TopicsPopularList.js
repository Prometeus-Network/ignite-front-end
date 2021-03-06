import React from "react";
import { inject, observer } from "mobx-react";
import { FadeLoader } from "react-spinners";
import { useTheme, makeStyles } from "@material-ui/core";

import { TopicPopularItem } from "./TopicPopularItem";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        display: "table"
    }
}));

const _TopicsPopularList = ({ topicsPopularItems, pending }) => {
    const classes = useStyles();
    const theme = useTheme();

    return pending ? (
        <div className={classes.centered}>
            <FadeLoader
                color={theme.palette.primary.main}
                css="transform: scale(0.5); top: 10px; left: 10px"
            />
        </div>
    ) : (
        topicsPopularItems.length > 0 &&
            topicsPopularItems.map(topic => (
                <TopicPopularItem key={topic.id} topic={topic} />
            ))
    );
};

const mapMobxToProps = ({ topicsPopular }) => ({
    topicsPopularItems: topicsPopular.topicsPopularItems,
    pending: topicsPopular.pending
});

export const TopicsPopularList = inject(mapMobxToProps)(
    observer(_TopicsPopularList)
);
