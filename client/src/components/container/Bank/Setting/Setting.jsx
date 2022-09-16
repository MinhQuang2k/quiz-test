import { CheckOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Row, Select, Switch } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SettingContext } from "../../../../pages/bank/CreateQuestion";
const { Option } = Select;

function Setting() {
  const { t } = useTranslation("bank");
  const {
    score,
    setScore,
    tags,
    setTags,
    timeLimit,
    setTimeLimit,
    isAnswersShuff,
    setIsAnswersShuff,
    tabKey,
  } = useContext(SettingContext);
  const onChangeTimeLimit = (date, dateString) => {
    setTimeLimit(dateString);
  };

  return (
    <div className="white_bg pd_20">
      <h6>{t("Setting", { ns: "bank" })}</h6>
      <Form
        layout="vertical"
        initialValues={{
          score,
          // tags,
          timeLimit: moment(timeLimit, "HH:mm:ss"),
          isAnswersShuff,
        }}
      >
        <Form.Item
          label={t("Score_Of_Question", { ns: "bank" })}
          name="score"
          rules={[{ required: true, message: "bat buoc" }]}
        >
          <Input
            onChange={(e) => setScore(e.target.value)}
            suffix={
              <CheckOutlined
                style={{
                  color: "rgba(0,0,0,.25)",
                }}
              />
            }
          />
        </Form.Item>
        <Form.Item label={t("Question_group", { ns: "bank" })} name="tags">
          <Select
            showSearch
            labelInValue
            placeholder={`-- ${t("Question_group", {
              ns: "bank",
            })} --`}
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            // onChange={(value) => setTags(value)}
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
        </Form.Item>
        <Form.Item label={t("Time_limit", { ns: "bank" })} name="timeLimit">
          <DatePicker
            picker="time"
            placeholder="HH:mm:ss"
            onChange={onChangeTimeLimit}
          />
        </Form.Item>
        <Form.Item
          label={t("Shuffable_Answer", { ns: "bank" })}
          name="isAnswersShuff"
          valuePropName="checked"
        >
          <Switch onChange={(value) => setIsAnswersShuff(value)} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Setting;
