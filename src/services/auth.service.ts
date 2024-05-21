import {
	IAuthResponse,
	IChallengerLogin,
	IChallengerRegister,
	ILogin,
	IRegister
} from '@/types/auth.types'

import instance from '@/shared/api/api.instance.ts'
import { SERVICE_URLS } from '@/shared/constants/enums.ts'
import {
	saveToStorage,
	saveTokensToStorage
} from '@/shared/helpers/auth.helper.ts'

export const AuthService = {
	async login(data: ILogin) {
		const response = await instance.post<IAuthResponse>(
			`${SERVICE_URLS.AUTH}/login`,
			data
		)
		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},

	async register(data: IRegister) {
		const response = await instance.post<IAuthResponse>(
			`${SERVICE_URLS.AUTH}/signup`,
			data
		)
		return response.data
	},

	async challengerLogin(data: IChallengerLogin) {
		const response = await instance.post<IAuthResponse>(
			`${SERVICE_URLS.AUTH}/challenger-login`,
			data
		)
		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},

	async challengerRegister(data: IChallengerRegister) {
		const response = await instance.post<IAuthResponse>(
			`${SERVICE_URLS.AUTH}/challenger-signup`,
			data
		)

		return response.data
	},

	async getNewTokens() {
		const response = await instance.post<IAuthResponse>(
			`${SERVICE_URLS.AUTH}/login/access-token`
		)

		if (response.data.accessToken)
			saveTokensToStorage(response.data.accessToken)

		return response
	}
}
