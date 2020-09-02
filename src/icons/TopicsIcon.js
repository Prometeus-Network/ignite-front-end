import React from "react";

export const TopicsIcon = ({ color }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0)">
            <path
                d="M7.31191 1.5868C7.57303 0.984639 8.42697 0.984639 8.68809 1.5868L10.1321 4.91676C10.2408 5.16737 10.4771 5.33908 10.749 5.36499L14.3622 5.70929C15.0156 5.77155 15.2795 6.5837 14.7875 7.01812L12.0667 9.42044C11.8619 9.60124 11.7717 9.87907 11.8311 10.1457L12.6202 13.6884C12.7628 14.3291 12.072 14.831 11.5068 14.4973L8.38129 12.6521C8.14607 12.5132 7.85393 12.5132 7.61871 12.6521L4.4932 14.4973C3.92801 14.831 3.23715 14.3291 3.37984 13.6884L4.16894 10.1457C4.22832 9.87907 4.13805 9.60124 3.93328 9.42044L1.21252 7.01812C0.720525 6.5837 0.984409 5.77155 1.63779 5.70929L5.25098 5.36499C5.52291 5.33908 5.75925 5.16737 5.86793 4.91675L7.31191 1.5868Z"
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
);
