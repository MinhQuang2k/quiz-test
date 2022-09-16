import { Col, Row } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderPage from "./HeaderPage";
import PageLoading from "./PageLoading";

function LayoutWeb(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div className="layout--web">
          <Row justify="center" className="page--header">
            <Col>
              <Row justify="center" className="container">
                <Col span={24}>
                  <HeaderPage />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center" className="content">
            <Col>
              <Outlet />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default LayoutWeb;
