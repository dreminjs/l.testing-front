import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ITestDirection } from '@/types/test-direction.types'

import { useCreateTestDirection } from '@/queries/test-direction.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

const AddTestDirectionForm = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ITestDirection>({ mode: 'onChange' })
	const { create } = useCreateTestDirection()
	const handleCreate = async (data: ITestDirection) => {
		await create(data)
		reset()
		navigate(`${PAGE_URLS.TEST_DIRECTIONS}`, { replace: true })
	}

	return (
		<Card
			color='transparent'
			shadow={false} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}		>
			<Typography
				variant='h4'
				color='blue-gray'
				className='text-center' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}			>
				Форма добавления направления
			</Typography>

			<form
				onSubmit={handleSubmit(handleCreate)}
				className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
			>
				<div className='mb-1 flex flex-col gap-6'>
					<Input
						crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label='Название'
						size='lg'
						placeholder='Введите название направления'
						{...register('directionName', {
							required: { message: 'Обязательное поле', value: true },
							minLength: { message: 'Минимальная длина 3 символа', value: 3 },
							maxLength: {
								message: 'Максимальная длина 30 символов',
								value: 30
							}
						})}					/>
					{errors.directionName && (
						<span>{errors?.directionName?.message}</span>
					)}
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

export default AddTestDirectionForm
