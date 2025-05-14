import React from 'react';
import {
  InputField,
  DateField,
  SelectField,
  CheckboxGroup,
  UploadField,
  TextAreaField,
  SwitchField,
  SliderField,
  InputRadio,
  ColorPickerInputField,
  InputPassword
} from '../../atoms/FormElement';
import { Row, Col, InputNumber, Form, Button, Avatar, Typography, Space } from 'antd';
import dayjs from 'dayjs';
import { getFileName } from '../../../features/utility';
import { baseUrl } from '../../../configs/constants';
import { SelectFieldAsync, TimeField } from '../../atoms/FormElement';
import { runes } from 'runes2';

const { Text } = Typography;

export default (props) => {
  const { item, control, errors, parent, index, elem, getValues } = props;

  const setValidate = (mess) => {
    if (parent && errors[`${parent.name}`]) {
      let ret = null;
      errors[`${parent.name}`].map((x, i) => {
        if (Object.keys(x).find((y) => y == item.name) && index == i) {
          if (mess) {
            ret = Object.values(x)[0].message;
          } else {
            ret = 'error';
          }
        }
      });
      return ret;
    } else {
      if (errors[`${item.name}`]) {
        if (mess) {
          return errors[`${item.name}`].message;
        } else {
          return 'error';
        }
      }
    }
  };

  return (
    <Col
      className={item.hidden ? 'd-none' : item.alignEnd ? 'align-self-end' : ''}
      flex={`${item.twocol ? '1 0 300px' : item.colWidth ? item.colWidth : '100%'}`}
    >
      {item.type == 'input' && (
        <>
          <InputField
            isRequired={item.req}
            fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
            label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
            control={control}
            onBlur={item?.onBlur}
            class={`mb-0 ${item.hidden ? 'd-none' : ''} ${item.arrow == false ? 'no-arrow' : ''}`}
            iProps={{
              readOnly: props.static ? props.static : item.static ? true : false,
              placeholder: item.placeholder,
              size: 'large',
              type: item.number && 'number',
              min: item.min && item.min,
              max: item.max && item.max,
              step: item.nostep ? "" : "any",
              addonAfter: item?.addOnButton ? (
                <Button htmlType="button" type="primary" className="green-btn" onClick={item?.onBtnClick} disabled={item?.isDisabledAddOnBtn || item?.static ? true : false}>
                  {item?.addOnButton}
                </Button>
              ) : null,
              suffix: item?.suffix ? item?.suffix : null,
              prefix: item?.prefix ? item?.prefix : null,
              count: item.wordCount ? {
                show: true,
                max: item.wordCount,
                strategy: (txt) => runes(txt).length,
                exceedFormatter: (txt, {max}) => runes(txt).slice(0, max).join(''),
              } : null,
              maxLength: item?.maxLength,
              id: item.id ? item.id : "",
            }}
            initValue={elem && elem[item.name] ? elem[item.name] : item.number ? item.nomin ? '' : 0 : ''}
            rules={{
              required: { value: item.req, message: item.reqmessage },
              pattern: item.email
                ? { value: /(?=^.{1,50}$)^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Enter valid Email Address' }
                : item.nospace
                  ? { value: /^\S*$/, message: 'Spacing is not allowed' }
                : item.string
                  ? { value: /^[A-Za-z ]+$/, message: 'Enter only Alphabets' }
                : item.phone
                  ? {
                    value:
                      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/gim,
                    message: 'Not a valid phone number',
                  }
                : item.nospecial
                  ? { value: /^([a-zA-Z0-9 _-]+)$/, message: 'Special Characters not allowed' }
                : item.novalidate
                  ? ''
                : item.number
                  ? { value: /^\d*\.?\d+$/, message: 'Only numbers are allowed' }
                : item.negativeNumber
                  ? { value: /^-?\d*\.?\d+$/, message: 'Only numbers are allowed' }
                : item.allowNegDecNumNoZero
                  ? { value: /^-?(?:0*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, message: 'Only numbers are allowed. 0 is not allowed.' }
                : item.allowNegDecNum
                  ? { value: /^-?\d*\.?\d+$/, message: 'Only numbers are allowed.' }
                : item.numberAndDec
                  ? { value: /^\d*\.?\d+$/, message: 'Only numbers and decimals are allowed.' }
                : item.maxLength
                  ? { value: /^.{0,48}$/, message: `Only ${item.maxLength} characters are allowed.` }
                : item.multipleEmail 
                  ? {value: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(,\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})*$/, message: 'Enter valid Email Address'}
                : { value: /^[^\s]+(\s+[^\s]+)*$/, message: 'Space not allowed in start and end' },
            }}
            validate={setValidate(false)}
            validMessage={setValidate(true)}
            onChange={item.onChange && item.onChange}
            selectAllOnFocus={item.selectAllOnFocus}
          />
          {item.tips && <span className='c-gray'>{item.tips}</span>}
          {item.beautifyTips && <span className='c-gray' dangerouslySetInnerHTML={item.beautifyTips}></span>}
        </>
      )}

      {item.type == 'grInvoiceInput' && (
        <>
          <InputField
            isRequired={item.req}
            fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
            label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
            control={control}
            onBlur={item?.onBlur}
            class={`mb-0 ${item.hidden ? 'd-none' : ''} ${item.arrow == false ? 'no-arrow' : ''}`}
            iProps={{
              readOnly: props.static ? props.static : item.static ? true : false,
              placeholder: item.placeholder,
              size: 'large',
              type: item.number && 'number',
              min: item.min && item.min,
              max: item.max && item.max,
              step: item.nostep ? "" : "any",
              addonAfter: item?.addOnButton ? (
                <Button htmlType="button" type="primary" className="green-btn" onClick={item?.onBtnClick} disabled={item?.isDisabledAddOnBtn || item?.static ? true : false}>
                  {item?.addOnButton}
                </Button>
              ) : null,
              suffix: item?.suffix ? item?.suffix : null,
              prefix: item?.prefix ? item?.prefix : null,
              value: item?.hasValue && item?.hasValue
            }}
            initValue={elem && elem[item.name] ? elem[item.name] : item.number ? item.nomin ? '' : 0 : ''}
            rules={{
              required: { value: item.req, message: item.reqmessage },
              pattern: item.email
                ? { value: /(?=^.{1,50}$)^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Enter valid Email Address' }
                : item.nospace
                  ? { value: /^\S*$/, message: 'Spacing is not allowed' }
                : item.string
                  ? { value: /^[A-Za-z ]+$/, message: 'Enter only Alphabets' }
                : item.phone
                  ? {
                    value:
                      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/gim,
                    message: 'Not a valid phone number',
                  }
                : item.nospecial
                  ? { value: /^([a-zA-Z0-9 _-]+)$/, message: 'Special Characters not allowed' }
                : item.novalidate
                  ? ''
                : item.number
                  ? { value: /^\d*\.?\d+$/, message: 'Only numbers are allowed' }
                : item.negativeNumber
                  ? { value: /^-?\d*\.?\d+$/, message: 'Only numbers are allowed' }
                : item.allowNegDecNumNoZero
                  ? { value: /^-?(?:0*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/, message: 'Only numbers are allowed. 0 is not allowed.' }
                : item.allowNegDecNum
                  ? { value: /^-?\d*\.?\d+$/, message: 'Only numbers are allowed.' }
                : item.numberAndDec
                  ? { value: /^\d*\.?\d+$/, message: 'Only numbers and decimals are allowed.' }
                : { value: /^[^\s]+(\s+[^\s]+)*$/, message: 'Space not allowed in start and end' },
            }}
            validate={setValidate(false)}
            validMessage={setValidate(true)}
            onChange={item.onChange && item.onChange}
          />
          {item.tips && <span className='c-gray'>{item.tips}</span>}
          {item.beautifyTips && <span className='c-gray' dangerouslySetInnerHTML={item.beautifyTips}></span>}
        </>
      )}

      {item.type == 'select' && (
        <>
          <SelectField
            isRequired={item.req}
            fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
            label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
            class={`mb-0 w-100 ${item.hidden ? 'd-none' : ''} ${item.class ? item.class : ''}`}
            initValue={
              elem
                ? elem[item.name]
                  ? item.customVal
                    ? elem[item.name]
                    : { label: elem[item.name], value: elem[item.name] }
                  : ''
                : ''
            }
            control={control}
            onChange={(e) => item.onChange && item.onChange(item.getFieldName ? (parent ? `${parent.name}[${index}]` : item.name) : e)}
            iProps={{
              placeholder: item.placeholder,
              isMulti: item.multiple ? item.multiple : false,
              isDisabled: item.staticIfNotNew ? (elem.isNew ? false : true) : (item.disabled ? item.disabled : props.static ? props.static : item.static ? item.static : false),
              isLowercase: item.lowercase
            }}
            selectOption={item.options}
            rules={{ required: { value: item.req, message: item.reqmessage } }}
            validate={setValidate(false)}
            validMessage={setValidate(true)}
            menuPlacement={item.menuPlacement}
            isClearable={item.isClearable}
          />
          {item.tips && <span className='c-gray'>{item.tips}</span>}
        </>
      )}
      {item.type == 'selectasync' && (
        <SelectFieldAsync
            isRequired={item.req}
            fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
            label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
            control={control}
            class={`mb-0 w-100 ${item.hidden ? 'd-none' : ''}`}
            iProps={{
              placeholder: item.placeholder,
              isMulti: item.multiple ? item.multiple : false,
              isDisabled: item.disabled ? item.disabled : props.static ? props.static : item.static ? item.static : false,
            }}
            initValue={[]}
            loadOptions={item.loadOptions}
            onChange={(e) => item.setSelected(e)}
            rules={{ required: { value: item.req, message: item.reqmessage } }}
            validate={setValidate(false)}
            validMessage={setValidate(true)}
        />
      )}
      {item.type == 'date' && (
        <DateField
          isRequired={item.req}
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
          control={control}
          class="mb-0"
          onChange={item.onChange && item.onChange}
          iProps={{
            picker: item?.dateType ? item?.dateType : 'date',
            size: 'large',
            format: item?.format ? item?.format : '',
            disabledDate: item?.disabledDate,
            disabled: item.staticIfNotNew ? (elem.isNew ? false : true) : props.static ? props.static : item.static ? true : false,
          }}
          initValue={
            elem
              ? elem[item.name]
                ? elem[item.init] == 'today'
                  ? dayjs()
                  : dayjs(elem[item.name], 'YYYY-MM-DD')
                : ''
              : item.init == 'today'
              ? dayjs()
              : ''
          }
          rules={{
            required: { value: item.req, message: item.reqmessage },
            // setValueAs: (value) =>
            //   value
            //     ? item.dateType == 'year'
            //       ? moment(value).format('YYYY')
            //       : moment(value).format('YYYY-MM-DD')
            //     : '',
          }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
          disabledDate={item?.disabledDate}
        />
      )}
      {item.type == 'checkbox' && (
        <CheckboxGroup
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
          class={`mb-0 fullWidth-checbox ${item.class ? item.class : ''}`}
          control={control}
          initValue={elem && elem[item.name] ? elem[item.name] : []}
          option={item.options}
          disabled={item.static}
          onChange={item.onChange && item.onChange}
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'upload' && (
        <>
          <UploadField
            isRequired={item.req}
            fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
            label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
            class={`mb-0`}
            iProps={{ disabled: props.static ? props.static : item.static ? item.static : false }}
            control={control}
            onChange={parent ? (e) => item.onChange(e, index) : item.onChange}
            initValue={
              elem && elem[item.name] && typeof elem[item.name] == 'string'
                ? {
                    fileList: [
                      {
                        uid: '-1',
                        name: getFileName(elem[item.name]),
                        status: 'done',
                        url: elem[item.name],
                        s3: item?.docdetail?.item,
                        aid: item?.docdetail?.id,
                        app: item?.docdetail?.app,
                        opentab: item?.docdetail?.opentab || false
                      },
                    ],
                  }
                : ''
            }
            rules={{ required: { value: item.req, message: item.reqmessage } }}
            validate={setValidate(false)}
            validMessage={setValidate(true)}
          />
        </>
      )}
      {item.type == 'textarea' && (
        <>
        <TextAreaField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          class={`mb-0 ${item.hidden ? 'd-none' : ''}`}
          iProps={{
            readOnly: props.static ? props.static : false,
            placeholder: item.placeholder,
            size: 'large',
            autoSize: { minRows: 4, maxRows: 6 }
          }}
          initValue={elem && elem[item.name] ? elem[item.name] : ''}
        />
        {item.tips && <small className='c-gray'>{item.tips}</small>}
        </>
      )}
      {item.type == 'switch' && (
        <SwitchField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          onChange={item.onChange && item.onChange}
          iProps={{ size: 'large', disabled: props.static ? props.static : item.static ? item.static : false }}
          initValue={elem && elem[item.name] ? elem[item.name] : ''}
          labelPosition={item.labelPosition}
        />
      )}
      {item.type == 'slider' && (
        <Row gutter={[20, 20]} align="middle">
          <Col flex="auto">
            <SliderField
              isRequired={item.req}
              fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
              label={item.label}
              control={control}
              iProps={item.iProps}
              class={`mb-0`}
              initValue={elem && elem[item.name] ? elem[item.name] : ''}
              rules={{ required: { value: item.req, message: item.reqmessage } }}
              validate={setValidate(false)}
              validMessage={setValidate(true)}
            />
          </Col>
          <Col flex="70px">
            <Form.Item initValue={0} className="mb-0">
              <InputNumber
                size="large"
                value={item.value}
                disabled={true}
                style={{ border: 0, width: '70px' }}
                formatter={(value) => (value ? `${value}%` : '')}
                // parser={value => value.replace('%', '')}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {item.type == 'time' && (
        <>
        <TimeField
          isRequired={item.req}
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          class="mb-0"
          onChange={item.onChange && item.onChange}
          iProps={{
            size: 'large',
            format: item?.format ? item?.format : '',
            disabled: ((getValues && parent && getValues(`${parent.name}[${index}].work_hour_type`).value === "Unavailable")
            || (item.staticIfNotNew ? (elem.isNew ? false : true) : props.static ? props.static : item.static ? true : false)),
          }}
          initValue={elem && elem[item.name] ? dayjs(elem[item.name], 'h:mm') : ''}
          rules={{
            required: { value: (!getValues && item.req) || (getValues && parent && getValues(`${parent.name}[${index}].work_hour_type`).value !== "Unavailable"), message: item.reqmessage },
          }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
        </>
      )}
      {item.type == 'avatar' && (
        <Space direction="vertical" size={8} className="w-100">
          {item.label && <Text className="smallFont12 c-gray">{item.label}</Text>}
          <Space size={10} align="center">
            <SelectField
              fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
              label=""
              class={`mb-0 w-100 d-none`}
              initValue={elem ? (elem[item.name] ? elem[item.name] : []) : ''}
              control={control}
              iProps={{ placeholder: item.placeholder, isMulti: true }}
              selectOption={item.options}
            />
            {/* without parent, we can use .values */}
            {/* with parent, there wont be values passing in - to study */}
            {item.hasValue && ((elem && elem[item.name] && elem[item.name].length > 0) || (item.values && item.values(index) && item.values(index).length > 0)) && (
              <Avatar.Group maxCount={5} size="large" maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {
                  ((item.values && item.values(index)) || (elem && elem[item.name])).map((x) =>
                    x?.image ? (
                      <Avatar src={`${baseUrl}${x?.image}`} />
                    ) : (
                      <Avatar style={{ backgroundColor: '#0077B6' }}>{x['label'].charAt(0)}</Avatar>
                    ))
                }
              </Avatar.Group>
            )}
            <Button htmlType="button" type="link" className="c-gray-linkbtn" onClick={() => item.addFunc(elem ? elem : item.name, index)}>
              {item.addLabel}
            </Button>
          </Space>
        </Space>
      )}
      {item.type == 'radio' && (
        <InputRadio
          isRequired={item.req}
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
          class={`mb-0 simple-radio'} ${item.class ? item.class : ''}`}
          control={control}
          initValue={elem && elem[item.name] ? elem[item.name] : []}
          options={item.options}
          disabled={item.static}
          onChange={item.onChange && item.onChange}
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'color' && (
        <ColorPickerInputField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
          class={`mb-0 ${item.class ? item.class : ''}`}
          control={control}
          initValue={elem && elem[item.name] ? elem[item.name] : []}
          disabled={item.static}
          onChange={item.onChange && item.onChange}
          showText={item.showText}
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'password' && (
        <InputPassword
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? (parent.noLabel ? (index == 0 ? item.label : '') : item.label) : item.label}
          class={`mb-0 ${item.class ? item.class : ''}`}
          control={control}
          initValue={elem && elem[item.name] ? elem[item.name] : []}
          disabled={item.static}
          onChange={item.onChange && item.onChange}
          showText={item.showText}
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
          iProps={{
            disabled: props.static ? props.static : item.static ? true : false,
            readOnly: item.readOnly,
            placeholder: item.placeholder,
            size: 'large',
            addonAfter: item?.addOnButton &&
              <Button htmlType="button" type="primary" className="green-btn" disabled={item.static} onClick={item?.onBtnClick}>
                {item?.addOnButton ? item.addOnButton : "Edit"}
              </Button>
          }}
        />
      )}
    </Col>
  );
};
