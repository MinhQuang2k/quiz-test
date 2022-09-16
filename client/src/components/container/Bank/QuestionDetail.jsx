import { Divider, Row, Col } from "antd";
import React from "react";
import MultipleChoice from "./Detail/Answer/MultipleChoice";
import TrueFalse from "./Detail/Answer/TrueFalse";
import Matching from "./Detail/Answer/Matching";
import Essay from "./Detail/Answer/Essay";
import FillingBlank from "./Detail/Answer/FillingBlank";
import QuestionInfo from "./Detail/QuestionInfo";

function QuestionDetail({ question }) {
  return (
    <div className="question-detail">
      <Divider />
      <Row justify="center">
        <Col span={20}>
          <Row>
            {question.type == 1 && (
              <Col span={12}>
                <MultipleChoice question={question} />
              </Col>
            )}
            {question.type == 2 && (
              <Col span={12}>
                <TrueFalse question={question} />
              </Col>
            )}
            {/* {question.type == 3 && (
              <Col span={12}>
                <Matching question={question} />
              </Col>
            )}
            {question.type == 4 && (
              <Col span={12}>
                <Essay question={question} />
              </Col>
            )} */}
            {question.type == 5 && (
              <Col span={12}>
                <FillingBlank question={question} />
              </Col>
            )}
            <Col span={12}>
              <QuestionInfo />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default QuestionDetail;
