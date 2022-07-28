import { LockOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageLoading from "../../components/commons/PageLoading";
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  multiLanguageSelector,
} from "../../slices/multiLanguage";
import CarouselLogin from "../../components/container/Auth/CarouselLogin";

function ResetPassword(props) {
  const { t, i18n } = useTranslation("common", "login");
  const { language } = useSelector(multiLanguageSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    <>
      {loading ? (
        <PageLoading />
      ) : (
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
                    <img src={require("../../assets/img/logo2.png")} />
                  </Col>
                  <Col span={24}>
                    <h3>{t("Reset_password", { ns: "login" })}</h3>
                  </Col>
                  <Col>
                    <p className="text_mute">
                      {t("Update_your_new_password", { ns: "login" })}
                    </p>
                  </Col>
                  <Col span={24}>
                    <Form
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                    >
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

                      {msg}

                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          {t("Confirm", { ns: "login" })}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col>
                    <span className="text_mute">
                      {t("Already_have_an_account", { ns: "login" })}{" "}
                    </span>
                    <Link to="/login">{t("Login", { ns: "login" })}</Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
