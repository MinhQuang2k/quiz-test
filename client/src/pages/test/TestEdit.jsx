import { Breadcrumb, Row, Col, Typography, Divider } from "antd";
import TestTopRight from "../../components/container/Test/TestEdit/TestTopRight";
import { Link, useParams } from "react-router-dom";
import TestDrag from "../../components/container/Test/TestEdit/Drag/TestDrag";
function TestEdit() {
  const { id } = useParams();
  const test = null;
  return (
    <div className="container test-edit tab-style">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/tests">Đề Thi</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{test?.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Title level={3}>{test?.name}</Typography.Title>
            </Col>
            <Col>
              <TestTopRight />
            </Col>
          </Row>
        </Col>
        <Divider className="divider-m-none" />
        <TestDrag />
      </Row>
    </div>
  );
}

export default TestEdit;
