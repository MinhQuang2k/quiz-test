import {
  CodeOutlined,
  FormOutlined,
  HddOutlined,
  RollbackOutlined,
  SwapOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Col, Input, Row, Switch, Tabs } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Matching from "../../components/container/Bank/Answer/Matching";
import MultipleChoice from "../../components/container/Bank/Answer/MultipleChoice";
import TrueFalse from "../../components/container/Bank/Answer/TrueFalse";
import Question from "../../components/container/Bank/Question/Question";
import QuestionFillingSpaces from "../../components/container/Bank/Question/QuestionFillingSpaces";
import Setting from "../../components/container/Bank/Setting/Setting";

function CreateQuestion() {
  const { t } = useTranslation("bank");
  const [tabKey, setTabKey] = useState(1);

  const onChange = (key) => {
    console.log(key);
    setTabKey(key);
  };

  const location = useLocation();
  console.log(location.state.update);

  const onChangeSwich = (checked) => {
    // console.log(`switch to ${checked}`);
  };

  return (
    <div className="create_question">
      <br />
      <br />
      <Row gutter={[24, 24]}>
        <Col span={24} className="sticky">
          <Row justify="center">
            <Col xs={24} md={20} lg={20} xl={18} xxl={14}>
              <Row gutter={[8, 8]} align="middle">
                <Col flex={1}>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to="/bank">
                        {t("Question_bank", { ns: "bank" })}
                      </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      {location.state.update
                        ? t("Update", { ns: "bank" })
                        : t("Create", { ns: "bank" })}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col>
                  <Button type="primary">
                    {location.state.update
                      ? t("Update", { ns: "bank" })
                      : t("Create", { ns: "bank" })}
                  </Button>
                </Col>
                <Col>
                  <Button>
                    <Link to="/bank">{t("Back_to_Bank", { ns: "bank" })}</Link>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Setting tabKey={tabKey} />
            </Col>
            <Col span={16}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <div className="white_bg pd_20 question_type">
                    <h6>{t("Question_Type", { ns: "bank" })}</h6>
                  </div>
                </Col>
                <Col span={24} className="choose_question">
                  <Tabs defaultActiveKey="1" onChange={onChange}>
                    <Tabs.TabPane
                      tab={
                        <>
                          <UnorderedListOutlined />
                          {t("Multiple_Choice", { ns: "bank" })}
                        </>
                      }
                      key="1"
                    >
                      <Row gutter={[16, 16]} className="multiple_choice">
                        <Question
                          title={t("Enter_the_question", { ns: "bank" })}
                        />

                        <MultipleChoice />

                        <Question
                          title={t("Explain_answers", { ns: "bank" })}
                          subTitle={t("Multiple_Choice", { ns: "bank" })}
                        />
                      </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={
                        <>
                          <SwapOutlined />
                          {t("True_False", { ns: "bank" })}
                        </>
                      }
                      key="2"
                    >
                      <Row gutter={[16, 16]}>
                        <Question
                          title={t("Enter_the_question", { ns: "bank" })}
                        />

                        <TrueFalse />

                        <Question
                          title={t("Explain_answers", { ns: "bank" })}
                          subTitle={t("Multiple_Choice", { ns: "bank" })}
                        />
                      </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={
                        <>
                          <RollbackOutlined />
                          {t("Matching", { ns: "bank" })}
                        </>
                      }
                      key="3"
                    >
                      <Row gutter={[16, 16]} className="Matching">
                        <Question
                          title={t("Enter_the_question", { ns: "bank" })}
                        />

                        <Matching />

                        <Question
                          title={t("Explain_answers", { ns: "bank" })}
                          subTitle={t("Multiple_Choice", { ns: "bank" })}
                        />
                      </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={
                        <>
                          <FormOutlined />
                          {t("Essay", { ns: "bank" })}
                        </>
                      }
                      key="4"
                    >
                      <Row gutter={[16, 16]} className="Essay">
                        <Question
                          title={t("Enter_the_question", { ns: "bank" })}
                        />

                        <Col span={24}>
                          <div className="white_bg pd_20">
                            <Row gutter={[8, 8]}>
                              <Col span={24}>
                                <h6>
                                  {t("Enter_essay_question_info", {
                                    ns: "bank",
                                  })}
                                </h6>
                              </Col>

                              <Col span={24}>
                                <p className="font_weight_bold">
                                  {t("Note", { ns: "bank" })}
                                </p>
                                <Input />
                                <p className="text_mute text_small">
                                  {t("Note_will_be_shown", { ns: "bank" })}
                                </p>
                              </Col>
                              <Col span={24}>
                                <Switch
                                  defaultChecked
                                  onChange={onChangeSwich}
                                  size="small"
                                />
                                <span className="font_weight_bold">
                                  {" "}
                                  {t("File_required", { ns: "bank" })}
                                </span>
                                <p className="text_mute text_small">
                                  {t("File_will_be_required", { ns: "bank" })}
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={
                        <>
                          <FormOutlined />
                          {t("Filling_blank_spaces", { ns: "bank" })}
                        </>
                      }
                      key="7"
                    >
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <div className="white_bg pd_20 footer_question_type">
                            <b>{t("To_make_space", { ns: "bank" })}</b>
                            <br />
                            <br />
                            <p>Công cha như núi thái [%1%]</p>
                            <br />
                            <p>[%2%] như nước trong nguồn chảy ra</p>
                          </div>
                        </Col>

                        <QuestionFillingSpaces />
                        <Question
                          title={t("Explain_answers", { ns: "bank" })}
                          subTitle={t("Multiple_Choice", { ns: "bank" })}
                        />
                      </Row>
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CreateQuestion;
