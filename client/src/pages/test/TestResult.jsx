import { DownloadOutlined, MailOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SendMail from "../../components/container/Test/TestResult/Forms/SendMail";
import TestResultTable from "../../components/container/Test/TestResult/TestResultTable";
const { Search } = Input;
function TestResult() {
  const { t } = useTranslation("test");
  const { id } = useParams();
  const [mailModal, setMailModal] = useState(false);
  const [orderBy, setOrderBy] = useState("latest");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const onSearch = (value) => {
    setKeyword(value);
  };
  const onSelectChange = (value) => {
    setOrderBy(value);
  };
  const onSendMail = () => {
    setMailModal(true);
  };

  return (
    <div className="container tab-style test-result">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/tests">{t("tests", { ns: "test" })}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/tests/tests.id/edit`}>tests.name</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {t("test_result", { ns: "test" })}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} align="middle" justify="space-between">
            <Col md={8}>
              <Typography.Title level={4}>tests.name</Typography.Title>
            </Col>
            <Col md={16}>
              <Row gutter={8} align="middle" justify="end">
                <Select
                  className="select"
                  placeholder={t("latest", { ns: "test" })}
                  defaultValue="latest"
                  onChange={onSelectChange}
                  style={{ width: "8rem" }}
                >
                  <Select.Option value="latest">
                    {t("latest", { ns: "test" })}
                  </Select.Option>
                  <Select.Option value="highest_score">
                    {t("highest_score", { ns: "test" })}
                  </Select.Option>
                  <Select.Option value="lowest_score">
                    {t("lowest_score", { ns: "test" })}
                  </Select.Option>
                </Select>
                <Col className="category-group" style={{ marginBottom: 0 }}>
                  <Search
                    className="search-btn"
                    onSearch={onSearch}
                    style={{ width: 350 }}
                    defaultValue=""
                    // loading={isLoading}
                    placeholder={t("search_the_answer_sheet", { ns: "test" })}
                  />
                </Col>
                <Col>
                  <Space>
                    <Button
                      onClick={onSendMail}
                      icon={
                        <Tooltip
                          title={t("send_results_by_email", { ns: "test" })}
                        >
                          <MailOutlined />
                        </Tooltip>
                      }
                      type="primary"
                      size="large"
                      // loading={isLoading}
                    />
                    <Button
                      icon={
                        <Tooltip title={t("export_file", { ns: "test" })}>
                          <DownloadOutlined />
                        </Tooltip>
                      }
                      type="primary"
                      size="large"
                      // loading={isLoading}
                    />
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <TestResultTable
          // data={testResults}
          // pagination={pagination}
          // setCurrentPage={setCurrentPage}
          />
        </Col>
      </Row>
      <Modal
        title={t("send_results_by_email", { ns: "test" })}
        visible={mailModal}
        onCancel={() => setMailModal(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <SendMail closeModal={() => setMailModal(false)} />
      </Modal>
    </div>
  );
}

export default TestResult;
