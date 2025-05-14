import React from 'react';
import { Typography, Button, Space, Select, Popconfirm, Upload } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { dummyRequest } from '../../../features/utility';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default (props) => {
  const { routes, title, titleLevel, subTitle, btnList, classes, subText, drop, formcontrol, btnHidden } = props;

  return (
    <PageHeader
      className={`site-page-header align-items-end ${classes ? classes : ''}`}
      title={
        <Space direction="vertical" size={4}>
          <Title level={titleLevel ? titleLevel : 3} className="mb-0">
            {title}
          </Title>
          {subText && <Text className="c-gray subtext-font">{subText}</Text>}
        </Space>
      }
      breadcrumb={routes ? routes : null}
      subTitle={subTitle ? subTitle : null}
      extra={
        <Space size={10} className='align-self-end'>
          {drop && (
            <Select getPopupContainer={trigger => trigger.parentNode} value={drop.value} size="large" className="w-200px" onChange={drop.onAction}>
              {drop.options.map((item, index) => (
                <Select.Option key={index} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          )}
          {btnList &&
            btnList.map((item, index) => (
              <React.Fragment key={index}>
                  {item.permit ? (
                    item.noNeedConfirm ?
                      <Button
                        size="large"
                        type={item?.type ? item?.type : 'primary'}
                        icon={item?.icon ? item?.icon : null}
                        className={btnHidden ? 'd-none' : item.btnHidden ? 'd-none' : (item?.classes ? item.classes : '')}
                        onClick={item.action}
                      >
                        {item.text}
                      </Button>
                    :
                    <Popconfirm
                      title={item.title}
                      onConfirm={item.action}
                      okText="Yes"
                      cancelText="No"
                      placement={item.placement && item.placement}
                    >
                      <Button
                        size="large"
                        type={item?.type ? item?.type : 'primary'}
                        icon={item?.icon ? item?.icon : null}
                        className={btnHidden ? 'd-none' : item.btnHidden ? 'd-none' : (item?.classes ? item.classes : '')}
                      >
                        {item.text}
                      </Button>
                    </Popconfirm>
                  ) : item.isUploadCsv ?
                    // accept="image/*"
                    <Upload onChange={item.action} maxCount={1} customRequest={dummyRequest} showUploadList={false} className={item.btnHidden ? 'd-none' : ''}> 
                      <Button className={item.classes} icon={<UploadOutlined />}>{item.text}</Button>
                    </Upload>
                  : (
                    <Button
                      size="large"
                      type={item?.type ? item?.type : 'primary'}
                      icon={item?.icon ? item?.icon : null}
                      className={item.btnHidden ? 'd-none' : (item?.classes ? item.classes : '')}
                      onClick={item.action}
                      title={item.title}
                    >
                      {item.text}
                    </Button>
                )}
              </React.Fragment>
            ))}
          {formcontrol && formcontrol}
        </Space>
      }
    />
  );
};