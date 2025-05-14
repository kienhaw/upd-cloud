import React from 'react';
import { Button, Tooltip } from 'antd';

export default (props) => {
  const { title, btnClass, btnType, btnAction, btnIcon } = props;

  return (
    <>
      <Tooltip title={title}>
        <Button
          type={btnType}
          className={btnClass}
          onClick={btnAction}
          icon={btnIcon}
        />
      </Tooltip>
    </>
  );
}