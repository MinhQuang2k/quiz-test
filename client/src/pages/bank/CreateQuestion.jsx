import { Breadcrumb, Button, Col, Input, Row, Switch, Space, Tabs } from "antd";
import React, { useState, createContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Matching from "../../components/container/Bank/Answer/Matching";
import MultipleChoice from "../../components/container/Bank/Answer/MultipleChoice";
import TrueFalse from "../../components/container/Bank/Answer/TrueFalse";
import Question from "../../components/container/Bank/Question/Question";
import Explain from "../../components/container/Bank/Explain/Explain";
import ExplainEssay from "../../components/container/Bank/Explain/ExplainEssay";
import QuestionFillingSpaces from "../../components/container/Bank/Question/QuestionFillingSpaces";
import Setting from "../../components/container/Bank/Setting/Setting";
import { addQuestion } from "../../slices/question";
import { timeStringToNumber } from "../../utils/statistic";

export const SettingContext = createContext();
export const QuestionContext = createContext();

function CreateQuestion() {
  const { t } = useTranslation("bank");
  const location = useLocation();
  const [tabKey, setTabKey] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setting
  const [score, setScore] = useState(1);
  const [tags, setTags] = useState({
    _id: "62da711e40a9ca3c88be6da4",
    name: "nhom 4",
  });
  const [timeLimit, setTimeLimit] = useState("02:03:03");
  const [isAnswersShuff, setIsAnswersShuff] = useState(true);
  const [hasMulCorrectAnswers, setHasMulCorrectAnswers] = useState(false);

  // question
  const [content, setContent] = useState("<p>noi dung</p>");

  // explain answers
  const [noteAnswer, setNoteAnswer] = useState(
    "<p><strong>chu thich</strong></p>"
  );

  // answer type1
  const [answerMul, setAnswerMul] = useState([
    { id: "a", content: "<p>a</p>" },
    { id: "b", content: "<p>b</p>" },
    { id: "c", content: "<p>123</p>" },
    { id: "d", content: "<p>323</p>" },
    { id: "e", content: "<p>12</p>" },
  ]);
  const [corAnswersMul, setCorAnswersMul] = useState(["a"]);

  // answer type2
  const [answerTrueFalse, setAnswerTrueFalse] = useState([
    { id: "a", content: "\u0110\u00fang" },
    { id: "b", content: "Sai" },
  ]);
  const [corAnswersTrueFalse, setCorAnswersTrueFalse] = useState(["b"]);

  // answer type3

  const [matchingQuestion, setMatchingQuestion] = useState([
    { id: 1, content: "<p>1</p>" },
    { id: 2, content: "<p>2</p>" },
    { id: 3, content: "<p>f</p>" },
  ]);
  const [matchingAnswer, setMatchingAnswer] = useState([
    { id: "a", content: "<p>1</p>" },
    { id: "b", content: "<p>2</p>" },
  ]);
  const [corMatchingAnswer, setCorMatchingAnswer] = useState({
    1: ["a"],
    2: ["b"],
    3: ["a"],
  });

  // answer type 4
  const [isFileRequired, setIsFileRequired] = useState(false);

  // answer type 5
  const [fillBlankCorAnswer, setFillBlankCorAnswer] = useState([
    { key: 1, content: ["son"] },
    { key: 2, content: ["Nghia me"] },
  ]);

  const onChange = (key) => {
    console.log(key);
    setTabKey(key);
  };

  const handleCreateQuestion = () => {
    if (Number(tabKey) === 1) {
      dispatch(
        addQuestion({
          content: content,
          type: tabKey,
          answers: answerMul,
          correct_answers: corAnswersMul,
          score: score,
          tags: tags._id,
          has_mul_correct_answers: hasMulCorrectAnswers,
          is_answers_shufflable: isAnswersShuff,
          time_limit: timeStringToNumber(timeLimit),
          note_answer: noteAnswer,
        })
      );
    } else if (Number(tabKey) === 2) {
      dispatch(
        addQuestion({
          content: content,
          type: tabKey,
          answers: answerTrueFalse,
          correct_answers: corAnswersTrueFalse,
          score: score,
          tags: tags._id,
          is_answers_shufflable: isAnswersShuff,
          time_limit: timeStringToNumber(timeLimit),
          note_answer: noteAnswer,
        })
      );
    } else if (Number(tabKey) === 3) {
      dispatch(
        addQuestion({
          content: content,
          type: tabKey,
          matching_answers: {
            questions: matchingQuestion,
            answers: matchingAnswer,
          },
          matching_correct_answers: corMatchingAnswer,
          score: score,
          tags: tags._id,
          time_limit: timeStringToNumber(timeLimit),
          note_answer: noteAnswer,
        })
      );
    } else if (Number(tabKey) === 4) {
      dispatch(
        addQuestion({
          content: content,
          type: tabKey,
          is_file_required: isFileRequired,
          score: score,
          tags: tags._id,
          time_limit: timeStringToNumber(timeLimit),
          note_answer: noteAnswer,
        })
      );
    } else if (Number(tabKey) === 5) {
      dispatch(
        addQuestion({
          content: content,
          type: tabKey,
          fill_blank_correct_answers: fillBlankCorAnswer,
          score: score,
          tags: tags._id,
          time_limit: timeStringToNumber(timeLimit),
          note_answer: noteAnswer,
        })
      );
    }
    navigate("/bank", { replace: true });
  };

  return (
    <>
      <Row className="container mb-5" align="middle" justify="space-between">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/bank">{t("Question_bank", { ns: "bank" })}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {location.state.update
                ? t("Update", { ns: "bank" })
                : t("Create", { ns: "bank" })}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Button type="primary" onClick={() => handleCreateQuestion()}>
            {location.state.update
              ? t("Update", { ns: "bank" })
              : t("Create", { ns: "bank" })}
          </Button>
          <Button className="ml-2">
            <Link to="/bank">{t("Back_to_Bank", { ns: "bank" })}</Link>
          </Button>
        </Col>
      </Row>
      <Row className="create-question container mb-3">
        <Col span={8} className="pr-2">
          <SettingContext.Provider
            value={{
              score,
              setScore,
              tags,
              setTags,
              timeLimit,
              setTimeLimit,
              isAnswersShuff,
              setIsAnswersShuff,
              hasMulCorrectAnswers,
              setHasMulCorrectAnswers,
              tabKey,
            }}
          >
            <Setting />
          </SettingContext.Provider>
        </Col>
        <Col span={16} className="pl-2">
          <QuestionContext.Provider
            value={{
              content,
              setContent,
              noteAnswer,
              setNoteAnswer,
              answerMul,
              setAnswerMul,
              corAnswersMul,
              setCorAnswersMul,
              answerTrueFalse,
              setAnswerTrueFalse,
              corAnswersTrueFalse,
              setCorAnswersTrueFalse,
              matchingQuestion,
              setMatchingQuestion,
              matchingAnswer,
              setMatchingAnswer,
              corMatchingAnswer,
              setCorMatchingAnswer,
              isFileRequired,
              setIsFileRequired,
              fillBlankCorAnswer,
              setFillBlankCorAnswer,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div className="white-bg p-4 question_type">
                  <h6>{t("Question_Type", { ns: "bank" })}</h6>
                </div>
              </Col>
              <Col span={24} className="choose_question">
                <Tabs defaultActiveKey="1" onChange={onChange}>
                  <Tabs.TabPane
                    tab={<>{t("Multiple_Choice", { ns: "bank" })}</>}
                    key={1}
                  >
                    <Row gutter={[16, 16]} className="multiple_choice">
                      <Question />
                      <MultipleChoice />
                      <Explain />
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={<>{t("True_False", { ns: "bank" })}</>}
                    key={2}
                  >
                    <Row gutter={[16, 16]}>
                      <Question />
                      <TrueFalse />
                      <Explain />
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={<>{t("Matching", { ns: "bank" })}</>}
                    key={3}
                  >
                    <Row gutter={[16, 16]} className="matching">
                      <Question />
                      <Matching />
                      <Explain />
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab={<>{t("Essay", { ns: "bank" })}</>} key={4}>
                    <Row gutter={[16, 16]} className="essay">
                      <Question />
                      <ExplainEssay />
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={<>{t("Filling_blank_spaces", { ns: "bank" })}</>}
                    key={5}
                  >
                    <Row gutter={[16, 16]}>
                      <QuestionFillingSpaces />
                      <Explain />
                    </Row>
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
          </QuestionContext.Provider>
        </Col>
      </Row>
    </>
  );
}

export default CreateQuestion;
