import {
	Button,
	Card,
	Checkbox,
	Input,
	Option,
	Select,
	Textarea,
	Typography
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { TypeUserForm } from '@/types/user.types'

import CustomLoader from '../CustomLoader'

import { useGetUser, useUpdateUser } from '@/queries/user.queries'
import useAuth from '@/shared/hooks/useAuth'
import { EditResumeModal } from '../Resume/EditResumeModel'

const EditChallengerForm = () => {
	const { id } = useParams()
	const { user, isLoading, refetch } = useGetUser(id)
	const { user: useUser } = useAuth()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control
	} = useForm<TypeUserForm>({ mode: 'onChange' })

	const { update } = useUpdateUser()

	useEffect(() => {
		reset({
			lastName: user?.lastName,
			firstName: user?.firstName,
			middleName: user?.middleName,
			email: user?.email,
			phoneNumber: user?.phoneNumber,
			hasChildren: user?.hasChildren,
			maritalStatus: user?.maritalStatus,
			isMilitaryId: user?.isMilitaryId,
			resume: user?.resume
		})
	}, [user, reset])

	const [isModalOpen,setIsModalOpen] = useState(false)

	const handleUpdate = async (id: string | undefined, data: TypeUserForm) => {
		await update({
			id,
			data
		})
		refetch()
		reset()
	}

	const handleOpenModal = () => setIsModalOpen(true)

	const handleCloseModal = () => setIsModalOpen(false)
	
	if (isLoading) return <CustomLoader />
	return (
		<>
		<Card
			className=''
			color='transparent'
			shadow={false}
		>
			{useUser?.roleId !== 2 ? (
				<>
					<Typography
						variant='h4'
						color='blue-gray'
						className='text-center'
					>
						Форма изменения претендента
					</Typography>
				</>
			) : (
				<>
					<Typography
						variant='h4'
						color='blue-gray'
						className='text-center'
					>
						Форма изменения профиля
					</Typography>
				</>
			)}

			<form
				onSubmit={handleSubmit(data => handleUpdate(id, data))}
				className='mt-4 mb-2 px-4 sm:px-0 w-full max-w-screen-lg'
			>
				<div className='mb-1 flex flex-col gap-6'>
					<Input
						label='Фамилия'
						size='md'
						defaultValue={user?.lastName}
						placeholder={user?.lastName}
						{...register('lastName', {
							required: { message: 'Обязательное поле', value: true },
							minLength: { message: 'Минимальная длина 3 символа', value: 3 },
							maxLength: {
								message: 'Максимальная длина 30 символов',
								value: 30
							}
						})}
					/>
					{errors.lastName && <span>{errors?.lastName?.message}</span>}

					<Input
						label='Имя'
						size='md'
						defaultValue={user?.firstName}
						placeholder={user?.firstName}
						{...register('firstName', {
							required: { message: 'Обязательное поле', value: true },
							minLength: { message: 'Минимальная длина 3 символа', value: 3 },
							maxLength: {
								message: 'Максимальная длина 30 символов',
								value: 30
							}
						})}
					/>
					{errors.firstName && <span>{errors?.firstName?.message}</span>}

					<Input
						label='Отчество'
						size='md'
						defaultValue={user?.middleName}
						placeholder={user?.middleName}
						{...register('middleName', {
							required: false,
							minLength: { message: 'Минимальная длина 3 символа', value: 3 }
						})}
					/>

					<Input
						label='Email'
						size='md'
						defaultValue={user?.email}
						placeholder={user?.email}
						{...register('email', {
							required: { message: 'Обязательное поле', value: true },
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
					{errors.email && <span>{errors?.email?.message}</span>}

					<Input
						label='Номер телефона'
						size='lg'
						defaultValue={user?.phoneNumber}
						placeholder={user?.phoneNumber}
						type="tel"
						{...register('phoneNumber', {
							required: { message: 'Обязательное поле', value: true },
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
					{errors.phoneNumber && <span>{errors?.phoneNumber?.message}</span>}

					<div>
						<Checkbox
							color='teal'
							label='	Есть ли дети?'
							{...register('hasChildren')}
						/>{' '}
						<Checkbox
							color='teal'
							label={'Есть ли военный билет?'}
							{...register('isMilitaryId')}
						/>
					</div>

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
								defaultValue={user?.maritalStatus}
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
						<span>{errors?.maritalStatus?.message}</span>
					)}

				<Button
					color='teal'
					className='mt-6'
					fullWidth
					onClick={handleOpenModal}
				>
					{
						user?.resume?.about ? "Открыть резюме" : "Добавить резюме"
					}
				</Button>
				</div>

				<Button
					color='teal'
					className='mt-6'
					fullWidth
					type='submit'
				>
					Изменить
				</Button>
			</form>
		</Card>
		<EditResumeModal
			isOpen={isModalOpen}
			onClose={handleCloseModal}
		/>
	</>
	)
}

export default EditChallengerForm
