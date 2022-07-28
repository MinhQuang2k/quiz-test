import { CaretRightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Typography,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddTest from "../../components/container/Test/Test/Forms/AddTest";
import TestPanel from "../../components/container/Test/Test/TestPanel";
const { Search } = Input;
const { Option, OptGroup } = Select;

function Tests() {
  const { t } = useTranslation("test");
  const [isAddTest, setIsAddTest] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({
    keyword: "",
    subExamGroupId: "",
    test_types: ["normal", "it", "toeic", "mbti", "mi", "disc", "iq"],
    sort_by: "recent",
    page: 1,
  });

  const onSearch = (values) => {
    const q = { ...query, keyword: values };
    setQuery(q);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="container test-section tab-style">
      <Row justify="space-between" align="center">
        <Col>
          <Typography.Title level={3}>
            {t("tests", { ns: "test" })}
          </Typography.Title>
        </Col>
        <Col>
          <Button
            type="primary"
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => setIsAddTest(true)}
          >
            {t("create_new_test", { ns: "test" })}
          </Button>
        </Col>
      </Row>
      <Row gutter={24} align="middle" justify="start" className="mb-1">
        <Col span={8}>
          <Search
            className="search-btn"
            size="large"
            placeholder={t("enter_keyword_to_search_tests", { ns: "test" })}
            loading={false}
            onSearch={onSearch}
          />
        </Col>
        <Col span={8}>
          <Select
            defaultValue="lucy"
            onChange={handleChange}
            className="select"
            size="large"
          >
            <OptGroup label="Manager">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </OptGroup>
            <OptGroup label="Engineer">
              <Option value="Yiminghe">yiminghe</Option>
            </OptGroup>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Search to Select"
            onChange={handleChange}
            className="select"
            size="large"
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
        </Col>
      </Row>

      <Collapse
        expandIconPosition="end"
        ghost
        expandIcon={() => <CaretRightOutlined rotate={90} />}
      >
        <TestPanel key={1} />
      </Collapse>

      <Modal
        title={t("create_new_test", { ns: "test" })}
        onOk={() => setIsAddTest(false)}
        onCancel={() => setIsAddTest(false)}
        visible={isAddTest}
        style={{ top: 25 }}
        footer={null}
      >
        <AddTest onCancel={() => setIsAddTest(false)} />
      </Modal>
      <Row justify="center" align="middle">
        <Pagination
          defaultCurrent={1}
          current={page}
          onChange={(value) => setPage(value)}
          total={20}
          pageSize={10}
          hideOnSinglePage={true}
        />
      </Row>
    </div>
  );
}

export default Tests;
