import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
	IChallengerLogin,
	IChallengerRegister,
	ILogin,
	IRegister
} from '@/types/auth.types'

import { AuthService } from '@/services/auth.service'
import { QUERY_KEYS, SERVICE_URLS } from '@/shared/constants/enums'
import useAuth from '@/shared/hooks/useAuth.ts'

export const useLogin = () => {
	const navigate = useNavigate()
	const { setUser } = useAuth()
	const { mutateAsync: login,isPending,isError,isSuccess } = useMutation({
		mutationKey: [`${QUERY_KEYS.LOGIN}`],
		mutationFn: (data: ILogin) => AuthService.login(data),
		onSuccess: ({ data }) => {
			if (data) {
				setUser(data.user)

				navigate(`${SERVICE_URLS.HOME}`, { replace: true })
			}
		}
	})
	return { login,logingIsPending:isPending,logingIsError:isError,logingIsSuccess:isSuccess }
}

export const useRegister = () => {
	return useMutation({
		mutationKey: [`${QUERY_KEYS.SIGNUP}`],
		mutationFn: (data: IRegister) => AuthService.register(data)
	})
}

export const useChallengerLogin = () => {
	const navigate = useNavigate()
	const { setUser } = useAuth()
	const { mutateAsync: challengerLogin,isSuccess,isError,isPending } = useMutation({
		mutationKey: [`${QUERY_KEYS.CHALLENGER_LOGIN}`],
		mutationFn: (data: IChallengerLogin) => AuthService.challengerLogin(data),
		onSuccess: ({ data }) => {
			if (data) {
				setUser(data.user)
				navigate(`${SERVICE_URLS.HOME}`, { replace: true })
			}
		}
	})
	return { challengerLogin,isSuccess,isError,isPending }
}

export const useChallengerRegister = () => {
	return useMutation({
		mutationKey: [`${QUERY_KEYS.CHALLENGER_SIGNUP}`],
		mutationFn: (data: IChallengerRegister) =>
			AuthService.challengerRegister(data)
	})
}
