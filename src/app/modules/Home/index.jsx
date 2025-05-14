import React from 'react';
import { Row, Col } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';

export default (props) => {

  return (
    // add layout template here for header and footer
    // and each section to be placed in separate component
    <Row gutter={[10, 10]}>
      <Col span={24} className='text-center'>
      Hi
      </Col>
      <Col span={24} className="clickRow">
        <p>Hi</p>
      </Col>
    </Row>
  )
}