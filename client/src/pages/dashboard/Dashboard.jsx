import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import CardTest from "../../components/container/Dashboard/CardTest";

function Dashboard(props) {
  const { t } = useTranslation("dashboard", "common");

  return (
    <div className="dashboard container">
      <Row gutter={[24, 24]}>
        <Col span={24} className="card-test">
          <CardTest />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
