import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import TabCategory from "./TabCategory";
import TabQuestionGroup from "./TabQuestionGroup";
import { useTranslation } from "react-i18next";
const { TabPane } = Tabs;

function TestCategory() {
  const navigate = useNavigate();
  const { t } = useTranslation("category");
  let location = useLocation();
  function callback(key) {
    navigate(key);
  }
  return (
    <div className="container tab-style">
      <Tabs defaultActiveKey={location.pathname} onChange={callback}>
        <TabPane tab={t("category", { ns: "category" })} key="/test-categories">
          <TabCategory />
        </TabPane>
        <TabPane
          tab={t("question_group", { ns: "category" })}
          key="/question-tags"
        >
          <TabQuestionGroup />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TestCategory;
