import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
} from "../../slices/multiLanguage";
import CarouselLogin from "../../components/container/Auth/CarouselLogin";

function LoginForm(props) {
  const { t, i18n } = useTranslation("common", "login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const onFinish = async (values) => {};

  const handleChange = (value) => {
    if (value === "EN") {
      dispatch(changeLocales(LANGUAGE_EN));
      i18n.changeLanguage(LANGUAGE_EN);
    } else {
      dispatch(changeLocales(LANGUAGE_VI));
      i18n.changeLanguage(LANGUAGE_VI);
    }
  };

  document.title = t("Login", { ns: "login" });

  return (
    <div className="login white_bg">
      <Row>
        <Col span={12}>
          <CarouselLogin />
        </Col>
        <Col span={12}>
          <div className="login_form">
            <Row justify="center">
              <Col span={24} className="Select">
                <Select
                  defaultValue={t("header.real_language")}
                  onChange={handleChange}
                >
                  <Select.Option value="EN">
                    <img
                      style={{ width: "30px" }}
                      src={require("../../assets/img/US.png")}
                      alt="EN"
                    />{" "}
                    EN
                  </Select.Option>
                  <Select.Option value="VI">
                    <img
                      style={{ width: "30px" }}
                      src={require("../../assets/img/VI.png")}
                      alt="VI"
                    />{" "}
                    VI
                  </Select.Option>
                </Select>
              </Col>
              <Col>
                <img src={require("../../assets/img/logo2.png")} alt="Logo" />
              </Col>
              <Col span={24}>
                <h3>{t("Login", { ns: "login" })}</h3>
              </Col>
              <Col span={24}>
                <Form initialValues={{ remember: true }} onFinish={onFinish}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: t("The_Email_field_is_required", {
                          ns: "login",
                        }),
                      },
                    ]}
                  >
                    <Input
                      type="email"
                      prefix={<MailOutlined />}
                      placeholder="Email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: t("The_Password_field_is_required", {
                          ns: "login",
                        }),
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder={t("Password", { ns: "login" })}
                      minLength={6}
                      maxLength={20}
                    />
                  </Form.Item>

                  <Link to="/forget-password/">
                    {t("Forget_password", { ns: "login" })}?
                  </Link>

                  <p className="text_red">
                    {msg &&
                      t("Email_or_Password_is_incorrect", { ns: "login" })}
                  </p>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      {t("Login", { ns: "login" })}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <span className="text_mute">
                  {t("Do_not_have_an_account", { ns: "login" })}{" "}
                </span>
                <Link to="/register">{t("Register", { ns: "login" })}</Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginForm;
