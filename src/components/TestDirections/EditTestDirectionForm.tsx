import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { TypeTestDirectionForm } from '@/types/test-direction.types'

import CustomLoader from '../CustomLoader'

import {
	useGetTestDirection,
	useUpdateTestDirection
} from '@/queries/test-direction.queries'

const EditTestDirectionForm = () => {
	const { id } = useParams()
	const { testDirection, isLoading, refetch } = useGetTestDirection(id)
	// const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TypeTestDirectionForm>()

	const { update } = useUpdateTestDirection()

	useEffect(() => {
		reset({ directionName: testDirection?.directionName })
	}, [testDirection, reset])

	const handleUpdate = async (
		id: string | undefined,
		data: TypeTestDirectionForm
	) => {
		await update({ id, data })
		refetch()
		reset()

		// navigate(`${PAGE_URLS.TEST_DIRECTIONS}`, { replace: true })
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
				Форма изменения направления
			</Typography>

			<form
				onSubmit={handleSubmit(data => handleUpdate(id, data))}
				className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
			>
				<div className='mb-1 flex flex-col gap-6'>
					<Input
						label='Название'
						size='lg'
						placeholder='Введите название направления'
						{...register('directionName', {
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.directionName && (
						<span>{errors?.directionName?.message}</span>
					)}
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

export default EditTestDirectionForm
