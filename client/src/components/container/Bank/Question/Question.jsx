import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import TinyMCE from "../../../commons/TinyMCE";
import { Col, Row } from "antd";
import { QuestionContext } from "../../../../pages/bank/CreateQuestion";

function Question() {
  const { t } = useTranslation("bank");
  const { content, setContent } = useContext(QuestionContext);

  return (
    <>
      <Col span={24} className="question">
        <div className="white-bg p-4">
          <Row gutter={[8, 8]}>
            <h6>{t("Enter_the_question", { ns: "bank" })}</h6>
            <Col span={24}>
              <TinyMCE editor={content} setEditor={setContent} />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
}

export default Question;
