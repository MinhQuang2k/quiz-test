import { Col, Row, Switch } from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { QuestionContext } from "../../../../pages/bank/CreateQuestion";
import TinyMCE from "../../../commons/TinyMCE";

function ExplainEssay(props) {
  const { t } = useTranslation("bank");
  const { noteAnswer, setNoteAnswer, isFileRequired, setIsFileRequired } =
    useContext(QuestionContext);
  const onChangeSwich = (checked) => {
    setIsFileRequired(checked);
  };

  return (
    <Col span={24}>
      <div className="white-bg p-4">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <h6>
              {t("Enter_essay_question_info", {
                ns: "bank",
              })}
            </h6>
          </Col>

          <Col span={24}>
            <p className="font_weight_bold">{t("Note", { ns: "bank" })}</p>
            <TinyMCE editor={noteAnswer} setEditor={setNoteAnswer} />
            <p className="text_mute text_small">
              {t("Note_will_be_shown", { ns: "bank" })}
            </p>
          </Col>
          <Col span={24}>
            <Switch
              onChange={onChangeSwich}
              size="small"
              checked={isFileRequired}
            />
            <span className="font_weight_bold">
              {t("File_required", { ns: "bank" })}
            </span>
            <p className="text_mute text_small">
              {t("File_will_be_required", { ns: "bank" })}
            </p>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default ExplainEssay;
