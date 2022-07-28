import { Col } from "antd";

import Essay from "./Question/Essay";
import FillingBlankSpace from "./Question/FillingBlankSpace";
import Matching from "./Question/Matching";
import MultipleChoice from "./Question/MultipleChoice";
import TrueFalse from "./Question/TrueFalse";

function QuestionTest(props) {
  const { data } = props;
  const showArrayQuestion = (question) => {
    if (question.type === 1) return <MultipleChoice data={question} />;
    if (question.type === 2) return <TrueFalse data={question} />;
    if (question.type === 3) return <Essay data={question} />;
    if (question.type === 8) return <Matching data={question} />;
    if (question.type === 9) return <FillingBlankSpace data={question} />;
  };

  return (
    <>
      {data &&
        data.map((question) => (
          <Col span={24} key={question.id}>
            <div className="pd_20 exam question--exam_question">
              {showArrayQuestion(question)}
            </div>
          </Col>
        ))}
    </>
  );
}

export default QuestionTest;
