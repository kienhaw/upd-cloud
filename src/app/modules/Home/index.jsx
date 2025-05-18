import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

export default (props) => {
  return (
    // add layout template here for header and footer
    // and each section to be placed in separate component
    // remove usage of antd, pure bootstrap - https://react-bootstrap.netlify.app/docs/components/navbar
    // can retain the implementation of the atoms/molecules
    // but instead of antd, we should replace component from antd to bootstrap
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="my-3">
        <Row>
          <Col>1 of 3</Col>
          <Col xs={6}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </>
  );
};
