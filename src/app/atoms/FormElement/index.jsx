import React, { useEffect } from 'react';
import {
  DatePicker,
  Button,
  Form,
  Input,
  Checkbox,
  TimePicker,
  Upload,
  Switch,
  Radio,
  Slider,
  Rate,
  Space,
  InputNumber,
  Card,
  Typography,
  ColorPicker
} from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { dummyRequest } from '../../../features/utility';
import { DownloadIcon } from '../CustomIcons';

const { Text } = Typography;

export const InputField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage, readOnly } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item
        required={isRequired ? isRequired : false}
        label={label}
        validateStatus={validate}
        help={validMessage}
        className={props.class}
      >
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue || initValue == 0 ? initValue : ''}
          rules={rules}
          render={({ field }) => (
            <Input
              {...field}
              onChange={(e) => {
                field.onChange(e);
                props.onChange && props.onChange(e);
              }}
              onBlur={(e) => {
                field.onBlur(e);
                props.onBlur && props.onBlur(e);
              }}
              onFocus={(e) => {
                props.selectAllOnFocus && e.target.select()
              }}
              {...iProps}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export const InputFieldNumber = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage, readOnly } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item
        required={isRequired ? isRequired : false}
        label={label}
        validateStatus={validate}
        help={validMessage}
        className={props.class}
      >
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue || ''}
          rules={rules}
          render={({ value, onChange }) => (
            <InputNumber
              value={value}
              onChange={(e) => {
                onChange(e);
                props.onChange && props.onChange(e);
              }}
              {...iProps}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export const InputPassword = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item required={isRequired ? isRequired : false} label={label} validateStatus={validate} help={validMessage}>
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue || initValue == 0 ? initValue : ''}
          rules={rules}
          render={({ field }) => (
            <Input.Password {...field} {...iProps} />
          )}
        />
      </Form.Item>
    </>
  );
};

export const SelectField = (props) => {
  const {
    fieldname,
    label,
    control,
    iProps,
    rules,
    selectOption,
    isRequired,
    initValue,
    validate,
    validMessage,
    readOnly,
    menuPlacement,
    isClearable
  } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      noStyle={props.noStyle}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue ? initValue : ''}
        rules={rules}
        render={({ field }) => (
          <Select
            value={field.value}
            isClearable={isClearable}
            className={`customSelect ${iProps.isDisabled && 'disabled'}`}
            isDisabled={readOnly}
            menuPlacement={menuPlacement ? menuPlacement : 'auto'}
            getPopupContainer={trigger => trigger.parentElement}
            defaultValue={initValue}
            styles={{
              control: (val) => ({ ...val, minHeight: 32 }),
              valueContainer: (vcontain) => ({
                ...vcontain,
                padding: '5px 15px',
                textTransform: iProps?.isLowercase ? '' : 'capitalize',
              }),
              dropdownIndicator: (icontain) => ({ ...icontain, padding: 5 }),
              indicatorSeparator: (icontain) => ({
                ...icontain,
                backgroundColor: '#000',
              }),
              option: (vcontain, state) => ({
                ...vcontain,
                textTransform: iProps?.isLowercase ? '' : 'capitalize',
                color: '#BEBEBE',
                backgroundColor: state.isFocused ? '#0077B6' : '#171717',
              }),
              multiValue: (styles, { data }) => {
                return {
                  ...styles,
                  backgroundColor: '#0e0e0e',
                  borderRadius: 8,
                  padding: '0 4px',
                };
              },
              multiValueLabel: (styles) => ({
                ...styles,
                color: '#fff',
              }),
              multiValueRemove: (styles) => ({
                ...styles,
                color: '#7c7c7c',
                ':hover': {
                  backgroundColor: '#0e0e0e',
                  color: 'white',
                },
              }),
              placeholder: (place) => ({ ...place, color: 'rgba(0,0,0,.3)' }),
            }}
            onChange={(e) => {
              field.onChange(e);
              props.onChange && props.onChange(e);
            }}
            onBlur={props.onBlur}
            {...iProps}
            options={selectOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 2,
              colors: { ...theme.colors, primary: '#767676' },
            })}
          />
        )}
      />
    </Form.Item>
  );
};

export const SelectFieldAsync = (props) => {
  const {
    fieldname,
    label,
    control,
    iProps,
    rules,
    loadOptions,
    isRequired,
    initValue,
    validate,
    validMessage,
    readOnly,
    defaultOptions
  } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      noStyle={props.noStyle}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue ? initValue : ''}
        rules={rules}
        render={(field) => {
          return (
            <AsyncSelect
              {...field}
              className={'customSelect asyncSelect'}
              styles={{
                control: (val) => ({ ...val, minHeight: 32 }),
                valueContainer: (vcontain) => ({
                  ...vcontain,
                  padding: '5px 15px',
                  textTransform: 'capitalize',
                }),
                dropdownIndicator: (icontain) => ({ ...icontain, padding: 5 }),
                indicatorSeparator: (icontain) => ({
                  ...icontain,
                  backgroundColor: '#000',
                }),
                option: (vcontain, state) => ({
                  ...vcontain,
                  textTransform: 'capitalize',
                  color: '#BEBEBE',
                  backgroundColor: state.isFocused ? '#0077B6' : '#171717',
                }),
                multiValue: (styles, { data }) => {
                  return {
                    ...styles,
                    backgroundColor: '#0e0e0e',
                    borderRadius: 8,
                    padding: '0 4px',
                  };
                },
                multiValueLabel: (styles) => ({
                  ...styles,
                  color: '#fff',
                }),
                multiValueRemove: (styles) => ({
                  ...styles,
                  color: '#7c7c7c',
                  ':hover': {
                    backgroundColor: '#0e0e0e',
                    color: 'white',
                  },
                }),
                placeholder: (place) => ({ ...place, color: 'rgba(0,0,0,.3)' }),
              }}
              {...iProps}
              onChange={(e) => {
                field.onChange(e);
                props.onChange && props.onChange(e);
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: { ...theme.colors, primary: '#767676' },
              })}
              defaultOptions={defaultOptions ? defaultOptions : []}
              loadOptions={loadOptions}
            />
          );
        }}
      />
    </Form.Item>
  );
};

export const DateField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item
        required={isRequired ? isRequired : false}
        label={label}
        validateStatus={validate}
        help={validMessage}
        className={props.class}
      >
        <Controller
          name={fieldname}
          control={control}
          // defaultValue={initValue ? initValue : ''}
          rules={rules}
          render={({ value, field, fieldState }) => (
            <>
              <DatePicker
                showTime={props.showTime}
                getPopupContainer={trigger => trigger.parentElement}
                defaultValue={initValue ? initValue : ''}
                style={{ width: '100%' }}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  props.onChange && props.onChange(e);
                }}
                {...iProps}
                disabledDate={props.disabledDate}
              />
            </>
          )}
        />
      </Form.Item>
    </>
  );
};

export const InputCheckbox = (props) => {
  const { fieldname, label, control, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      valuePropName="checked"
      className={props.class}
      // noStyle
    >
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            indeterminate={props.intr == true ? props.intr : false}
            disabled={props.disabled}
            onChange={(e) => {
              field.onChange(e.target.checked);
              props.onChange && props.onChange(e.target.checked);
            }}
          >
            {label}
          </Checkbox>
        )}
      />
    </Form.Item>
  );
};

export const CheckboxGroup = (props) => {
  const { fieldname, label, option, control, rules, initValue, isRequired, validate, validMessage, intr } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      label={label}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ field }) => (
          <Checkbox.Group
            value={field.value}
            indeterminate={intr}
            onChange={(e) => {
              field.onChange(e);
              props.onChange && props.onChange(e);
            }}
            disabled={props.disabled}
            className="w-100"
            options={option}
          />
        )}
      />
    </Form.Item>
  );
};

export const TimeField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <>
      <Form.Item required={isRequired ? isRequired : false} label={label} validateStatus={validate} help={validMessage} className={props.class}>
        <Controller
          name={fieldname}
          control={control}
          rules={rules}
          render={({ field }) => (
            <TimePicker
              onChange={(e) => {
                field.onChange(e);
                props.onChange && props.onChange(e);
              }}
              value={field.value}
              style={{ width: '100%' }}
              {...iProps}
            />
          )}

          // render={({ field }) => (
          //   <>
          //   {console.log(fieldname)}
          //     <TimePicker
          //       changeOnBlur={true}
          //       {...field}
          //       {...iProps}
          //       style={{ width: '100%' }}
          //     />
          //   </>
          // )}
        />
      </Form.Item>
    </>
  );
};

export const UploadField = (props) => {
  const {
    fieldname,
    label,
    control,
    rules,
    initValue,
    isRequired,
    validate,
    validMessage,
    filelist,
    fileProps,
    iProps,
    box,
    boxLabel,
    boxLabel2,
    inputPlaceHolder
  } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  const preview = (id, cat, url, app) => {
    // prevDoc(id, cat, url, app).then(res => {
      window.open(url, '_blank');
    // }).catch(e => {
    //   const { response } = e;
    //   message.error('File not found or invalid request');

    // })
  }

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ value, fileList, onChange }) => (
          <>
          <Upload
            className="uploadWithbtn"
            showUploadList={false}
            accept="image/*,.pdf"
            maxCount={1}
            fileList={fileList}
            customRequest={dummyRequest}
            beforeUpload={(e) => {
              props.onBeforeUpload && props.onBeforeUpload(e);
            }}
            onChange={(e) => {
              if(validMessage) {
                return false;
              }
              onChange(e);
              props.onChange && props.onChange(e);
            }}
            {...iProps}
          >
            {box ?
              <Card bordered={false} className='w-100 folio-card'>
                <Space size={10} direction='vertical'>
                  {!value && <PlusCircleFilled style={{ fontSize: '50px' }} />}
                  <Text className='c-gray'>{value ? value.fileList[0].name : boxLabel}</Text>
                  {value && box && <Text className='c-primary'>{boxLabel2}</Text> }
                </Space>
              </Card>
              :
                <Input
                  size="large"
                  className={`ag-upload-btn`}
                  value={value && value.fileList ? value.fileList[0].name : inputPlaceHolder ? inputPlaceHolder : 'Please Upload File'}
                  addonAfter={<PlusCircleFilled />}
                />
            }
            
          </Upload>
            {!box && value && value.fileList && value?.fileList[0].uid == '-1' && (
              <Button
                type="link"
                htmlType="button"
                className={`download-inputbtn`}
                onClick={() => value?.fileList[0].opentab ? window.open(value.fileList[0]?.url, '_blank') : value.fileList[0].s3 ? preview(value.fileList[0]?.aid, value.fileList[0]?.s3,value.fileList[0]?.url, value.fileList[0]?.app) : window.open(value.fileList[0].url)}
                icon={<DownloadIcon className="c-success" />}
              />
            )}
          </>
        )}
      />
    </Form.Item>
  );
};

export const TextAreaField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue || initValue == 0 ? initValue : ''}
        rules={rules}
        // as={<Input.TextArea {...iProps} />}
        render={({ field }) => (
          <Input.TextArea {...field} {...iProps} />
        )}
      />
    </Form.Item>
  );
};

export const InputRadio = (props) => {
  const { fieldname, label, control, rules, initValue, isRequired, validate, validMessage, noStyle } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);
  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      valuePropName="checked"
      noStyle={noStyle}
      label={label}
      className={props.class ? props.class : ''}
    >
      <Controller
        rules={rules}
        name={fieldname}
        control={control}
        defaultValue={initValue ? initValue : ''}
        render={({ value, onChange }) => (
          <Radio.Group
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              props.onChange(e);
            }}
          >
            <Space direction={`${props.direction ? props.direction : 'horizontal'}`} size={20}>
              {props.options && props.options.map((x, i) => (
                <Radio key={i} value={x.value}>{x.label}</Radio>
              ))}
            </Space>
          </Radio.Group>
        )}
      />
    </Form.Item>
  );
};

export const SwitchField = (props) => {
  const { fieldname, control, initValue, rules, iProps, label, labelPosition = false } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);
  return (
    <Form.Item className="mb-0" label={labelPosition ? label : ''}>
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : false}
        render={({ field }) => (
          <div>
            {labelPosition ? '' : label} <Switch checked={field.value} {...field} onChange={(e) => {
              field.onChange(e);
              props.onChange && props.onChange(e);
            }} {...iProps} />
          </div>
        )}
      />
    </Form.Item>
  );
};

export const RateField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage, valueGot } = props;
  useEffect(() => {
    valueGot && props.setValue(fieldname, valueGot);
  }, [valueGot]);
  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue || initValue == 0 ? initValue : ''}
        rules={rules}
        render={({ onBlur, value, onChange }) => (
          <Rate value={value} onChange={onChange} onBlur={props.onBlur} {...iProps} />
        )}
      />
    </Form.Item>
  );
};

export const SliderField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage, valueGot } = props;
  useEffect(() => {
    valueGot && props.setValue(fieldname, valueGot);
  }, [valueGot]);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue || initValue == 0 ? initValue : ''}
        rules={rules}
        render={({ onBlur, value, onChange }) => (
          <Slider value={value} onChange={onChange} onBlur={props.onBlur} {...iProps} />
        )}
      />
    </Form.Item>
  );
};

export const DateRangeField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item
        required={isRequired ? isRequired : false}
        label={label}
        validateStatus={validate}
        help={validMessage}
        className={props.class}
      >
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue ? initValue : ''}
          rules={rules}
          render={({ value, onChange }) => (
            <DatePicker.RangePicker
              showTime
              size="large"
              style={{ width: '100%' }}
              value={value}
              onChange={(e) => {
                onChange(e);
                props.onChange && props.onChange(e);
              }}
              {...iProps}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export const ColorPickerInputField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item
        required={isRequired ? isRequired : false}
        label={label}
        validateStatus={validate}
        help={validMessage}
        className={props.class}
      >
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue ? initValue : ''}
          rules={rules}
          render={({ field }) => (
            <ColorPicker
              value={field.value}
              onChange={(e) => {
                field.onChange(e?.metaColor?.toHexString());
                props.onChange && props.onChange(e?.metaColor?.toHexString());
              }}
              showText={props.showText}
            />
          )}
        />
      </Form.Item>
    </>
  );
};