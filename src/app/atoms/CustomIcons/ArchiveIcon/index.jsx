import React from "react";
import Icon from '@ant-design/icons';

const ArchiveSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25.21" height="17.822" viewBox="0 0 25.21 17.822" fill="currentColor">
    <path id="Archive_Icon" data-name="Archive Icon" d="M39.383,71.385a1.459,1.459,0,0,0-1.093-.476h-1.4a1.341,1.341,0,0,0-1.4-1.273h-1.4V68.363a1.341,1.341,0,0,0-1.4-1.273H15.88a1.341,1.341,0,0,0-1.4,1.273V83.639a1.341,1.341,0,0,0,1.4,1.273H35.488a1.378,1.378,0,0,0,1.367-1l2.8-11.457a1.188,1.188,0,0,0-.274-1.073Zm-23.5-3.022H32.687v1.273h-1.4a1.341,1.341,0,0,0-1.4,1.273h-8.4a1.378,1.378,0,0,0-1.367,1s-2.833,11.642-2.833,11.734h-1.4V68.362Z" transform="translate(-14.48 -67.09)" />
  </svg>
);

const ArchiveIcon = props => <Icon component={ArchiveSVG} {...props} />;
export default ArchiveIcon;

