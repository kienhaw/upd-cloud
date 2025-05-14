import React from 'react';
import Icon from '@ant-design/icons';

const LppaSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_4534" data-name="Rectangle 4534" width="20" height="20" fill="#fff" />
      </clipPath>
    </defs>
    <g id="Group_27289" data-name="Group 27289" clip-path="url(#clip-path)">
      <path
        id="Path_30275"
        data-name="Path 30275"
        d="M18,0H2A2.006,2.006,0,0,0,0,2V18a2.006,2.006,0,0,0,2,2H18a2.006,2.006,0,0,0,2-2V2a2.006,2.006,0,0,0-2-2m0,17a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H17a1,1,0,0,1,1,1Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <rect
        id="Rectangle_4530"
        data-name="Rectangle 4530"
        width="12"
        height="2"
        transform="translate(4.002 5)"
      />
      <rect
        id="Rectangle_4531"
        data-name="Rectangle 4531"
        width="9.998"
        height="2.001"
        transform="translate(4.002 8.992)"
        fill="#fff"
      />
      <rect
        id="Rectangle_4532"
        data-name="Rectangle 4532"
        width="7.994"
        height="2.001"
        transform="translate(4.003 12.999)"
      />
      <rect
        id="Rectangle_4533"
        data-name="Rectangle 4533"
        width="2.001"
        height="2.001"
        transform="translate(13.993 13)"
      />
    </g>
  </svg>
);

const LppaIcon = (props) => <Icon component={LppaSvg} {...props} />;

export default LppaIcon;
