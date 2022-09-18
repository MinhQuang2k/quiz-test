import HeaderDoTest from "../components/commons/HeaderDoTest";
import LayoutComponent from "../components/commons/LayoutComponent";
import LayoutWeb from "../components/commons/LayoutWeb";
import Account from "../pages/account/Account";
import AccountInfo from "../pages/account/AccountInfo";
import ChangePassword from "../pages/account/ChangePassword";
import Auth from "../pages/auth/Auth";
import ForgetPassword from "../pages/auth/ForgetPassword";
import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";
import ResetPassword from "../pages/auth/ResetPassword";
import Bank from "../pages/bank/Bank";
import CreateQuestion from "../pages/bank/CreateQuestion";
import TestCategory from "../pages/category/TestCategory";
import Dashboard from "../pages/dashboard/Dashboard";
import DoTest from "../pages/doTest/DoTest";
import ExamQuestions from "../pages/doTest/ExamQuestions";
import Guide from "../pages/doTest/Guide";
import InfoCollect from "../pages/doTest/InfoCollect";
import JoinTest from "../pages/doTest/JoinTest";
import HeaderResult from "../pages/result/HeadResult";
import Statistic from "../pages/statistic/Statistic";
import TabCandidate from "../pages/statistic/TabCandidate";
import TabTest from "../pages/statistic/TabTest";
import TabTestCampaign from "../pages/statistic/TabTestCampaign";
import TestEdit from "../pages/test/TestEdit";
import TestResult from "../pages/test/TestResult";
import Tests from "../pages/test/Tests";
import CreateCampaign from "../pages/testCampaign/CreateCampaign";
import ResultsStatistic from "../pages/testCampaign/DetailResultCampaign";
import Preview from "../pages/testCampaign/EditCampaign";
import QuestionStatistic from "../pages/testCampaign/QuestionStatistic";
import ResultCampaign from "../pages/testCampaign/ResultCampaign";
import TestCampaigns from "../pages/testCampaign/TestCampaigns";

export const routes = [
  {
    path: "/",
    element: <LayoutWeb />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "/test-categories",
        element: <TestCategory />,
      },
      {
        path: "/question-tags",
        element: <TestCategory />,
      },
      {
        path: "/tests",
        element: <LayoutComponent />,
        children: [
          { index: true, element: <Tests /> },
          {
            path: "/tests/:id/edit",
            element: <TestEdit />,
          },
          {
            path: "/tests/:id/result",
            element: <TestResult />,
          },
        ],
      },
      {
        path: "results/:id",
        element: <ResultsStatistic />,
      },
      {
        path: "/test-campaigns",
        element: <LayoutComponent />,
        children: [
          { index: true, element: <TestCampaigns /> },
          {
            path: "/test-campaigns/create",
            element: <CreateCampaign />,
          },
          {
            path: "/test-campaigns/:id/result",
            element: <ResultCampaign />,
          },
          {
            path: "/test-campaigns/:id/edit",
            element: <Preview />,
          },
          {
            path: "/test-campaigns/:id/question-statistic",
            element: <QuestionStatistic />,
          },
        ],
      },
      {
        path: "/bank",
        element: <LayoutComponent />,
        children: [
          { index: true, element: <Bank /> },
          {
            path: "/bank/create-question",
            element: <CreateQuestion />,
          },
          {
            path: "/bank/question/:id/edit",
            element: <CreateQuestion />,
          },
        ],
      },
      {
        path: "/statistic",
        element: <Statistic />,
        children: [
          {
            path: "/statistic/campaigns",
            element: <TabTestCampaign />,
          },
          {
            path: "/statistic/tests",
            element: <TabTest />,
          },
          {
            path: "/statistic/answer-sheets",
            element: <TabCandidate />,
          },
        ],
      },

      {
        path: "/account",
        element: <Account />,
        children: [
          {
            path: "/account/profile",
            element: <AccountInfo />,
          },
          {
            path: "/account/change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
  {
    path: "/do-test",
    element: <DoTest />,
    children: [
      { index: true, element: <JoinTest /> },
      {
        path: "/do-test/info-collect",
        element: <InfoCollect />,
      },
    ],
  },
  {
    path: "/do-test-in-single",
    element: <HeaderDoTest />,
    children: [
      { index: true, element: <Guide /> },
      {
        path: "/do-test-in-single/exam-question",
        element: <ExamQuestions />,
      },
    ],
  },
  {
    path: "/result",
    element: <HeaderResult />,
  },
  {
    path: "/login",
    element: <Auth />,
    children: [{ index: true, element: <LoginForm /> }],
  },
  {
    path: "/register",
    element: <Auth />,
    children: [{ index: true, element: <RegisterForm /> }],
  },
  {
    path: "/forget-password/",
    element: <Auth />,
    children: [{ index: true, element: <ForgetPassword /> }],
  },
  {
    path: "/reset-password/",
    element: <Auth />,
    children: [{ index: true, element: <ResetPassword /> }],
  },
];

// config router https://stackblitz.com/github/remix-run/react-router/tree/main/examples/route-objects?file=src%2FApp.tsx
