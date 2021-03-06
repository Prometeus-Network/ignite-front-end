import React from "react";
import { Badge, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    badge: {
        top: "-1px",
        right: "-3px",
        height: "15px",
        minWidth: "16px",
        padding: "3px",
        fontSize: "11px !important"
    }
}));

export const BellIcon = ({ color, width, height, count }) => {
    const classes = useStyles();

    return (
        <Badge
            badgeContent={count}
            color="primary"
            invisible={count <= 0}
            classes={{
                badge: classes.badge
            }}
            style={{ marginRight: count >= 100 ? "8px" : count > 0 ? "5px" : 0 }}
        >
            <svg
                width={width || "16"}
                height={height || "16"}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0)">
                    <path
                        d="M7.99981 15.3C7.86795 15.3 7.7394 15.285 7.61582 15.2566H8.38379C8.26021 15.285 8.13166 15.3 7.99981 15.3Z"
                        stroke={color || "#1C1C1C"}
                        strokeWidth="1.4"
                    />
                    <path
                        d="M8.64223 0.862024C8.43087 0.839957 8.21647 0.828645 7.99961 0.828645C7.78291 0.828645 7.56869 0.839911 7.35753 0.861884C7.52289 0.759303 7.7177 0.7 7.92593 0.7H8.07364C8.28195 0.7 8.47683 0.759356 8.64223 0.862024Z"
                        stroke={color || "#1C1C1C"}
                        strokeWidth="1.4"
                    />
                    <path
                        d="M11.8332 6.98558L11.8333 6.99706L11.8335 7.00511C11.8338 8.40057 11.9666 10.4759 12.6897 12.0038C12.8846 12.4158 13.0867 12.7107 13.262 12.9177H2.73848C2.91377 12.7107 3.11585 12.4159 3.31086 12.0038C4.0347 10.4744 4.16698 8.39636 4.16698 7.00087C4.16698 4.88789 5.88714 3.16777 8.0001 3.16777C10.1081 3.16777 11.8251 4.87961 11.8332 6.98558Z"
                        stroke={color || "#1C1C1C"}
                        strokeWidth="1.4"
                    />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </Badge>
    );
};
