import {
  CaretDownOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Checkbox, Collapse, Divider, Modal, Tooltip } from "antd";
import QuestionDetail from "./QuestionDetail";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

const { Panel } = Collapse;

function CustomPanel({
  index,
  question,
  handleCheckBox,
  questionTicks,
  checkAll,
  ...props
}) {
  const { t } = useTranslation("bank");
  const handleDelete = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: t("Do_you_want_to_remove_question", { ns: "bank" }),
      icon: <ExclamationCircleOutlined />,
      okText: t("Yes_Remove_it", { ns: "bank" }),
      cancelText: t("No_Keep_it", { ns: "bank" }),
      onOk: onOk,
    });
  };
  const onOk = () => {};

  const handleCopy = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: t("Do_you_want_to_duplicate_this_question", { ns: "bank" }),
      icon: <ExclamationCircleOutlined />,
      okText: t("Yes_duplicate_it", { ns: "bank" }),
      cancelText: t("No", { ns: "bank" }),
      onOk: onOk,
    });
  };

  return (
    <Panel
      showArrow={false}
      key={index}
      {...props}
      extra={[
        <Tooltip key={index + 3000} title={t("Update", { ns: "bank" })}>
          <Link to="/bank/question/:id/edit" state={{ update: true }}>
            <EditOutlined />
          </Link>
        </Tooltip>,
        <Tooltip key={index + 2000} title={t("Duplicate", { ns: "bank" })}>
          <CopyOutlined onClick={handleCopy} />
        </Tooltip>,
        <Tooltip key={index + 1000} title={t("Delete", { ns: "bank" })}>
          <DeleteOutlined onClick={handleDelete} />
        </Tooltip>,
        <CaretDownOutlined key={index + 4000} />,
      ]}
      header={
        <div className="panel-header">
          <div className="panel-left">
            <Checkbox
              value={question._id}
              checked={questionTicks.includes(question._id) || checkAll}
              onChange={(e) => handleCheckBox(e, question._id)}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />{" "}
            <b>{`${t("Question", { ns: "bank" })} ${index}`}</b>{" "}
            <Divider type="vertical" />
          </div>
          <div className="panel-content">
            <div dangerouslySetInnerHTML={{ __html: question.content }}></div>
          </div>
        </div>
      }
    >
      <QuestionDetail question={question} />
    </Panel>
  );
}
export default CustomPanel;
