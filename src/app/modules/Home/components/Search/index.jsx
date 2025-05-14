import React from 'react';
import { Button, Form, Row, Col } from 'antd';
import { InputField, DateField } from 'Atoms/FormElement';
import { useForm } from 'react-hook-form';

export default (props) => {
  const { searchVal } = props;
  const { control, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (val) => {
    props.onSearch(val);
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
      <Row className='w-100' gutter={[10, 10]}>
        <Col flex="auto">
          <InputField
            fieldname='name'
            label=''
            class='mb-0 w-100'
            initValue={searchVal?.name ? searchVal?.name : ''}
            control={control}
            iProps={{ placeholder: 'Search by account..' }}
            rules={{
              required: 'Please enter account',
            }}
            validate={errors.name && 'error'}
            validMessage={errors.name && errors.name.message}
          />
        </Col>
        <Col flex="auto">
          <DateField
            showTime={true}
            fieldname='start_date'
            label=''
            initValue={''}
            control={control}
            class='mb-0 w-100'
            iProps={{ placeholder: `Start time`, size: 'large' }}
          />
        </Col>
        <Col flex="auto">
          <DateField
            showTime={true}
            fieldname='end_date'
            label=''
            initValue={''}
            control={control}
            class='mb-0 w-100'
            iProps={{ placeholder: `End time`, size: 'large' }}
          />
        </Col>
        <Col flex="70px">
          <Button className='w-100' size='large' type='primary' htmlType='submit'>Search</Button>
        </Col>
      </Row>
    </Form>
  )
}