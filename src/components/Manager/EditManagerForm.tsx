import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { TypeUserForm } from '@/types/user.types'

import CustomLoader from '../CustomLoader'

import { useGetUser, useUpdateUser } from '@/queries/user.queries'

const EditManagerForm = () => {
	const { id } = useParams()
	const { user, isLoading } = useGetUser(id)
	// const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TypeUserForm>()

	const { update } = useUpdateUser()

	useEffect(() => {
		reset({ login: user?.login })
	}, [user, reset])

	const handleUpdate = async (id: string | undefined, data: TypeUserForm) => {
		await update({ id, data })
		reset()
		// navigate(`${PAGE_URLS.USERS}`, { replace: true })
	}
	if (isLoading) return <CustomLoader />
	return (
		<Card
			color='transparent'
			shadow={false}
		>
			<Typography
				variant='h4'
				color='blue-gray'
				className='text-center'
			>
				Форма изменения менеджера
			</Typography>

			<form
				onSubmit={handleSubmit(data => handleUpdate(id, data))}
				className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
			>
				<div className='mb-1 flex flex-col gap-6'>
					<Input
						label='Логин'
						size='lg'
						defaultValue={user?.login}
						placeholder={user?.login}
						{...register('login', {
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.login && <span>{errors?.login?.message}</span>}

					<Input
						label='Пароль'
						size='lg'
						type='password'
						placeholder='Введите пароль'
						{...register('password')}
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
export default EditManagerForm
