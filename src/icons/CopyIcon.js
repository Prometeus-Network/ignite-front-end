import React from "react";

export const CopyIcon = ({ color }) => (
    <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M11.1484 20H3.6875C1.96432 20 0.5625 18.5982 0.5625 16.875V6.28906C0.5625 4.56589 1.96432 3.16406 3.6875 3.16406H11.1484C12.8716 3.16406 14.2734 4.56589 14.2734 6.28906V16.875C14.2734 18.5982 12.8716 20 11.1484 20ZM3.6875 4.72656C2.82599 4.72656 2.125 5.42755 2.125 6.28906V16.875C2.125 17.7365 2.82599 18.4375 3.6875 18.4375H11.1484C12.0099 18.4375 12.7109 17.7365 12.7109 16.875V6.28906C12.7109 5.42755 12.0099 4.72656 11.1484 4.72656H3.6875ZM17.3984 14.9219V3.125C17.3984 1.40182 15.9966 0 14.2734 0H5.60156C5.17004 0 4.82031 0.349731 4.82031 0.78125C4.82031 1.21277 5.17004 1.5625 5.60156 1.5625H14.2734C15.1349 1.5625 15.8359 2.26349 15.8359 3.125V14.9219C15.8359 15.3534 16.1857 15.7031 16.6172 15.7031C17.0487 15.7031 17.3984 15.3534 17.3984 14.9219Z"
            fill={color || "#FF5C01"}
        />
    </svg>
);
