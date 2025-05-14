import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import { useTranslate } from '../../../translate';

const { Title, Text } = Typography;

export default (props) => {

  const i18n = useTranslate();
  const { t } = i18n;

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Title level={1} className="text-center mb-0">404</Title>
      </Col>
      <Col span={24}>
        <Title level={3} className="text-center mb-0">Page Not found</Title>
        </Col>
      <Col span={24} className="text-center">
        <Link to="/dashboard">Go to Dashboard</Link>
        </Col>
    </Row>
  );
};
