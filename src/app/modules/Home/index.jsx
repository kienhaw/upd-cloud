import React, { useEffect, useState } from "react";
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
  Spinner,
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
import LowerPricesImg from "../../../assets/img/icons/lower-price.png";
import SupportIcon from "../../../assets/img/icons/24-7.png";
import ArchIcon from "../../../assets/img/icons/architect.png";
import SecurityIcon from "../../../assets/img/icons/security.png";
import GoogleCloudIcon from "../../../assets/img/icons/google-cloud.png";
import AwsIcon from "../../../assets/img/icons/aws.png";
import AlibabaIcon from "../../../assets/img/icons/alibaba.png";
import CloudFareIcon from "../../../assets/img/icons/cloudfare.png";
import CdnIcon from "../../../assets/img/icons/cdn.png";
import TenantCloudIcon from "../../../assets/img/icons/tenant-cloud.png";
import HuaweiIcon from "../../../assets/img/icons/huawei.png";
import AzureIcon from "../../../assets/img/icons/azure.png";
import InfraIcon from "../../../assets/img/icons/infra.png";
import CloudSecurIcon from "../../../assets/img/icons/cloud-secu.png";
import GlobalSmsIcon from "../../../assets/img/icons/global-sms.png";
import TrustSecuIcon from "../../../assets/img/icons/trust-security.png";
import ServicesIcon from "../../../assets/img/icons/services.png";
import AiLearningIcon from "../../../assets/img/icons/ai-learning.png";
import EducationIcon from "../../../assets/img/icons/education.png";
import BankingIcon from "../../../assets/img/icons/banking.png";
import GamingIcon from "../../../assets/img/icons/gaming.png";
import BlockChainIcon from "../../../assets/img/icons/block-chain.png";
import BigDataIcon from "../../../assets/img/icons/big-data.png";
import NewsIcon from "../../../assets/img/icons/news.png";
import HealthCareIcon from "../../../assets/img/icons/healthcare.png";
import RetailIcon from "../../../assets/img/icons/retail.png";
import TransportationIcon from "../../../assets/img/icons/transportation.png";
import CloudDesignIcon from "../../../assets/img/icons/cloud-design.png";
import CloudBlueIcon from "../../../assets/img/icons/cloud-blue.png";
import {
  useTranslate,
  useTranslateDispatch,
  useTranslateState,
} from "../../../translate";

import { submitQuestion } from "./ducks/services";

export default (props) => {
  const i18n = useTranslate(); // we get the utils functions
  const { language } = useTranslateState(); // we get the utils functions
  const { t } = i18n;
  const dispatch = useTranslateDispatch();
  const [loading, setLoading] = useState(false);

  const isEn = language == "en";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (val) => {
    setLoading(true);

    const payload = {
      ...val,
    };

    submitQuestion(payload)
      .then(() => {
        reset();
        alert("Question submitted successfully!");
      })
      .catch((e) => {
        alert(e.message ?? "Something went wrong..");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const switchLanguage = (lang) => {
    if (lang == language) return;

    setLoading(true);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      dispatch({ type: "CHANGE_LANGUAGE", language: lang });
      localStorage.setItem("lang", lang);
      document.body.style.overflow = "auto";

      setLoading(false);
    }, 1000);
  };

  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentSectionId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Check if the section is in the viewport
      if (rect.top >= 0 && rect.top + 350 < window.innerHeight / 2) {
        currentSectionId = section.id; // Set the current section ID
      }
    });

    // Update the active section only if it has changed
    if (currentSectionId !== activeSection) {
      setActiveSection(currentSectionId);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed", // Use fixed to cover the viewport
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
            zIndex: 9999, // Ensure it is on top of other elements
          }}
        >
          <Spinner animation={"border"} variant="primary" />
        </div>
      )}
      {/* header */}
      <Navbar expand="lg" className="bg-body-udp" sticky="top">
        <Container>
          <Navbar.Brand href="#main">
            <img
              src={LogoImg}
              width="75px"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                className={`navlink-width ${isEn && "en"}`}
                href="#global"
                active={activeSection === "global"}
              >
                {t("Navbar.cloud")}
              </Nav.Link>
              <Nav.Link
                className="navlink-width"
                href="#aboutus"
                active={activeSection === "aboutus"}
              >
                {t("Navbar.about")}
              </Nav.Link>
              <Nav.Link
                className="navlink-width"
                href="#contactus"
                active={activeSection === "contactus"}
              >
                {t("Navbar.contact")}
              </Nav.Link>
              <Nav.Link className="navlink-width lang">
                <Stack direction="horizontal" gap={1}>
                  <Button
                    className={`text-white text-decoration-none px-0 ${!isEn && "active"}`}
                    variant="link"
                    onClick={() => {
                      switchLanguage("cn");
                    }}
                  >
                    CN
                  </Button>
                  <span>|</span>
                  <Button
                    className={`text-white text-decoration-none px-0 ${isEn && "active"}`}
                    variant="link"
                    onClick={() => {
                      switchLanguage("en");
                      dispatch({ type: "CHANGE_LANGUAGE", language: "en" });
                      localStorage.setItem("lang", "en");
                    }}
                  >
                    EN
                  </Button>
                </Stack>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main section */}
      {/* style={{ borderBottom: "1px solid #f3f3f3" }} */}
      <section id="main">
        <Container
          style={{ display: "flex", alignItems: "center", minHeight: "60vh" }}
        >
          <Row className="gx-sm-5">
            <Col xs={12} sm={7} className="mt-5">
              <div>
                <h2 className="text-primary fw-bold mb-4 fs-1">
                  {t("Main.title")}
                </h2>
                <p className="">{t("Main.subtitle")}</p>
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
                  <b>{t("Main.buttonText")}</b>
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
      <section id="global">
        <Container
          style={{ display: "flex", alignItems: "center", minHeight: "65vh" }}
        >
          <Row className="w-100 gx-3">
            <Col xs={12} sm={6} className="mt-5">
              <h2 className="text-primary fw-bold fs-1">{t("Global.title")}</h2>
              {language == "en" && (
                <h4 className="fw-bold mb-3">{t("Global.subtitle")}</h4>
              )}
              <p style={{ width: "85%" }}>{t("Global.desc")}</p>
            </Col>
            <Col xs={12} sm={6} className="mt-5 mt-sm-0">
              <img src={GlobalImg} alt="" className="global-image" />
              <div className="text-center cloud-service">
                <h3 className="text-primary fw-bold mb-2">
                  {t("Global.cloudService")}
                </h3>
                <Stack
                  direction="horizontal"
                  gap={4}
                  className="justify-content-center w-100"
                >
                  <div
                    className={`circle-box ${language == "cn" ? "vertical-middle" : ""}`}
                  >
                    <div>
                      <p className="mb-0">8</p>
                      <p className="mb-0" style={{ lineHeight: "100%" }}>
                        {t("Global.cloudPartners")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`circle-box ${language == "cn" ? "vertical-middle" : ""}`}
                  >
                    <div>
                      <p className="mb-0">30+</p>
                      <p className="mb-0" style={{ lineHeight: "100%" }}>
                        {t("Global.customerWorldWide")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`circle-box ${language == "cn" ? "vertical-middle" : ""}`}
                  >
                    <div>
                      <p className="mb-0">120+</p>
                      <p className="mb-0" style={{ lineHeight: "100%" }}>
                        {t("Global.cloudCert")}
                      </p>
                    </div>
                  </div>
                </Stack>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Solution section */}
      <section id="solution">
        <Container
          className="position-relative"
          style={{ marginTop: "4em", marginBottom: "4em" }}
        >
          <img
            src={CloudBlueIcon}
            alt=""
            style={{ position: "absolute", right: "75px", top: "60px" }}
            width="55px"
          />
          <img
            src={CloudBlueIcon}
            alt=""
            style={{ position: "absolute", left: "50px", top: "10px" }}
            width="40px"
          />
          <Row className="mb-5 justify-content-center">
            <Col sm={9}>
              <div
                className="text-center"
                style={{
                  borderRadius: "15px",
                  background: "#2abed1",
                  padding: "15px",
                  color: "white",
                  position: "relative",
                }}
              >
                <h3>{t("Solution.title")}</h3>
                <p className="mb-0">{t("Solution.subtitle")}</p>
                <img
                  src={CloudDesignIcon}
                  alt=""
                  style={{ position: "absolute", left: "25px", bottom: "15px" }}
                  width="55px"
                />
                <img
                  src={CloudDesignIcon}
                  alt=""
                  style={{ position: "absolute", right: "25px", top: "15px" }}
                  width="55px"
                />
              </div>
            </Col>
          </Row>
          <Row className="gx-2 mb-3 mb-md-5">
            <Col sm={4}>
              <Card className="solution-card">
                <Card.Title className="text-center p-2 fs-3 fw-bold bg-primary-light mb-0">
                  {t("Solution.infra")}
                </Card.Title>
                <Card.Body className="p-1">
                  <div className="w-100">
                    <p className="text-center">
                      <b>{t("Solution.team")}</b>
                    </p>
                    <Stack
                      direction="horizontal"
                      gap={1}
                      className="infrastructure"
                    >
                      <div className="w-25 align-self-start">
                        <img src={LowerPricesImg} alt="" width={"50px"} />
                        {isEn && (
                          <p className="mt-1">
                            <b className="text-primary">Get Lower Prices</b>
                            <br />
                            by Switching Services with the Same Cloud Provider
                          </p>
                        )}
                        {!isEn && (
                          <>
                            <p className="mt-1">同一云服务厂家</p>
                            <p className="my-1">切换</p>
                            <p className="my-1">
                              <b className="text-primary">享更低折扣!</b>
                            </p>
                          </>
                        )}
                      </div>
                      <div className="w-25 align-self-start">
                        <img src={SupportIcon} alt="" width={"50px"} />
                        {isEn && (
                          <p className="mt-1">
                            <b className="text-primary">24/7</b>
                            <br />
                            Support and Operation
                          </p>
                        )}
                        {!isEn && (
                          <>
                            <p className="mt-1">支持</p>
                            <p className="my-1">
                              <b
                                className="text-primary"
                                style={{ fontSize: "12px" }}
                              >
                                24小时/7天
                              </b>
                            </p>
                            <p className="my-0">运维</p>
                          </>
                        )}
                      </div>
                      <div className="w-25 align-self-start">
                        <img src={ArchIcon} alt="" width={"50px"} />
                        <div className="mt-1">
                          {isEn && (
                            <p className="my-0">Cloud Solutions Architects</p>
                          )}
                          {!isEn && (
                            <>
                              <p className="my-1">云解决方案</p>
                              <p className="my-1">架构师</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="w-25 align-self-start">
                        <img src={SecurityIcon} alt="" width={"50px"} />
                        <div className="mt-1">
                          {isEn ? (
                            <p>Security Operations</p>
                          ) : (
                            <p className="my-1">安全运维</p>
                          )}
                          <p className="my-0">(SecOps)</p>
                        </div>
                      </div>
                    </Stack>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
              <Card className="solution-card">
                <Card.Title className="text-center p-2 fs-3 fw-bold bg-primary-light mb-0">
                  {t("Solution.trusted")}
                </Card.Title>
                <Card.Body
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="w-100">
                    <Stack
                      direction="horizontal"
                      gap={3}
                      className="trusted-partners"
                    >
                      <div className="w-25">
                        <img src={GoogleCloudIcon} alt="" width={"100%"} />
                      </div>
                      <div className="w-25 text-center">
                        <img src={AwsIcon} alt="" width={"75%"} />
                      </div>
                      <div className="w-25">
                        <img src={AlibabaIcon} alt="" width={"100%"} />
                      </div>
                      <div className="w-25">
                        <img src={CloudFareIcon} alt="" width={"100%"} />
                      </div>
                    </Stack>
                    <Stack direction="horizontal" gap={3} className="mb-3">
                      <div className="w-25">
                        <img src={CdnIcon} alt="" width={"100%"} />
                      </div>
                      <div className="w-25 text-center">
                        <img src={TenantCloudIcon} alt="" width={"75%"} />
                      </div>
                      <div className="w-25">
                        <img src={HuaweiIcon} alt="" width={"100%"} />
                      </div>
                      <div className="w-25">
                        <img src={AzureIcon} alt="" width={"100%"} />
                      </div>
                    </Stack>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
              <Card className="solution-card">
                <Card.Title className="text-center p-2 fs-3 fw-bold bg-primary-light mb-0">
                  {t("Solution.proff")}
                </Card.Title>
                <Card.Body className="professional">
                  <div className="w-100">
                    <Row className="mb-3">
                      <Col xs={4} className="text-center">
                        <img src={InfraIcon} alt="" width={"40px"} />
                        <p className="mt-1 mb-0">
                          {t("Solution.prof.cloudInfra")}
                        </p>
                      </Col>
                      <Col xs={4} className="text-center">
                        <img src={CloudSecurIcon} alt="" width={"40px"} />
                        <p className="mt-1 mb-0">
                          {t("Solution.prof.cloudSecu")}
                        </p>
                      </Col>
                      <Col xs={4} className="text-center">
                        <img src={GlobalSmsIcon} alt="" width={"40px"} />
                        <p className="mt-1 mb-0">
                          {t("Solution.prof.globalSms")}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4} className="text-center">
                        <img src={TrustSecuIcon} alt="" width={"40px"} />
                        <p className="mt-1 mb-0">
                          {t("Solution.prof.zeroSecu")}
                        </p>
                      </Col>
                      <Col xs={4} className="text-center">
                        <img src={ServicesIcon} alt="" width={"40px"} />
                        <p className="mt-1 mb-0">
                          {t("Solution.prof.managedServices")}
                        </p>
                      </Col>
                      <Col xs={4} className="text-center">
                        <img src={AiLearningIcon} alt="" width={"40px"} />
                        <p className="mt-1 mb-0">
                          {t("Solution.prof.aiMachine")}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-4 justify-content-center">
            <Col sm={6}>
              <div
                className="text-center"
                style={{
                  padding: "15px",
                  border: "1px solid #2abed1",
                  borderRadius: "30px",
                }}
              >
                <h3 className="mb-0">{t("Solution.tailored")}</h3>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col sm={12}>
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center tailored-icons"
              >
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={EducationIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.education")}
                  </p>
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={BankingIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.banking")}
                  </p>
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={GamingIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.gaming")}
                  </p>
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={BlockChainIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.blockChain")}
                  </p>
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={BigDataIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.aibigdata")}
                  </p>
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={NewsIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.news")}
                  </p>
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={HealthCareIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.healthcare")}
                  </p>
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={RetailIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.retail")}
                  </p>
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <img src={TransportationIcon} alt="" width={"50px"} />
                  <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "11px" }}>
                    {t("Solution.transportation")}
                  </p>
                </div>
              </Stack>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About section */}
      <section id="aboutus">
        <Container
          style={{ display: "flex", alignItems: "center", minHeight: "70vh" }}
        >
          <Row>
            <Col sm={12}>
              <h2 className="text-primary fw-bold mb-4 fs-1">
                UDP CLOUD — {t("About.title")}
              </h2>
            </Col>
            <Col sm={7}>
              <p>
                <b className="text-primary">UDP CLOUD</b> {t("About.phrase1")}
              </p>
              <p>{t("About.phrase2")}</p>
              <p>
                {isEn ? "By choosing" : "选择"}{" "}
                <b className="text-primary">UDP CLOUD</b>,{" "}
                {isEn ? "you’llgain" : "您将获得"}:
              </p>
              <p>• {t("About.list1")}</p>
              <p>• {t("About.list2")}</p>
              <p>• {t("About.list3")}</p>

              <h4 className="text-primary" style={{ fontWeight: "700" }}>
                {t("About.footer")}
              </h4>
            </Col>
            <Col sm={5} className="align-self-end">
              <img src={GraphImg} alt="" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact section */}
      <section id="contactus">
        <Container
          style={{ display: "flex", alignItems: "center", minHeight: "70vh" }}
        >
          <Row className="w-100 gx-5">
            <Col xs={12} sm={7} className="mt-5">
              <div style={{ width: "85%" }}>
                <h2 className="text-primary fw-bold mb-4 fs-1">
                  {t("Contact.title")}
                </h2>
                <p className={!isEn ? "fw-bold" : ""}>
                  {t("Contact.subtitle")}
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
        <Container
          fluid={"md"}
          className="my-3"
          style={{ minminHeight: "60vh" }}
        >
          <Row className="gx-5">
            <Col xs={12} sm={5} className="my-4">
              <h2 className="text-primary fw-bold mb-4 fs-1">
                {t("Inquiry.title")}
              </h2>
              <Stack direction="vertical" gap={3}>
                <Stack direction="horizontal" gap={5}>
                  <img
                    src={ProductInfoImg}
                    width={"75px"}
                    alt="Product Information"
                  />
                  <div>
                    <h4 className="fw-bold mb-1">
                      {t("Inquiry.product.title")}
                    </h4>
                    <p className="mb-1">{t("Inquiry.product.desc")}</p>
                    <p className="text-primary mb-0">
                      {t("Inquiry.product.linkText")}
                    </p>
                  </div>
                </Stack>
                <Stack direction="horizontal" gap={5}>
                  <img
                    src={CareerOppImg}
                    width={"75px"}
                    alt="career opportunities"
                  />
                  <div>
                    <h4 className="fw-bold mb-1">
                      {t("Inquiry.career.title")}
                    </h4>
                    <p className="mb-1">{t("Inquiry.career.desc")}</p>
                    <p className="text-primary mb-0">
                      {t("Inquiry.career.linkText")}
                    </p>
                  </div>
                </Stack>
                <Stack direction="horizontal" gap={5}>
                  <img
                    src={BusinessInqImg}
                    width={"75px"}
                    alt="Business Inquiries"
                  />
                  <div>
                    <h4 className="fw-bold mb-1">
                      {t("Inquiry.business.title")}
                    </h4>
                    <p className="mb-1">{t("Inquiry.business.desc")}</p>
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
                    {t("Inquiry.form.title")}{" "}
                  </Card.Title>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder={t("Inquiry.form.firstName")}
                        {...register("firstName", {
                          required: t("Common.Required.message"),
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
                        placeholder={t("Inquiry.form.lastName")}
                        {...register("lastName", {
                          required: t("Common.Required.message"),
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
                        placeholder={t("Inquiry.form.email")}
                        {...register("email", {
                          required: t("Common.Required.message"),
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
                        placeholder={t("Inquiry.form.phone")}
                        {...register("contact", {
                          required: t("Common.Required.message"),
                        })}
                        isInvalid={!!errors.contact}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput4"
                    >
                      <Form.Select
                        {...register("issueType", {
                          required: t("Common.Required.message"),
                        })}
                        isInvalid={!!errors.issueType}
                      >
                        <option value="">{t("Inquiry.form.type")}</option>
                        <option value="technical">Technical</option>
                        <option value="billing">Billing</option>
                        <option value="general">General</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.issueType?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        {...register("issueContent", {
                          required: t("Common.Required.message"),
                        })}
                        as="textarea"
                        rows={5}
                        placeholder={t("Inquiry.form.desc")}
                        isInvalid={!!errors.issueContent}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.issueContent?.message}
                      </Form.Control.Feedback>
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
                      {t("Inquiry.form.buttonText")}
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
            <Col xs={12} sm={6} className="mt-2">
              <img src={FooterLogoImg} width={"30%"} />
              <div className="mt-3">
                {t("Footer.knowMore")} <b>www.udpcloud.com.my</b>
              </div>
            </Col>
            <Col xs={12} sm={3} className="mt-3 mt-sm-0">
              <h4 className="text-primary mb-4 fw-bold">
                {t("Footer.quicklinks")}
              </h4>
              <p>
                <a href="#global" className={`text-dark text-decoration-none`}>
                  {t("Navbar.cloud")}
                </a>
              </p>
              <p>
                <a href="#aboutus" className="text-dark text-decoration-none">
                  {t("Navbar.about")}
                </a>
              </p>
              <p>
                <a href="#contactus" className="text-dark text-decoration-none">
                  {t("Navbar.contact")}
                </a>
              </p>
            </Col>
            <Col xs={12} sm={3} className="mt-3 mt-sm-0">
              <h4 className="text-primary mb-4 fw-bold">
                {t("Footer.getInTouch")}
              </h4>
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
