import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { IRegister } from '@/types/auth.types'

import { useRegister } from '@/queries/auth.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

const AddManagerForm = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IRegister>()
	const { mutateAsync } = useRegister()
	const handleCreate = async (data: IRegister) => {
		await mutateAsync({ ...data, roleId: 3 })
		reset()
		navigate(`${PAGE_URLS.USERS}`, { replace: true })
	}

	return (
		<Card
			color='transparent'
			shadow={false} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}		>
			<Typography
				variant='h4'
				color='blue-gray'
				className='text-center'  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}			>
				Форма добавления менеджера
			</Typography>

			<form
				onSubmit={handleSubmit(handleCreate)}
				className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
			>
				<div className='mb-1 flex flex-col gap-6'>
					<Input
						crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label='Логин'
						size='lg'
						placeholder='Введите логин'
						{...register('login', {
							required: {
								message: 'Обязательное поле',
								value: true
							},
							minLength: {
								message: 'Минимальная длина 3 символа',
								value: 3
							},
							maxLength: {
								message: 'Максимальная длина 20 символов',
								value: 20
							}
						})}					/>
					{errors.login && <span>{errors?.login?.message}</span>}

					<Input
						crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label='Пароль'
						size='lg'
						placeholder='Введите пароль'
						type='password'
						{...register('password', {
							required: { message: 'Обязательное поле', value: true },
							minLength: {
								message: 'Минимальная длина 6 символа',
								value: 3
							},
							maxLength: {
								message: 'Максимальная длина 30 символов',
								value: 20
							}
						})}					/>
					{errors.password && <span>{errors?.password?.message}</span>}
				</div>

				<Button
					color='teal'
					className='mt-6'
					fullWidth
					type='submit' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}				>
					Добавить
				</Button>
			</form>
		</Card>
	)
}
export default AddManagerForm
