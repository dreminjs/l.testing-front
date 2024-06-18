import Cookies from 'js-cookie'

import { IAuthResponse } from '@/types/auth.types'

import { LOCAL_STORAGE_KEY, TOKENS } from '../constants/enums'

export const getAccessToken = async () => {
	const accessToken = Cookies.get(TOKENS.ACCESS_TOKEN)

	return accessToken || null
}

export const saveTokensToStorage = (accessToken: string) => {
	
	const res = Cookies.set(TOKENS.ACCESS_TOKEN, accessToken, {
		// domain: 'localhost', 
		sameSite: 'strict',
		
		expires: 1
	})
	console.log(res)
}

export const removeFromStorage = () => {
	Cookies.remove(TOKENS.ACCESS_TOKEN)
	localStorage.removeItem(LOCAL_STORAGE_KEY.USER)
}
export const saveToStorage = (data: IAuthResponse) => {
	saveTokensToStorage(data.accessToken)
	localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(data.user))
}
