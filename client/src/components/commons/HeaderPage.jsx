import { UpOutlined, YoutubeFilled } from "@ant-design/icons";
import {
  BackTop,
  Button,
  Col,
  Dropdown,
  Menu,
  Row,
  Space,
  Tooltip,
} from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  multiLanguageSelector,
} from "../../slices/multiLanguage";

function HeaderPage(props) {
  const location = useLocation();
  const { t, i18n } = useTranslation("common");
  const { language } = useSelector(multiLanguageSelector);
  const Logout = async () => {};

  const dispatch = useDispatch();

  const handleClick = (language) => {
    if (language === LANGUAGE_VI) {
      dispatch(changeLocales(LANGUAGE_EN));
      i18n.changeLanguage(LANGUAGE_EN);
    } else {
      dispatch(changeLocales(LANGUAGE_VI));
      i18n.changeLanguage(LANGUAGE_VI);
    }
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <>
              <p>user.name</p>
              <p>user.email</p>
              <p>{t("header.customer_code")}: user?.userId</p>
            </>
          ),
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: <>{t("header.number_doing_test")}: 2</>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="/account/profile">{t("header.account_manager")}</Link>
          ),
          key: "2",
        },
        {
          label: <Link to="/account/profile">{t("header.profile_info")}</Link>,
          key: "3",
        },
        {
          label: <a onClick={Logout}>{t("header.logout")}</a>,
          key: "4",
          danger: true,
        },
      ]}
    />
  );

  return (
    <Row align="middle" wrap={false}>
      <Col flex={2}>
        <Link to="/">Quiz Test</Link>
      </Col>
      <Col flex={4}>
        <Menu
          mode="horizontal"
          selectedKeys={(() => {
            const string = /\/[a-z0-9_-]{0,32}/.exec(location.pathname)[0];
            if (string === "/question-tags") return "/test-categories";
            return string;
          })()}
          defaultSelectedKeys={["/"]}
          items={[
            {
              key: "/",
              label: <Link to="/">{t("header.dashboard")}</Link>,
            },
            {
              key: "/test-categories",
              label: <Link to="/test-categories">{t("header.category")}</Link>,
            },
            {
              key: "/tests",
              label: <Link to="/tests">{t("header.test")}</Link>,
            },
            {
              key: "/test-campaigns",
              label: (
                <Link to="/test-campaigns">{t("header.test_campaign")}</Link>
              ),
            },
            {
              key: "/bank",
              label: <Link to="/bank">{t("header.question_bank")}</Link>,
            },
            {
              key: "/statistic/campaigns",
              label: (
                <Link to="/statistic/campaigns">{t("header.statistic")}</Link>
              ),
            },
          ]}
        />
      </Col>
      <Col>
        <Button type="link" onClick={() => handleClick(language)}>
          {t("header.language")} <img src={t("header.img")} />
        </Button>
      </Col>
      <Col>
        <Dropdown overlay={menu} placement="bottomRight">
          <a onClick={(e) => e.preventDefault()}>
            <Space>Me</Space>
          </a>
        </Dropdown>
      </Col>

      <BackTop>
        <div className="up">
          <UpOutlined />
        </div>
      </BackTop>

      <div className="guideline-video">
        <Tooltip placement="left" title={t("header.user_manual")}>
          <a href="https://www.youtube.com">
            <YoutubeFilled />
          </a>
        </Tooltip>
      </div>
    </Row>
  );
}

export default HeaderPage;
