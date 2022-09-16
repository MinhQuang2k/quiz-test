import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import TinyMCE from "../../../commons/TinyMCE";
import { Col, Row } from "antd";
import { QuestionContext } from "../../../../pages/bank/CreateQuestion";

function Explain(props) {
  const { t } = useTranslation("bank");
  const { noteAnswer, setNoteAnswer } = useContext(QuestionContext);

  return (
    <Col span={24} className="question">
      <div className="white_bg pd_20">
        <Row gutter={[8, 8]}>
          <h6>{t("Explain_answers", { ns: "bank" })}</h6>
          <Col span={24}>
            <TinyMCE editor={noteAnswer} setEditor={setNoteAnswer} />
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default Explain;
