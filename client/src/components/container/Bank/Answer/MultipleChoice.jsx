import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Space } from "antd";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import TinyMCE from "../../../commons/TinyMCE";
import { QuestionContext } from "../../../../pages/bank/CreateQuestion";
import { getLetter } from "../../../../utils/question";

function MultipleChoice() {
  const { t } = useTranslation("bank");
  const { answerMul, setAnswerMul, corAnswersMul, setCorAnswersMul } =
    useContext(QuestionContext);

  const handleDeleteAnswer = (answer) => {
    let count = 0;
    let deleteAnswers = [];
    for (let item of answerMul) {
      if (item.id !== answer.id) {
        deleteAnswers.push({ ...item, id: getLetter(count) });
        count++;
      }
    }
    setAnswerMul(deleteAnswers);
    if (corAnswersMul.includes(answer.id)) {
      setCorAnswersMul(filterAnswerCor(answer.id, corAnswersMul));
    }
  };

  const filterAnswerCor = (answer, arrayCor) => {
    return arrayCor
      .filter((x) => x !== answer)
      .map((a) => {
        if (a.charCodeAt(0) > answer.charCodeAt(0))
          return String.fromCharCode(a.charCodeAt(0) - 1);
        return a;
      });
  };

  const handleAddAnswer = () => {
    setAnswerMul((pre) => [
      ...pre,
      { id: getLetter(answerMul.length), content: "" },
    ]);
  };
  const handleCheckAnswer = (answer) => {
    if (corAnswersMul.includes(answer.id)) {
      return setCorAnswersMul((pre) => {
        return pre.filter((item) => item !== answer.id);
      });
    }

    setCorAnswersMul((pre) => {
      let newAnswers = [...pre];
      newAnswers.push(answer.id);
      return newAnswers;
    });
  };

  return (
    <Col span={24}>
      <div className="white_bg pd_20">
        <h6>{t("Enter_the_answer", { ns: "bank" })}</h6>
        <Row gutter={[0, 16]}>
          {answerMul.map((answer) => (
            <Space align="start" key={answer.id}>
              <Row gutter={[8, 8]} align="middle" wrap={false}>
                <Col span={1}>
                  <Checkbox
                    checked={corAnswersMul.includes(answer.id)}
                    onChange={() => handleCheckAnswer(answer)}
                  />
                </Col>
                <Col span={1}>
                  <b> {answer.id.toUpperCase()} </b>
                </Col>
                <Col span={21}>
                  <TinyMCE
                    editor={answer}
                    setEditor={setAnswerMul}
                    type="answer"
                  />
                </Col>
                <Col span={1}>
                  <Button
                    type="link"
                    onClick={() => handleDeleteAnswer(answer)}
                  >
                    <CloseCircleOutlined />
                  </Button>
                </Col>
              </Row>
            </Space>
          ))}
        </Row>
        <Row>
          <Col flex={1}>
            <Button onClick={handleAddAnswer}>
              <PlusOutlined /> {t("Add_answer", { ns: "bank" })}
            </Button>
          </Col>

          <Col>
            (*) {t("Choose_the", { ns: "bank" })}{" "}
            <b>{t("correct_answer", { ns: "bank" })}</b>{" "}
            {t("by_clicking_on_the_checkbox", { ns: "bank" })}
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default MultipleChoice;
