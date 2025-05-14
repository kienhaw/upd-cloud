import React, { useContext, useRef, useState, useEffect } from 'react';
import { Row, Col, Card, Table, Radio, Typography, Space, Button, Form, Input } from 'antd';

const { Text, Title } = Typography;

export default (props) => {
  const {
    ListCol,
    ListData,
    filterData,
    pagination,
    onFilter,
    filterValue,
    filters,
    Search,
    ExtraBlocks,
    BlocksCount,
    onSearch,
    onRow,
    total,
    totaltitle,
    title,
    onChange,
    listClass,
    blackCard,
    extraBtn,
    extraAction,
    btnClass,
    extraBtn2,
    extraAction2,
    btnClass2,
    headclass,
    listStat,
    rowSelection,
    rowClassName,
    headerbutton,
    widgetbtn,
    bordered,
    summary,
    searchTitle,
    expandable,
    size,
    showHeader,
    cellEditable,
    customComponents,
    isSticky,
    loading,
    extraDiv
  } = props;

  const searchProps = {
    field1: props.field1,
    field2: props.field2,
    field3: props.field3,
    field4: props.field4,
    field5: props.field5,
    field6: props.field6,
    field7: props.field7,
    onChange1: props.onChange1,
    searchTitle: searchTitle,
    searchVal: props.searchVal
  };

  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      let value = record[dataIndex];
      if (restProps.resetfield === "true") {
        if(parseFloat(value) === 0) {
          value = "";
        }
      }
      form.setFieldsValue({
        [dataIndex]: value,
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        }, { ...record }, dataIndex);
      } catch (errInfo) {
        console.log(errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={restProps.req ? restProps.req : null}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <Card bordered={false} className={`uni-card ${listClass ? listClass : ''}`}>
      <Row gutter={[20, 15]}>
        {(title || widgetbtn || headerbutton) && (
          <Col span={24}>
            <Row gutter={20}>
              <Col flex='auto'>
                {widgetbtn && widgetbtn}
                {title && <Title level={4} className={`c-default mb-0 ${headclass ? headclass : ''}`}>
                  {title}
                </Title>}
              </Col>
              {headerbutton && <Col>{headerbutton}</Col>}
            </Row>
          </Col>
        )}
        {total && (
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Text className="c-gray">Total</Text>
              <Title level={3} className="ag-fontSize24 mb-0">{`${total} ${totaltitle}`}</Title>
            </Space>
          </Col>
        )}
        {listStat &&
          listStat.map((x, i) => (
            <Col flex={x.width} key={i}>
              <Card bordered={false} className="red-card">
                <Space size={20}>
                  {x.icon}
                  <Space size={4} direction="vertical">
                    <Text className="op-6">{x.title}</Text>
                    <Title level={4} className=" c-white mb-0">
                      {x.text}
                    </Title>
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        {filters && (
          <Col span={24}>
            <Radio.Group
              size="large"
              className="radio-tabs"
              buttonStyle="solid"
              options={filters}
              onChange={onFilter}
              value={filterValue}
              optionType="button"
            />
          </Col>
        )}
        {ExtraBlocks ? (
          <Col span={24}>
            <ExtraBlocks data={BlocksCount} />
          </Col>
        ) : null}
        {onSearch && (
          <Col span={24}>
            <Search onSearch={onSearch} {...searchProps} />
          </Col>
        )}
        {
          extraDiv && (
            <Col span={24}>
              {extraDiv}
            </Col>
          )
        }
        <Col span={24}>
          <Table
            components={cellEditable ? components : customComponents}
            scroll={{ x: props.scrolling ? props.scrolling : 1000 }}
            onRow={onRow}
            rowClassName={rowClassName}
            className={`custom-table ${props.classes ? props.classes : ''}`}
            bordered={bordered}
            columns={ListCol}
            dataSource={filterData != null ? filterData : ListData}
            pagination={pagination}
            onChange={onChange}
            rowSelection={rowSelection}
            summary={summary && summary}
            expandable={expandable && expandable}
            size={size && size}
            showHeader={showHeader}
            sticky={isSticky}
          />
        </Col>
        {(extraBtn || extraBtn2) && (
          <Col span={24} className="text-right">
            <Space size={10}>
              {extraBtn2 && (
                <Button
                  type="primary"
                  size="large"
                  htmlType="button"
                  className={btnClass2 ? btnClass2 : ''}
                  onClick={extraAction2}
                >
                  {extraBtn2}
                </Button>
              )}
              {extraBtn && (
                <Button
                  type="primary"
                  size="large"
                  htmlType="button"
                  className={btnClass ? btnClass : ''}
                  onClick={extraAction}
                >
                  {extraBtn}
                </Button>
              )}
            </Space>
          </Col>
        )}
      </Row>
    </Card>
  );
};
