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
          <Row justify="center" className="page--header" gutter>
            <Col xs={23} md={20} lg={20} xl={18} xxl={14}>
              <HeaderPage />
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={23} md={20} lg={20} xl={18} xxl={14}>
              <div className="Content">
                <Outlet />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default LayoutWeb;
