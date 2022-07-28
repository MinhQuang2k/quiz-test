import LayoutWeb from "../components/commons/LayoutWeb";
import Dashboard from "../pages/dashboard/Dashboard";
import TestCategory from "../pages/category/TestCategory";
import LayoutComponent from "../components/commons/LayoutComponent";
import Tests from "../pages/test/Tests";
import TestEdit from "../pages/test/TestEdit";
import TestResult from "../pages/test/TestResult";
import ResultsStatistic from "../pages/testCampaign/DetailResultCampaign";
import TestCampaigns from "../pages/testCampaign/TestCampaigns";
import CreateCampaign from "../pages/testCampaign/CreateCampaign";
import Preview from "../pages/testCampaign/EditCampaign";
import ResultCampaign from "../pages/testCampaign/ResultCampaign";
import QuestionStatistic from "../pages/testCampaign/QuestionStatistic";
import Bank from "../pages/bank/Bank";
import CreateQuestion from "../pages/bank/CreateQuestion";
import Statistic from "../pages/statistic/Statistic";
import TabTestCampaign from "../pages/statistic/TabTestCampaign";
import TabCandidate from "../pages/statistic/TabCandidate";
import TabTest from "../pages/statistic/TabTest";
import ChangePassword from "../pages/account/ChangePassword";
import Account from "../pages/account/Account";
import AccountInfo from "../pages/account/AccountInfo";
import CreateCertificate from "../pages/account/CreateCertificate";
import ManageCertificate from "../pages/account/ManageCertificate";
import DoTest from "../pages/doTest/DoTest";
import JoinTest from "../pages/doTest/JoinTest";
import InfoCollect from "../pages/doTest/InfoCollect";
import HeaderDoTest from "../components/commons/HeaderDoTest";
import Guide from "../pages/doTest/Guide";
import ExamQuestions from "../pages/doTest/ExamQuestions";
import HeaderResult from "../pages/result/HeadResult";
import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";

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
            path: "/account/manage-certificates",
            element: <ManageCertificate />,
          },
          {
            path: "/account/change-password",
            element: <ChangePassword />,
          },
          {
            path: "/account/integrated",
          },
        ],
      },
      {
        path: "/account/manage-certificates/create",
        element: <CreateCertificate />,
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
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
];

// config router https://stackblitz.com/github/remix-run/react-router/tree/main/examples/route-objects?file=src%2FApp.tsx
