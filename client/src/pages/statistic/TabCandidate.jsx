import { Col, Pagination, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddFiilterOptions from "../../components/container/Statistic/AddFiilterOptions";
import Candidates from "../../components/container/Statistic/Candidates";

function TabCandidate() {
  const { t } = useTranslation("statistic");

  const [optionsSelected, setOptionsSelected] = useState({});
  const [page, setPage] = useState(1);

  return (
    <div className="answer_sheets">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <div className="white-bg p-4">
            <AddFiilterOptions
              optionsSelected={optionsSelected}
              setOptionsSelected={setOptionsSelected}
            />
          </div>
        </Col>
        <Col span={24}>
          <Candidates />
        </Col>
        <Col className="pagination-bottom">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={10}
            current={page}
            onChange={(values) => setPage(values)}
            total={20}
            hideOnSinglePage
          />
        </Col>
      </Row>
    </div>
  );
}

export default TabCandidate;
