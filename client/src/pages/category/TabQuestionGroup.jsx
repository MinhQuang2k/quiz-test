import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Pagination, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionGroups,
  questionGroupsSelector,
} from "../../slices/questionGroup";
import Card from "../../components/container/TestCategory/QuestionGroup/Card";
import CardSkeleton from "../../components/container/TestCategory/QuestionGroup/CardSkeleton";
import AddCard from "../../components/container/TestCategory/QuestionGroup/Forms/AddCard";
const { Search } = Input;
function TabQuestionGroup() {
  const { t } = useTranslation("category");
  const [questionModal, setQuestionModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const {
    questionGroups,
    isLoading,
    pagination: { per_page, total, current_page },
  } = useSelector(questionGroupsSelector);

  const addQuestionGroup = () => {
    setQuestionModal(!questionModal);
  };

  const onSearch = (values) => {
    setKeyword(values);
  };

  useEffect(() => {
    dispatch(
      getQuestionGroups({
        page,
        keyword,
        per_page,
      })
    );
  }, [page, keyword]);

  return (
    <>
      <Row justify="space-between" align="middle" className="mb-1">
        <Col span={8}>
          <Search
            className="search-btn"
            size="large"
            placeholder={t("search_question_group", { ns: "category" })}
            defaultValue=""
            loading={isLoading}
            onSearch={onSearch}
          />
        </Col>
        <Col span={8} className="item-right">
          <Button
            type="primary"
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={addQuestionGroup}
            loading={isLoading}
          >
            {t("new_questiongroup", { ns: "category" })}
          </Button>
        </Col>
      </Row>
      {questionGroups &&
        questionGroups.map((group) => <Card group={group} key={group?._id} />)}

      {isLoading
        ? Array.from(Array(10).keys()).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        : null}

      <Row justify="center" align="middle">
        <Pagination
          defaultCurrent={1}
          defaultPageSize={per_page}
          current={current_page}
          onChange={(values) => setPage(values)}
          total={total}
          hideOnSinglePage
        />
      </Row>
      <Modal
        title={t("create_new_question_group", { ns: "category" })}
        onOk={() => setQuestionModal(false)}
        onCancel={() => setQuestionModal(false)}
        visible={questionModal}
        style={{ top: 25 }}
        footer={null}
      >
        <AddCard onCancel={() => setQuestionModal(false)} />
      </Modal>
    </>
  );
}

export default TabQuestionGroup;
