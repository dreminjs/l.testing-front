import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Input,
	Option,
	Select,
	Typography
} from '@material-tailwind/react'
import { Controller, useForm } from 'react-hook-form'
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
		formState: { errors },
		control
	} = useForm<IChallengerRegister>({ mode: 'onChange' })

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
						placeholder='+375 (29) 999-99-99'
						{...register('phoneNumber', {
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
							},
							pattern: {
								value: /^\+375\d{2}\d{3}\d{2}\d{2}$/,
								message: 'Введите номер в формате +375 ## ### ## ##'
							}
						})}
					/>
					{errors.phoneNumber && (
						<span className='text-sm'>Обязательное поле</span>
					)}

					<Controller
						control={control}
						name='maritalStatus'
						rules={{ required: 'Обязательное поле' }}
						render={({
							field: { onChange, value, ...field },
							fieldState: { error }
						}) => (
							<Select
								{...field}
								value={String(value)}
								label='Выберите семейное положение'
								onChange={onChange}
								error={!!error}
							>
								<Option value='Никогда не состоял (-а)'>
									Никогда не состоял (-а)
								</Option>
								<Option value='Состоит в зарегистрированном браке'>
									Состоит в зарегистрированном браке
								</Option>
								<Option value='Состоит в незарегистрированном браке'>
									Состоит в незарегистрированном браке
								</Option>
								<Option value='Вдова (вдовец)'>Вдова (вдовец)</Option>
								<Option value='Разведен (-а)'>Разведен (-а)</Option>
								<Option value='Разошёлся (разошлась)'>
									Разошёлся (разошлась)
								</Option>
							</Select>
						)}
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
