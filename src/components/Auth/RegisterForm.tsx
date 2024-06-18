import { yupResolver } from '@hookform/resolvers/yup'
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
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { IChallengerRegister } from '@/types/auth.types'

import { useChallengerRegister } from '@/queries/auth.queries'
import { ResponseMessageModal } from '@/shared/components/ResponseMessageModal'
import { PAGE_URLS } from '@/shared/constants/enums'

const RegisterForm = () => {
	const navigate = useNavigate()

	const schema = yup.object({
		lastName: yup
			.string()
			.required('Это поле обязательно для заполнения')
			.matches(/^[^0-9]*$/, 'Поле не должно содержать цифры')
			.max(100, 'максимум 100 символов!'),
		firstName: yup
			.string()
			.required('Это поле обязательно для заполнения')
			.matches(/^[^0-9]*$/, 'Поле не должно содержать цифры')
			.max(100, 'максимум 100 символов!'),
		middleName: yup
			.string()
			.required('Это поле обязательно для заполнения')
			.matches(/^[^0-9]*$/, 'Поле не должно содержать цифры')
			.required('Это поле обязательно для заполнения')
			.max(100, 'максимум 100 символов!'),
		email: yup
			.string()
			.required('Это поле обязательно для заполнения')
			.max(100, 'максимум 100 символов!')
			.email('введите ваш email!'),
		phoneNumber: yup
			.string()
			.required('Поле обязательно для заполнения')
			.min(6, 'Минимальная длина 6 символов')
			.max(20, 'Максимальная длина 20 символов')
			.matches(
				/^\+375\d{2}\d{3}\d{2}\d{2}$/,
				'Введите номер в формате +375 ## ### ## ##'
			)
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control
	} = useForm<any>({ mode: 'onChange', resolver: yupResolver(schema) })

	const { mutateAsync, isSuccess, isError,isPending } = useChallengerRegister()

	const handleRegister = async (data: IChallengerRegister) => {
		await mutateAsync(data)
		reset()
	}

	const [isModalOpen, setIsModalOpen] = useState(false)

	const [message,setMessage] = useState("")

	useEffect(() => {
		if (isSuccess) {
			setMessage("Вы успешно зарегистрованны!!")
			setIsModalOpen(true)
			const timoutId = setTimeout(() => {
				setMessage("")
				setIsModalOpen(false)
				navigate(PAGE_URLS.HOME)
			}, 3000)	

			return () => clearTimeout(timoutId)
		}
		if(isError){
			setMessage("такой номер или email уже зарегистрованны!")
			setIsModalOpen(true)
			const timoutId = setTimeout(() => {
				setMessage("")
				setIsModalOpen(false)
			}, 3000)	

			return () => clearTimeout(timoutId)
		}
	}, [isError,isSuccess])

	return (
		<>
			<Card className='w-full sm:w-5/6 md:w-1/2 lg:w-1/3 xl:w-96 mx-auto' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
				<CardHeader
					variant='gradient'
					color='indigo'
					className='mb-4 grid h-28 place-items-center' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}				>
					<Typography
						variant='h3'
						color='white' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}					>
						Регистрация
					</Typography>
				</CardHeader>
				<form onSubmit={handleSubmit(handleRegister)}>
					<CardBody className='flex flex-col gap-4 p-4' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
						<Input
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Фамилия'
							size='lg'
							{...register('lastName')}						/>
						{errors.lastName && (
							<span className='text-sm'>{String(errors.lastName.message)}</span>
						)}
						<Input
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Имя'
							size='lg'
							{...register('firstName')}						/>
						{errors.firstName && (
							<span className='text -sm'>{String(errors.firstName.message)}</span>
						)}
						<Input
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Отчество'
							size='lg'
							{...register('middleName', { required: false })}						/>
						{errors.middleName && (
							<span className='text-sm'>{String(errors.middleName.message)}</span>
						)}
						<Input
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Email'
							size='lg'
							{...register('email')}						/>
						{errors.email && (
							<span className='text-sm'>{String(errors.email.message)}</span>
						)}
						<Input
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Номер телефона'
							size='lg'
							placeholder='+375 (29) 999-99-99'
							{...register('phoneNumber')}						/>
						{errors.phoneNumber && (
							<span className='text-sm'>{String(errors.phoneNumber.message)}</span>
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
								placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} {...field}
								value={String(value)}
								label='Выберите семейное положение'
								onChange={onChange}
								error={!!error}								>
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
								onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} color='indigo'
								label='Наличие детей?'
								{...register('hasChildren')}							/>
							<Checkbox
								onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} color='indigo'
								label='Наличие военного билета?'
								{...register('isMilitaryId')}							/>
						</div>
					</CardBody>
					<CardFooter className='pt-0 p-4' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
						<Button
							color='indigo'
							variant='gradient'
							fullWidth
							type='submit' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}						>
							Зарегистрироваться
						</Button>

						<div className='mt-6 flex justify-center text-sm'>
							<span>Уже зарегистрированы?</span>
							<span
								className='ml-1 font-bold cursor-pointer text-indigo-600'
								onClick={() =>
									navigate(`${PAGE_URLS.LOGIN}`, { replace: true })
								}
							>
								Авторизация
							</span>
						</div>
					</CardFooter>
				</form>
			</Card>
			<ResponseMessageModal
				isOpen={isModalOpen}
				onCloseModal={() => setIsModalOpen(false)}
				message={message}
				isError={isError}
				isSuccess={isSuccess}
				isLoading={isPending}
			/>
		</>
	)
}

export default RegisterForm
