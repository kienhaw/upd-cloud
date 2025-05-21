import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Stack,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import LogoImg from "../../../assets/img/logo.png";
import FooterLogoImg from "../../../assets/img/footer-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import BusinessInqImg from "../../../assets/img/business-inquiries.png";
import CareerOppImg from "../../../assets/img/career-opportunities.png";
import ProductInfoImg from "../../../assets/img/product-info.png";
import ContactUsImg from "../../../assets/img/contactus.png";
import GraphImg from "../../../assets/img/graph.png";
import MainImg from "../../../assets/img/main.png";
import GlobalImg from "../../../assets/img/global.png";

export default (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (val) => {
    console.log(val);
  };

  return (
    // add layout template here for header and footer
    // and each section to be placed in separate component
    // remove usage of antd, pure bootstrap - https://react-bootstrap.netlify.app/docs/components/navbar
    // can retain the implementation of the atoms/molecules
    // but instead of antd, we should replace component from antd to bootstrap
    <>
      {/* header */}
      <Navbar className="bg-body-udp" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={LogoImg}
              width="75px"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link className="navlink-width" href="#home">
              Cloud Products & Services
            </Nav.Link>
            <Nav.Link className="navlink-width" href="#features">
              About Us
            </Nav.Link>
            <Nav.Link className="navlink-width" href="#pricing">
              Contact Us
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* body */}
      {/* Main section */}
      <section id="main" style={{ borderBottom: "1px solid #f3f3f3" }}>
        <Container
          style={{ display: "flex", alignItems: "center", height: "60vh" }}
        >
          <Row className="w-100 gx-5">
            <Col xs={12} sm={7} className="mt-5">
              <div>
                <h2 className="text-primary fw-bold mb-4 fs-1">
                  Powerful Multi-Cloud
                  <br /> Management Platform
                </h2>
                <p className="">
                  Integrate multi-cloud products through a single platform to
                  monitor traffic, analyze usage, and manage billing for you.
                  Enabling businesses to effortlessly oversee cloud usage and
                  costs, enhancing the efficiency and convenience of expense
                  management.
                </p>
                <Button
                  className="text-white"
                  variant="primary"
                  type="submit"
                  size="lg"
                  style={{
                    width: "130px",
                    borderRadius: "30px",
                    fontSize: "16px",
                    lineHeight: "normal",
                  }}
                >
                  <b>Learn more</b>
                </Button>
              </div>
            </Col>
            <Col xs={12} sm={5} className="align-self-center">
              <img src={MainImg} alt="" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Global section */}
      <section id="global" style={{ borderBottom: "1px solid #f3f3f3" }}>
        <Container
          style={{ display: "flex", alignItems: "center", height: "65vh" }}
        >
          <Row className="w-100 gx-3">
            <Col xs={12} sm={6} className="mt-5">
              <h2 className="text-primary fw-bold fs-1">
                Go Beyond Multicloud
              </h2>
              <h4 className="fw-bold mb-3">
                More than just One-Stop Cloud Offerings,
                <br />
                We provide Comprehensive Observability.
              </h4>
              <p style={{ width: "85%" }}>
                We are multicloud expert that pushes the boundaries of what’s
                possible. We offer a comprehensive suite of cloud computing
                services designed to empower innovation and drive business
                growth. Our advanced observability platform ensures that you
                have full visibility and control over your multicloud usage, no
                matter where you are on your cloud journey.
              </p>
            </Col>
            <Col xs={12} sm={6}>
              <img
                src={GlobalImg}
                alt=""
                style={{
                  width: "125%",
                  marginLeft: "-23%",
                  marginTop: "-40px",
                }}
              />
              <div
                className="text-center"
                style={{ marginTop: "-100px", marginLeft: "50px" }}
              >
                <h3 className="text-primary fw-bold mb-2">CLOUD SERVICE</h3>
                <Stack
                  direction="horizontal"
                  gap={4}
                  className="justify-content-center w-100"
                >
                  <div className="circle-box">
                    <p className="mb-0">8</p>
                    <p className="mb-0" style={{ lineHeight: "100%" }}>
                      Cloud partners
                    </p>
                  </div>
                  <div className="circle-box">
                    <p className="mb-0">30+</p>
                    <p className="mb-0" style={{ lineHeight: "100%" }}>
                      Customers Worldwide
                    </p>
                  </div>
                  <div className="circle-box">
                    <p className="mb-0">120+</p>
                    <p className="mb-0" style={{ lineHeight: "100%" }}>
                      Cloud Certifications
                    </p>
                  </div>
                </Stack>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About section */}
      <section id="aboutus">
        <Container
          style={{ display: "flex", alignItems: "center", height: "65vh" }}
        >
          <Row>
            <Col sm={12}>
              <h2 className="text-primary fw-bold mb-4 fs-1">
                UDP CLOUD — Your Cloud Innovation Engine
              </h2>
            </Col>
            <Col sm={7}>
              <p>
                <b className="text-primary">UDP CLOUD</b> brings together
                technology experts from Malaysia and China. With solid
                professional expertise and diverse industry experience, we
                specialize in providing enterprises with cloud-native
                development, big data analytics, and cloud architecture
                optimization services.
              </p>
              <p>
                Our team not only understands various corporate IT needs but
                also excels in rapidly implementing technology to drive business
                growth. We have helped numerous clients achieve digital
                transformation, enhance operational efficiency, and earn
                widespread trust and recognition.
              </p>
              <p>
                By choosing <b className="text-primary">UDP CLOUD</b>, you’ll
                gain:
              </p>
              <p>• Expert technical support & consulting</p>
              <p>• Tailored cloud solutions</p>
              <p>• Continuous optimization & reliable operation assurance</p>

              <h4 className="text-primary" style={{ fontWeight: "700" }}>
                We look forward to becoming your trusted long-term partner,
                working together to embrace the digital future.
              </h4>
            </Col>
            <Col sm={5} className="align-self-end">
              <img src={GraphImg} alt="" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact section */}
      {/* height should be depends on screensize */}
      <section id="contactus">
        <Container
          style={{ display: "flex", alignItems: "center", height: "65vh" }}
        >
          <Row className="w-100 gx-5">
            <Col xs={12} sm={7} className="mt-5">
              <div style={{ width: "85%" }}>
                <h2 className="text-primary fw-bold mb-4 fs-1">Contact Us</h2>
                <p className="">
                  Fill out the form below to consult with us and begin your
                  exclusive cloud journey! If you have any questions, feel free
                  to check our FAQ or contact us directly—our specialists will
                  be happy to assist you.
                </p>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <img src={ContactUsImg} alt="" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Inquiry section */}
      <section id="inquiry" className="py-5">
        <Container fluid={"md"} className="my-3" style={{ minHeight: "60vh" }}>
          <Row className="gx-5">
            <Col xs={12} sm={5} className="mt-4">
              <h3 className="text-primary mb-4 fw-bold">
                Welcome to reach out through the following channels
              </h3>
              <Stack direction="vertical" gap={3}>
                <Stack direction="horizontal" gap={5}>
                  <img
                    src={ProductInfoImg}
                    width={"75px"}
                    alt="Product Information"
                  />
                  <div>
                    <h4 className="fw-bold mb-1">Product Information</h4>
                    <p className="mb-1">
                      Click now to explore the products and services offered by
                      UDP Cloud
                    </p>
                    <p className="text-primary mb-0">Learn More</p>
                  </div>
                </Stack>
                <Stack direction="horizontal" gap={5}>
                  <img
                    src={CareerOppImg}
                    width={"75px"}
                    alt="career opportunities"
                  />
                  <div>
                    <h4 className="fw-bold mb-1">Career Opportunities</h4>
                    <p className="mb-1">
                      Join the UDP CLOUD family! Click to discover available
                      positions.
                    </p>
                    <p className="text-primary mb-0">Join Us</p>
                  </div>
                </Stack>
                <Stack direction="horizontal" gap={5}>
                  <img
                    src={BusinessInqImg}
                    width={"75px"}
                    alt="Business Inquiries"
                  />
                  <div>
                    <h4 className="fw-bold mb-1">Business Inquiries</h4>
                    <p className="mb-1">
                      Contact our sales team to learn more about UDP CLOUD.
                    </p>
                    <a
                      href="mailto:sales@udpcloud.com.my"
                      className="text-primary text-decoration-none"
                    >
                      sales@udpcloud.com.my
                    </a>
                  </div>
                </Stack>
              </Stack>
            </Col>
            <Col xs={12} sm={7}>
              <Card
                bg={"light"}
                key={"Light"}
                text={"dark"}
                className="mb-2"
                style={{
                  borderRadius: "30px",
                  border: "none",
                  boxShadow: "rgb(42, 190, 209) 3px 6px 0px 2px",
                }}
              >
                <Card.Body
                  className="bg-white"
                  style={{ borderRadius: "30px", padding: "35px 45px" }}
                >
                  <Card.Title className="mb-3 fw-bold">
                    Got questions? We'd love to hear from you!{" "}
                  </Card.Title>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput5"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Last name"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Phone Number / Telegram"
                        {...register("phone", { required: "This is required" })}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput4"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Inquiry Type"
                        {...register("inquiry", {
                          required: "This is required",
                        })}
                        isInvalid={!!errors.inquiry}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.inquiry?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Please describe your question in detail.
We will respond to you as soon as possible."
                      />
                    </Form.Group>

                    <Button
                      className="text-white"
                      variant="primary"
                      type="submit"
                      size="sm"
                      style={{
                        width: "100px",
                        borderRadius: "30px",
                        fontSize: "16px",
                      }}
                    >
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* footer */}
      <footer>
        <Container className="my-5">
          <Row>
            <Col xs={6} className="mt-2">
              <img src={FooterLogoImg} width={"30%"} />
              <div className="mt-3">
                Visit us online at <b>www.udpcloud.com.my</b>
              </div>
            </Col>
            <Col xs={3}>
              <h4 className="text-primary mb-4 fw-bold">Quick Links</h4>
              <p>Cloud Products & Services</p>
              <p>About Us</p>
              <p>Contact Us</p>
            </Col>
            <Col xs={3}>
              <h4 className="text-primary mb-4 fw-bold">Get in Touch</h4>
              <Stack direction="horizontal" gap={2}>
                <div style={{ width: "15px" }}>
                  <FontAwesomeIcon icon={faWhatsapp} className="text-primary" />
                </div>
                <span>
                  Tel: <b>+603 5590 9999</b>
                </span>
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <div className="align-self-start" style={{ width: "15px" }}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-primary"
                  />
                </div>
                <div className="">
                  <p className="mb-0">
                    <b>Level 10,Boutique Office 3</b>
                  </p>
                  <p className="mb-0">B03-D (PILLAR 7) KL Eco City</p>
                  <p className="mb-0">59200 Kuala Lumpur</p>
                </div>
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <div style={{ width: "15px" }}>
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                </div>
                <a
                  href="mailto:sales@udpcloud.com.my"
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                >
                  sales@udpcloud.com.my
                </a>
              </Stack>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <hr
                className="bg-primary border-primary"
                style={{ height: "3px" }}
              />
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
