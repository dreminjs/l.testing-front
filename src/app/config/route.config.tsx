import LoginPage from '@/pages/Auth/LoginPage'
import RegisterPage from '@/pages/Auth/RegisterPage'
import HomePage from '@/pages/Home/HomePage'
import AddManagerPage from '@/pages/Manager/AddManager/AddManagerPage'
import EditManagerPage from '@/pages/Manager/EditManager/EditManagerPage'
import TestingResultsReportPage from '@/pages/Report/TestingResultsReportPage'
import EditResultPage from '@/pages/Result/EditResultPage'
import ResultsPage from '@/pages/Result/ResultsPage'
import AddTestPage from '@/pages/Test/AddTestPage'
import EditTestPage from '@/pages/Test/EditTestPage'
import TestPassingPages from '@/pages/Test/TestPassingPages'
import TestsPage from '@/pages/Test/TestsPage'
import AddTestDirectionPage from '@/pages/TestDirection/AddTestDirectionPage'
import EditTestDirectionPage from '@/pages/TestDirection/EditTestDirectionPage'
import TestDirectionsPage from '@/pages/TestDirection/TestDirectionsPage'
import ChallengerInfoPage from '@/pages/Users/ChallengerInfoPage'
import EditChallengerPage from '@/pages/Users/EditChallengerPage'
import UsersPage from '@/pages/Users/UsersPage'
import { PAGE_URLS } from '@/shared/constants/enums'

export const routeConfig = [
	{
		path: PAGE_URLS.HOME,
		element: <HomePage />
	},
	{
		path: PAGE_URLS.LOGIN,
		element: <LoginPage />
	},
	{
		path: PAGE_URLS.CHALLENGER_REGISTER,
		element: <RegisterPage />
	},
	{
		path: PAGE_URLS.USERS,
		element: <UsersPage />
	},
	{
		path: `${PAGE_URLS.CHALLENGER_INFO}/:id`,
		element: <ChallengerInfoPage />
	},
	{
		path: `${PAGE_URLS.EDIT_CHALLENGER}/:id`,
		element: <EditChallengerPage />
	},
	{
		path: PAGE_URLS.ADD_MANAGER,
		element: <AddManagerPage />
	},
	{
		path: `${PAGE_URLS.EDIT_MANAGER}/:id`,
		element: <EditManagerPage />
	},
	{
		path: PAGE_URLS.TESTS,
		element: <TestsPage />
	},
	{
		path: `${PAGE_URLS.TEST_PASSING}/:id`,
		element: <TestPassingPages />
	},
	{
		path: PAGE_URLS.TEST_DIRECTIONS,
		element: <TestDirectionsPage />
	},
	{
		path: PAGE_URLS.ADD_TEST_DIRECTION,
		element: <AddTestDirectionPage />
	},
	{
		path: `${PAGE_URLS.EDIT_TEST_DIRECTION}/:id`,
		element: <EditTestDirectionPage />
	},
	{
		path: PAGE_URLS.ADD_TEST,
		element: <AddTestPage />
	},
	{
		path: `${PAGE_URLS.EDIT_TEST}/:id`,
		element: <EditTestPage />
	},
	{
		path: PAGE_URLS.RESULTS,
		element: <ResultsPage />
	},

	{
		path: `${PAGE_URLS.EDIT_RESULT}/:id`,
		element: <EditResultPage />
	},
	{
		path: `${PAGE_URLS.REPORTS}/get-results`,
		element: <TestingResultsReportPage />
	}
]
