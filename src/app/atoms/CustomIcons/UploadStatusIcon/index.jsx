import React from 'react';
import Icon from '@ant-design/icons';

const DownloadSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 200 200" fill="#02a574">
    <path
      d="M607.949-40.67A100.019,100.019,0,1,0,707.967,59.349,99.927,99.927,0,0,0,607.949-40.67ZM669.561,68.55v.1l-.2-.1L621.752,118.76a19.53,19.53,0,0,1-27.505.2l-.2-.2L546.438,68.55a13.343,13.343,0,0,1,0-18.7,12.92,12.92,0,0,1,18.2-.3l.3.3,29.906,32.406V7.239a13,13,0,0,1,13.1-13,13.106,13.106,0,0,1,13,13V82.253l29.905-32.406a12.95,12.95,0,0,1,18.3-.3l.2.3A13.251,13.251,0,0,1,669.561,68.55Z"
      transform="translate(707.968 159.367) rotate(180)"
    ></path>
  </svg>
);

const UploadStatusIcon = (props) => <Icon component={DownloadSvg} {...props} />;

export default UploadStatusIcon;
