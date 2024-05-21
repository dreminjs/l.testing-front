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
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { IChallengerRegister } from '@/types/auth.types'

import { useChallengerRegister } from '@/queries/auth.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

const RegisterForm = () => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IChallengerRegister>()

	const { mutateAsync } = useChallengerRegister()

	const handleRegister = async (data: IChallengerRegister) => {
		await mutateAsync(data)
		reset()
		navigate(PAGE_URLS.HOME)
	}

	return (
		<Card className='w-full sm:w-5/6 md:w-1/2 lg:w-1/3 xl:w-96 mx-auto'>
			<CardHeader
				variant='gradient'
				color='indigo'
				className='mb-4 grid h-28 place-items-center'
			>
				<Typography
					variant='h3'
					color='white'
				>
					Регистрация
				</Typography>
			</CardHeader>
			<form onSubmit={handleSubmit(handleRegister)}>
				<CardBody className='flex flex-col gap-4 p-4'>
					<Input
						label='Фамилия'
						size='lg'
						{...register('lastName', {
							required: true,
							minLength: {
								value: 3,
								message: 'Минимальная длина 3 символа'
							},
							maxLength: {
								value: 30,
								message: 'Максимальная длина 30 символов'
							}
						})}
					/>
					{errors.lastName && (
						<span className='text-base'>Обязательное поле</span>
					)}
					<Input
						label='Имя'
						size='lg'
						{...register('firstName', {
							required: true,
							minLength: {
								value: 3,
								message: 'Минимальная длина 3 символа'
							},
							maxLength: {
								value: 30,
								message: 'Максимальная длина 30 символов'
							}
						})}
					/>
					{errors.firstName && (
						<span className='text-base'>Обязательное поле</span>
					)}
					<Input
						label='Отчество'
						size='lg'
						{...register('middleName', { required: false })}
					/>
					{errors.middleName && (
						<span className='text-sm'>Обязательное поле</span>
					)}
					<Input
						label='Email'
						size='lg'
						{...register('email', {
							required: true,
							minLength: {
								value: 3,
								message: 'Минимальная длина 3 символа'
							},
							maxLength: {
								value: 30,
								message: 'Максимальная длина 30 символов'
							}
						})}
					/>
					{errors.email && <span className='text-sm'>Обязательное поле</span>}
					<Input
						label='Номер телефона'
						size='lg'
						{...register('phoneNumber', { required: true })}
					/>
					{errors.phoneNumber && (
						<span className='text-sm'>Обязательное поле</span>
					)}
					<Input
						label='Семейное положение'
						size='lg'
						{...register('maritalStatus', { required: true })}
					/>
					{errors.maritalStatus && (
						<span className='text-sm'>Обязательное поле</span>
					)}
					<div className=''>
						<Checkbox
							color='indigo'
							label='Наличие детей?'
							{...register('hasChildren')}
						/>
						<Checkbox
							color='indigo'
							label='Наличие военного билета?'
							{...register('isMilitaryId')}
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
						Зарегистрироваться
					</Button>

					<div className='mt-6 flex justify-center text-sm'>
						<span>Уже зарегистрированы?</span>
						<span
							className='ml-1 font-bold cursor-pointer text-indigo-600'
							onClick={() => navigate(`${PAGE_URLS.LOGIN}`, { replace: true })}
						>
							Авторизация
						</span>
					</div>
				</CardFooter>
			</form>
		</Card>
	)
}

export default RegisterForm
