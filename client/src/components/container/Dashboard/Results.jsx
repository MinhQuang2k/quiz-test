import { Progress, Tabs, Space, Badge } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

function Results(props) {
  const { t } = useTranslation("dashboard", "common");
  const showEvaluate = () => {
    return (
      <Space size="middle">
        <Badge
          count={t("need_grade", { ns: "statistic" })}
          style={{
            backgroundColor: "#dc3545",
          }}
        ></Badge>
      </Space>
    );
    return (
      <Space size="middle">
        <Badge
          count={t("passed", { ns: "statistic" })}
          style={{
            backgroundColor: "#06ba02",
          }}
        ></Badge>
      </Space>
    );
    return (
      <Space size="middle">
        <Badge
          count={t("failed", { ns: "statistic" })}
          style={{
            backgroundColor: "#1b2150",
          }}
        ></Badge>
      </Space>
    );
  };
  return (
    <div className="white_bg pdrbl_20">
      <Tabs>
        <Tabs.TabPane
          tab={t("latest_test_results", { ns: "dashboard" })}
          key="1"
          className="exam_results"
        >
          <h6>{t("latest_test_results", { ns: "dashboard" })}</h6>
          <div className="table">
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th>{t("full_name", { ns: "dashboard" })}</th>
                  <th>{t("correct_compelete", { ns: "dashboard" })}</th>
                  <th>{t("score", { ns: "dashboard" })}</th>
                  <th>{t("duration", { ns: "dashboard" })}</th>
                  <th>{t("status", { ns: "dashboard" })}</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                <tr>
                  <td>Hoang Duc Nam</td>
                  <td>
                    <Progress percent={20} />
                  </td>
                  <td>5</td>
                  <td>00:00:05</td>
                  <td>{showEvaluate()}</td>
                </tr>
                <tr>
                  <td>Hoang Duc Nam</td>
                  <td>
                    <Progress percent={20} />
                  </td>
                  <td>5</td>
                  <td>00:00:05</td>
                  <td>{showEvaluate()}</td>
                </tr>
                <tr>
                  <td>Hoang Duc Nam</td>
                  <td>
                    <Progress percent={20} />
                  </td>
                  <td>5</td>
                  <td>00:00:05</td>
                  <td>{showEvaluate()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Results;
