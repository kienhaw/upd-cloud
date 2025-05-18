import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useTranslate } from "../../../translate";

export default (props) => {
  const i18n = useTranslate();
  const { t } = i18n;

  return (
    <Row gutter={[20, 20]}>
      <Col xs={24}>
        <h2 className="text-center mb-0">404</h2>
      </Col>
      <Col xs={24}>
        <h3 className="text-center mb-0">Page Not found</h3>
      </Col>
      <Col xs={24} className="text-center">
        <Link to="/dashboard">Go to Dashboard</Link>
      </Col>
    </Row>
  );
};
