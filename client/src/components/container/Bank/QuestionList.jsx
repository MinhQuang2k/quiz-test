import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Checkbox, Collapse, Modal } from "antd";
import React, { useEffect, useState } from "react";
import CustomPanel from "./CustomPanel";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { questionSelector, getQuestions } from "../../../slices/question";

const { confirm } = Modal;
function QuestionList() {
  const { t } = useTranslation("bank");
  const dispatch = useDispatch();

  const { questions, isLoading } = useSelector(questionSelector);
  const [checkAll, setCheckAll] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [questionTicks, setQuestionTicks] = useState([]);

  const handleCheckBox = (e, id) => {
    e.stopPropagation();
    if (e.target.checked) setQuestionTicks((pre) => [...pre, id]);
    else setQuestionTicks((pre) => pre.filter((item) => item !== id));

    if (questionTicks.length) setShowOption(false);
    else setShowOption(true);
  };
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setCheckAll(true);
      setShowOption(true);
    } else {
      setCheckAll(false);
      setQuestionTicks([]);
      setShowOption(false);
    }
  };
  const handleMassDelete = (e) => {};

  const showConfirm = (e, deleteList) => {
    confirm({
      title: t("Notification", { ns: "bank" }),
      icon: <ExclamationCircleOutlined />,
      content: t("Are_you_sure_want_to_remove_selected_questions", {
        ns: "bank",
      }),
      okText: t("Yes", { ns: "bank" }),
      cancelText: t("Cancel", { ns: "bank" }),

      onOk() {
        console.log(deleteList);
        e.target.value = "option";
      },

      onCancel() {
        e.target.value = "option";
      },
    });
  };
  useEffect(() => {
    dispatch(getQuestions({}));
  }, [dispatch]);
  return (
    <div className="question-list">
      <Checkbox
        onChange={handleCheckAll}
        checked={checkAll}
        className="checkAll"
      >
        {checkAll
          ? t("Uncheck_all", { ns: "bank" })
          : t("Check_all", { ns: "bank" })}
      </Checkbox>
      {showOption && (
        <select onChange={handleMassDelete} className="check-option">
          <option value="option">{t("Select", { ns: "bank" })}</option>
          <option value="delete">{t("Delete", { ns: "bank" })}</option>
        </select>
      )}
      <Collapse ghost>
        {questions.map((question, index) => (
          <CustomPanel
            key={question._id}
            question={question}
            index={index + 1}
            handleCheckBox={handleCheckBox}
            questionTicks={questionTicks}
            checkAll={checkAll}
          />
        ))}
      </Collapse>
    </div>
  );
}

export default QuestionList;
