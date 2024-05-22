import {
	Button,
	Card,
	Checkbox,
	Input,
	Textarea,
	Typography
} from '@material-tailwind/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { TypeUserForm } from '@/types/user.types'

import CustomLoader from '../CustomLoader'

import { useGetUser, useUpdateUser } from '@/queries/user.queries'
import useAuth from '@/shared/hooks/useAuth'

const EditChallengerForm = () => {
	const { id } = useParams()
	const { user, isLoading, refetch } = useGetUser(id)
	const { user: useUser } = useAuth()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TypeUserForm>()

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

	const handleUpdate = async (id: string | undefined, data: TypeUserForm) => {
		await update({
			id,
			data
		})
		refetch()
		reset()
	}
	if (isLoading) return <CustomLoader />
	return (
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
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.lastName && <span>{errors?.lastName?.message}</span>}

					<Input
						label='Имя'
						size='md'
						defaultValue={user?.firstName}
						placeholder={user?.firstName}
						{...register('firstName', {
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.firstName && <span>{errors?.firstName?.message}</span>}

					<Input
						label='Отчество'
						size='md'
						defaultValue={user?.middleName}
						placeholder={user?.middleName}
						{...register('middleName', {
							required: false
						})}
					/>

					<Input
						label='Email'
						size='md'
						defaultValue={user?.email}
						placeholder={user?.email}
						{...register('email', {
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.email && <span>{errors?.email?.message}</span>}

					<Input
						label='Номер телефона'
						size='lg'
						defaultValue={user?.phoneNumber}
						placeholder={user?.phoneNumber}
						{...register('phoneNumber', {
							required: { message: 'Обязательное поле', value: true }
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

					<Input
						label='Семейное положение'
						size='lg'
						defaultValue={user?.maritalStatus}
						placeholder={user?.maritalStatus}
						{...register('maritalStatus', {
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.maritalStatus && (
						<span>{errors?.maritalStatus?.message}</span>
					)}

					<Textarea
						label='Резюме'
						size='lg'
						defaultValue={user?.resume}
						placeholder={user?.resume}
						{...register('resume')}
					/>
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
	)
}

export default EditChallengerForm
