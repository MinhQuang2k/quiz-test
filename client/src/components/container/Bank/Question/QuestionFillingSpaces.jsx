import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip } from "antd";
import { useEffect } from "react";
import { default as React, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuestionContext } from "../../../../pages/bank/CreateQuestion";
import TinyMCE from "../../../commons/TinyMCE";

function checkDuplicateAnswers(arr) {
  return new Set(arr).size !== arr.length;
}

function QuestionFillingSpaces(props) {
  const { t } = useTranslation("bank");
  const { content, setContent, fillBlankCorAnswer, setFillBlankCorAnswer } =
    useContext(QuestionContext);
  const [isAnswer, setIsAnswer] = useState(false);
  useEffect(() => {
    if (content) {
      setIsAnswer(true);
    }
  }, []);
  const handleChangeAnswers = (e, key) => {
    setFillBlankCorAnswer((pre) =>
      pre.map((answer) => {
        if (answer.key === Number(key)) {
          return { ...answer, content: [e.target.value] };
        }
        return answer;
      })
    );
  };

  const formatQuestion = (question) => {
    let newQuestion = question;
    for (let item of fillBlankCorAnswer) {
      newQuestion = newQuestion.replace(
        `[%${item.key}%]`,
        `<strong>__${item.key}__</strong>`
      );
    }
    return newQuestion;
  };

  const formatContent = (keys, keysNumber, content) => {
    let newContent = content;
    for (let i in fillBlankCorAnswer) {
      newContent = newContent.replace(keys[i], `[%${keysNumber[i]}%]`);
    }
    setContent(newContent);
  };

  const log = () => {
    if (content) {
      // const value = content.getContent();
      const pattern = /\[%[0-9]+%\]/;
      const found = content.match(/\[%[0-9]+%\]/g);
      if (pattern.test(content) && !checkDuplicateAnswers(found)) {
        setIsAnswer(true);
        let newKeys = content.match(/\[%[0-9]+%\]/g);
        let keysToNumber = newKeys.map((item) =>
          Number(item.slice(2, item.length - 2))
        );
        formatContent(newKeys, keysToNumber, content);
        setFillBlankCorAnswer((pre) =>
          keysToNumber.map((item) => {
            if (!pre.length) return { key: item, content: [] };
            let oldAnswer = pre.find((x) => x.key === item);
            if (oldAnswer) return oldAnswer;
            return { key: item, content: [] };
          })
        );
      } else {
        Modal.info({
          title: t("Notification", { ns: "bank" }),
          icon: <ExclamationCircleOutlined />,
          content: t("Please_enter_a_question", { ns: "bank" }),
          okText: t("yes", { ns: "testCampaign" }),
          onOk() {
            //console.log('delete')
          },
          maskClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Col span={24}>
        <div className="white_bg pd_20 ">
          <Row gutter={[8, 8]}>
            <Col flex={1}>
              <h6>{t("Enter_the_question", { ns: "bank" })}</h6>
            </Col>
            {isAnswer && (
              <Col>
                <Tooltip title={t("Edit", { ns: "bank" })}>
                  <EditOutlined onClick={() => setIsAnswer(false)} />
                </Tooltip>
              </Col>
            )}
            <Col span={24} className="question">
              <Row wrap={false} gutter={[8, 8]} justify="space-between">
                {isAnswer && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatQuestion(content),
                    }}
                  ></div>
                )}
                {!isAnswer && (
                  <Col span={24}>
                    <TinyMCE editor={content} setEditor={setContent} />
                    <br />
                    <br />
                    <Col span={24}>
                      <div className="white_bg pd_20 footer_question_type">
                        <p>{t("To_make_space", { ns: "bank" })}</p>
                        <br />
                        <br />
                        <p>Công cha như núi thái [%1%]</p>
                        <br />
                        <p>[%2%] như nước trong nguồn chảy ra</p>
                      </div>
                    </Col>
                    <Button type="primary" onClick={log}>
                      {t("Save_question", { ns: "bank" })}
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
      {isAnswer && (
        <Col span={24}>
          <div className="white_bg pd_20 ">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h6>{t("Enter_essay_question_info", { ns: "bank" })}</h6>
              </Col>
              <Col span={24}>
                <p className="text_mute">
                  - {t("The_system_does_not_distinguish", { ns: "bank" })}
                </p>
                <p className="text_mute">
                  -{" "}
                  {t("To_record_more_than_one_correct_answer", { ns: "bank" })}
                </p>
              </Col>
              <Col span={24}>
                {fillBlankCorAnswer.map((item, index) => (
                  <Row key={item.key} align="middle">
                    <Col span={2}>
                      <b>{item.key}:</b>
                    </Col>
                    <Col span={22}>
                      <Input
                        value={item.content}
                        onChange={(e) => handleChangeAnswers(e, item.key)}
                      />
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </div>
        </Col>
      )}
    </>
  );
}

export default QuestionFillingSpaces;
