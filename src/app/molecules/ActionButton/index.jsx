import React, { useEffect, useState } from 'react';
import { Space, Button, Tooltip } from 'antd';
import DeletePopup from 'Molecules/DeletePopup';
import { Popup } from 'Atoms/Popup';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default (props) => {
  const { btnAction1, recordId, onRemove, title, removeTitle, extraBtn, extraBtnTooltip, extraBtnIcon, extraBtnAction, allowedEdit, allowedDelete } = props;
  const [removeVisible, setRemoveVisible] = useState(false);

  const popup = {
    closable: false,
    visibility: removeVisible,
    class: 'black-modal',
    content: <DeletePopup title={title} x loading={props.loading} onClose={() => setRemoveVisible(false)} onDelete={() => { 
      onRemove(recordId);
      setTimeout(() => setRemoveVisible(false), 500);
    }} />,
    width: 536,
    onCancel: () => setRemoveVisible(false),
  };

  return (
    <>
      <Space size={10}>
        {extraBtn &&
          <Tooltip title={extraBtnTooltip}>
            <Button
              type={'link'}
              className={props.classes ? props.classes : 'c-success'}
              onClick={extraBtnAction}
              icon={extraBtnIcon}
            >
              {props.extraBtnLabel && props.extraBtnLabel}
            </Button>
          </Tooltip>
        }
        { // allowedEdit
          btnAction1 &&
          <Tooltip title={"Edit"}>
            <Button
              type={'link'}
              className={'c-primary'}
              onClick={btnAction1}
              icon={<EditOutlined />}
            />
          </Tooltip>
        }
        {
          // allowedDelete &&
          onRemove &&
          <Tooltip title={removeTitle ? removeTitle : "Delete"}>
            <Button
              type={'link'}
              className={'c-danger'}
              onClick={() => setRemoveVisible(true)}
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        }
      </Space>
      <Popup {...popup}/>
    </>
  );
}