export const enum BASE_URL {
	BASE_URL = 'http://localhost:8077/'
}

export const enum PAGE_URLS {
	HOME = '/',
	LOGIN = '/auth/login',
	CHALLENGER_REGISTER = '/auth/signup',
	USERS = '/users',
	CHALLENGER_INFO = '/users/challenger-info',
	ADD_MANAGER = '/users/add-manager',
	EDIT_MANAGER = '/users/edit-manager',
	EDIT_CHALLENGER = '/users/edit-challenger',
	TESTS = '/tests',
	TEST_PASSING = '/test-passing',
	ADD_TEST = '/tests/add',
	EDIT_TEST = '/tests/edit',
	RESULTS = '/results',
	EDIT_RESULT = '/results/edit',
	REPORTS = '/reports',
	TEST_DIRECTIONS = '/test-directions',
	ADD_TEST_DIRECTION = '/test-directions/add',
	EDIT_TEST_DIRECTION = '/test-directions/edit'
}

export const enum SERVICE_URLS {
	HOME = '/',
	AUTH = 'auth',
	AUTH_ACCESS_TOKEN = 'auth/login/access-token',
	USERS = 'users',
	TESTS = 'tests',
	TEST_DIRECTIONS = 'test-directions',
	TEST_CONTENTS = 'test-contents',
	QUESTIONS = 'questions',
	RESULTS = 'results',
	ANSWERS = 'answers',
	REPORTS = 'reports',
	RESUME = "resume",
	MAIL = "mail"
}

export const enum TOKENS {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export const enum LOCAL_STORAGE_KEY {
	USER = 'user'
}

export const enum QUERY_KEYS {
	LOGIN = 'login',
	SIGNUP = 'signup',
	CHALLENGER_LOGIN = 'challenger-login',
	CHALLENGER_SIGNUP = 'challenger-signup',
	USERS = 'users',
	TESTS = 'tests',
	TEST_DIRECTIONS = 'test-directions',
	TEST_CONTENTS = 'test-contents',
	QUESTIONS = 'questions',
	RESULTS = 'results',
	ANSWERS = 'answers',
	REPORTS = 'reports'
}
