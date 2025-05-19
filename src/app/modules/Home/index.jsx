import React from "react";
import { Container, Row, Col, Navbar, Nav, Stack, Card, Form, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import LogoImg from '../../../assets/img/logo.png';

export default (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (val) => {
    console.log(val);
  }

  return (
    // add layout template here for header and footer
    // and each section to be placed in separate component
    // remove usage of antd, pure bootstrap - https://react-bootstrap.netlify.app/docs/components/navbar
    // can retain the implementation of the atoms/molecules
    // but instead of antd, we should replace component from antd to bootstrap
    <>
      {/* header */}
      <Navbar className="bg-body-udp">
        <Container>
            <Navbar.Brand href="#home">
              <img
                src={LogoImg}
                width="100%"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link className="navlink-width" href="#home">Cloud Products & Services</Nav.Link>
              <Nav.Link className="navlink-width" href="#features">About Us</Nav.Link>
              <Nav.Link className="navlink-width" href="#pricing">Contact Us</Nav.Link>
            </Nav>
        </Container>
      </Navbar>

      {/* body */}
      <Container className="my-3" style={{'minHeight': '55vh'}}>
        <Row>
          <Col>
            <h2 className="text-primary">
              Welcome to reach out through
              the following channels
            </h2>
          </Col>
          <Col>
          <Card
            bg={'light'}
            key={'Light'}
            text={'dark'}
            className="mb-2"
          >
            <Card.Body>
              <Card.Title>Got questions? We'd love to hear from you! </Card.Title>
              <Card.Text>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      {...register('email', { required: 'Email is required' })}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>

      {/* footer */}
      <Container>
        <Row>
          <Col xs={6}>
            <img src={LogoImg} width={'50%'}/>
            <div>
              <b>
                Visit us online at www.udpcloud.com.my
              </b>
            </div>
          </Col>
          <Col xs={3}>
            <h3 className="text-primary">
              Quick Links
            </h3>
            <p>
              Cloud Products & Services
            </p>
            <p>
              About Us
            </p>
            <p>
              Contact Us
            </p>
          </Col>
          <Col xs={3}>
            <h3 className="text-primary">
              Get in Touch
            </h3>
            <Stack direction="horizontal" gap={2}>
              <i>icon</i>
              <span>
                Tel: +603 5590 9999
              </span>
            </Stack>
            <Stack direction="horizontal" gap={2}>
              <i className="align-self-start">locs</i>
              <div>
                <p className="mb-0"><b>Level 10,Boutique Office 3</b></p>
                <p className="mb-0">
                  B03-D (PILLAR 7) KL Eco City
                </p>
                <p className="mb-0">
                  59200 Kuala Lumpur
                </p>
              </div>
            </Stack>
            <Stack direction="horizontal" gap={2}>
              <i className="align-self-start">emai</i>
              <a href="mailto:sales@udpcloud.com.my" className="text-dark" style={{"textDecoration": "none", "fontWeight": "bold"}}>sales@udpcloud.com.my</a>
            </Stack>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <hr className="bg-primary border-primary" style={{'height': '3px'}} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
