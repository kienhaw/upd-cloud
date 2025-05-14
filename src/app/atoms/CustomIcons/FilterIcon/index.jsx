import React from 'react';
import Icon from '@ant-design/icons';

const FilterSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
    <path
      id="Icon"
      d="M271,329h-1a1,1,0,0,1,0-2h1a1,1,0,0,1,0,2Zm0-5h-7.28a2,2,0,1,1,0-2H271a1,1,0,0,1,0,2Zm-13,0h-1a1,1,0,0,1,0-2h1a1,1,0,0,1,0,2Zm-1,3h7.28a2,2,0,1,1,0,2H257a1,1,0,0,1,0-2Zm0,5h1a1,1,0,0,1,0,2h-1a1,1,0,0,1,0-2Zm6.72,0H271a1,1,0,0,1,0,2h-7.28a2,2,0,1,1,0-2Z"
      transform="translate(-256 -321)"
      fill="#fff"
      fillRule="evenodd"
    />
  </svg>
);

const FilterIcon = (props) => <Icon component={FilterSvg} {...props} />;

export default FilterIcon;
