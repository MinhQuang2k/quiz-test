import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Radio, Row, Space } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import TinyMCE from "../../../commons/TinyMCE";
import { QuestionContext } from "../../../../pages/bank/CreateQuestion";
import { getLetter } from "../../../../utils/question";

function Matching(props) {
  const { t } = useTranslation("bank");
  const {
    matchingQuestion,
    setMatchingQuestion,
    matchingAnswer,
    setMatchingAnswer,
    corMatchingAnswer,
    setCorMatchingAnswer,
  } = useContext(QuestionContext);
  const handleAddQuestion = () => {
    setMatchingQuestion((pre) => [
      ...pre,
      { id: matchingQuestion.length + 1, content: "" },
    ]);
    addCorRow();
  };
  const handleAddAnswer = () => {
    setMatchingAnswer((pre) => [
      ...pre,
      { id: getLetter(matchingAnswer.length), content: "" },
    ]);
  };
  const handleDeleteQuestion = (question) => {
    let count = 0;
    let deleteQuestion = [];
    for (let item of matchingQuestion) {
      if (item.id !== question.id) {
        count++;
        deleteQuestion.push({ ...item, id: count });
      }
    }
    setMatchingQuestion(deleteQuestion);
    deleteCorRow(question);
  };
  const addCorRow = () => {
    if (!corMatchingAnswer.hasOwnProperty(matchingQuestion.length + 1)) {
      setCorMatchingAnswer((pre) => {
        return { ...pre, [matchingQuestion.length + 1]: [] };
      });
    }
  };
  const deleteCorRow = (question) => {
    if (corMatchingAnswer.hasOwnProperty(question.id)) {
      let newCorAnswer = { ...corMatchingAnswer };
      let corAnswer = Object.values(corMatchingAnswer);
      for (let i in corMatchingAnswer) {
        if (Number(i) >= Number(question.id) && Number(i) < corAnswer.length) {
          newCorAnswer[i] = newCorAnswer[Number(i) + 1];
        }
      }
      delete newCorAnswer[corAnswer.length];
      setCorMatchingAnswer(newCorAnswer);
    }
  };
  const handleDeleteAnswer = (answer) => {
    let count = 0;
    let deleteAnswers = [];
    for (let item of matchingAnswer) {
      if (item.id !== answer.id) {
        deleteAnswers.push({ ...item, id: getLetter(count) });
        count++;
      }
    }
    deleteCorCol(answer);
    setMatchingAnswer(deleteAnswers);
  };
  const deleteCorCol = (answer) => {
    let newCorAnswer = { ...corMatchingAnswer };
    let answerToNumber = answer.id.charCodeAt(0);
    for (let i in corMatchingAnswer) {
      let newAnswers = [];
      for (let k of newCorAnswer[i]) {
        let itemToNumber = k.charCodeAt(0);
        if (itemToNumber === answerToNumber) continue;
        if (itemToNumber > answerToNumber)
          newAnswers.push(String.fromCharCode(itemToNumber - 1));
        else newAnswers.push(k);
      }
      newCorAnswer[i] = newAnswers;
    }
    setCorMatchingAnswer(newCorAnswer);
  };
  const handleCheckAnswer = (e, answer, question) => {
    if (e.target.checked) {
      let newCorAnswer = { ...corMatchingAnswer };
      newCorAnswer[question.id].push(answer.id);
      setCorMatchingAnswer(newCorAnswer);
    } else {
      let newCorAnswer = { ...corMatchingAnswer };
      newCorAnswer[question.id].splice(
        newCorAnswer[question.id].indexOf(answer.id),
        1
      );
      setCorMatchingAnswer(newCorAnswer);
    }
  };
  return (
    <Col span={24}>
      <div className="white-bg p-4">
        <h6>{t("Enter_the_answer", { ns: "bank" })}</h6>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row justify="space-around">
              <Col>
                <b>{t("Column", { ns: "bank" })} 1</b>
              </Col>
              <Col>
                <b>{t("Column", { ns: "bank" })} 2</b>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            {matchingQuestion.map((question) => (
              <Space align="start" key={question.id}>
                <Row align="middle" gutter={[8, 8]} wrap={false}>
                  <Col span={1}>
                    <b>{question.id}</b>
                  </Col>
                  <Col span={22}>
                    <TinyMCE
                      editor={question}
                      setEditor={setMatchingQuestion}
                      type="answer"
                    />
                  </Col>
                  <Col span={1}>
                    <Button
                      type="link"
                      onClick={() => handleDeleteQuestion(question)}
                    >
                      <CloseCircleOutlined />
                    </Button>
                  </Col>
                </Row>
              </Space>
            ))}
            <Col>
              <Button onClick={handleAddQuestion}>
                <PlusOutlined /> {t("Add_answer", { ns: "bank" })}
              </Button>
            </Col>
          </Col>
          <Col span={12}>
            {matchingAnswer.map((answer) => (
              <Space align="start" key={answer.id}>
                <Row align="middle" gutter={[8, 8]} wrap={false}>
                  <Col span={1}>
                    <b>{answer.id.toUpperCase()}</b>
                  </Col>
                  <Col span={22}>
                    <TinyMCE
                      editor={answer}
                      setEditor={setMatchingAnswer}
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
            <Col>
              <Button onClick={handleAddAnswer}>
                <PlusOutlined /> {t("Add_answer", { ns: "bank" })}
              </Button>
            </Col>
          </Col>
          <Col span={24}>
            <h6>{t("Choose_the_answer", { ns: "bank" })}</h6>
            <p>{t("Please_choose", { ns: "bank" })}</p>
          </Col>
          <Col span={24}>
            <Row justify="center">
              <Col>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {matchingAnswer.map((answer) => (
                        <th key={answer.id}>{answer.id.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matchingQuestion.map((question) => (
                      <tr key={question.id}>
                        <td>{question.id}</td>
                        {matchingAnswer.map((answer) => (
                          <td key={answer.id}>
                            <Checkbox
                              checked={corMatchingAnswer[question.id].includes(
                                answer.id
                              )}
                              onChange={(e) =>
                                handleCheckAnswer(e, answer, question)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default Matching;
