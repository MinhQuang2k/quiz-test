import React, { useContext, useState } from "react";
import { Col, Radio, Row } from "antd";
import { useTranslation } from "react-i18next";
import TinyMCE from "../../../commons/TinyMCE";
import { QuestionContext } from "../../../../pages/bank/CreateQuestion";

function TrueFalse() {
  const { t } = useTranslation("bank");
  const {
    answerTrueFalse,
    setAnswerTrueFalse,
    corAnswersTrueFalse,
    setCorAnswersTrueFalse,
  } = useContext(QuestionContext);

  const handleCheckAnswer = (e) => {
    setCorAnswersTrueFalse([e.target.value]);
  };

  return (
    <Col span={24}>
      <div className="white-bg p-4">
        <h6>{t("Enter_the_answer", { ns: "bank" })}</h6>
        <Radio.Group
          name="radiogroup"
          onChange={handleCheckAnswer}
          value={corAnswersTrueFalse[0]}
        >
          {answerTrueFalse.map((answer) => (
            <Row gutter={[8, 8]} align="middle" wrap={false} key={answer.id}>
              <Col span={1}>
                <Radio value={answer.id} />
              </Col>
              <Col span={1}>
                <b>{answer.id.toUpperCase()}</b>
              </Col>
              <Col span={21}>
                <TinyMCE
                  editor={answer}
                  setEditor={setAnswerTrueFalse}
                  type="answer"
                />
              </Col>
            </Row>
          ))}
          <Row>
            (*) {t("Choose_the", { ns: "bank" })}
            <b>{t("correct_answer", { ns: "bank" })}</b>
            {t("by_clicking_on_the_checkbox", { ns: "bank" })}
          </Row>
        </Radio.Group>
      </div>
    </Col>
  );
}

export default TrueFalse;
