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
        <div className="layout-web">
          <HeaderPage />
          <Row justify="center" className="layout-web__content">
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
