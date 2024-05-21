import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Input,
	Typography
} from '@material-tailwind/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { IChallengerLogin, ILogin } from '@/types/auth.types'

import { useChallengerLogin, useLogin } from '@/queries/auth.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

const LoginForm = () => {
	const navigate = useNavigate()
	const [isChallenger, setIsChallenger] = useState(false)
	const [loginError, setLoginError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<any>({ mode: 'onChange' })

	const { login } = useLogin()
	const { challengerLogin } = useChallengerLogin()
	const handleLogin = async (data: ILogin) => {
		try {
			await login(data as ILogin)
		} catch (error) {
			setLoginError('Неверный логин или пароль')
			reset()
		}
	}
	const handleChallengerLogin = async (data: IChallengerLogin) => {
		try {
			await challengerLogin(data as IChallengerLogin)
		} catch (error) {
			setLoginError('Неверный логин или пароль')
			reset()
		}
	}

	return (
		<Card className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:w-96 mx-auto'>
			<CardHeader
				variant='gradient'
				color='indigo'
				className='mb-4 grid h-28 place-items-center'
			>
				<Typography
					variant='h3'
					color='white'
				>
					Авторизация
				</Typography>
			</CardHeader>
			<form
				onSubmit={
					isChallenger
						? handleSubmit(handleChallengerLogin)
						: handleSubmit(handleLogin)
				}
			>
				<CardBody className='flex flex-col gap-4 p-4'>
					{isChallenger ? (
						<>
							<Input
								label='Email'
								size='lg'
								type='email'
								{...register('email', {
									required: {
										value: true,
										message: 'Поле обязательно для заполнения'
									},
									minLength: {
										value: 6,
										message: 'Минимальная длина 6 символов'
									}
								})}
							/>
							{errors.email && (
								<span className='text-base'>{errors?.email?.message}</span>
							)}
						</>
					) : (
						<>
							<Input
								label='Логин'
								size='lg'
								{...register('login', {
									required: {
										value: true,
										message: 'Поле обязательно для заполнения'
									},
									minLength: {
										value: 6,
										message: 'Минимальная длина 6 символов'
									},
									maxLength: {
										value: 20,
										message: 'Максимальная длина 20 символов'
									}
								})}
							/>
							{errors.login && (
								<span className='text-base'>{errors?.login?.message}</span>
							)}
							<Input
								label='Пароль'
								size='lg'
								type='password'
								{...register('password', {
									required: {
										value: true,
										message: 'Поле обязательно для заполнения'
									},
									minLength: {
										value: 6,
										message: 'Минимальная длина 6 символов'
									},
									maxLength: {
										value: 20,
										message: 'Максимальная длина 20 символов'
									}
								})}
							/>
							{errors.password && (
								<span className='text-base'>{errors?.password?.message}</span>
							)}
						</>
					)}

					<div className='-ml-2.5'>
						<Checkbox
							color='indigo'
							onClick={() => setIsChallenger(!isChallenger)}
							label='Войти как претендент'
						/>
					</div>
				</CardBody>
				<CardFooter className='pt-0 p-4'>
					<Button
						color='indigo'
						variant='gradient'
						fullWidth
						type='submit'
					>
						Войти
					</Button>
					{loginError && <span className='text-base'>{loginError}</span>}
					<Typography
						variant='small'
						className='mt-6 flex justify-center'
					>
						Хотите стать претендентом?
						<Typography
							variant='small'
							color='blue-gray'
							className='ml-1 font-bold cursor-pointer text-indigo-600'
							onClick={() =>
								navigate(`${PAGE_URLS.CHALLENGER_REGISTER}`, { replace: true })
							}
						>
							Регистрация
						</Typography>
					</Typography>
				</CardFooter>
			</form>
		</Card>
	)
}
export default LoginForm
