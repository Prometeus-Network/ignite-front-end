import React from "react";

export const TrendsIcon = ({color}) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="12" width="2" height="6" rx="1" fill={color ? color : "#1C1C1C"}/>
        <rect x="5" y="8" width="2" height="10" rx="1" fill={color ? color : "#1C1C1C"}/>
        <rect x="10" y="6" width="2" height="12" rx="1" fill={color ? color : "#1C1C1C"}/>
        <rect x="15" y="2" width="2" height="16" rx="1" fill={color ? color : "#1C1C1C"}/>
    </svg>
);
