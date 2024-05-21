import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { TypeResultForm } from '@/types/result.types'

import CustomLoader from '../CustomLoader'

import { useGetResult, useUpdateResult } from '@/queries/result.queries'

const EditResultForm = () => {
	const { id } = useParams()
	const { result, refetch, isLoading } = useGetResult(id)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TypeResultForm>()

	const { update } = useUpdateResult()

	useEffect(() => {
		if (result) {
			const formattedResult = {
				...result,
				interviewDate: result.interviewDate
					? format(new Date(result.interviewDate), 'yyyy-MM-dd')
					: undefined,
				completionTime: result.completionTime
					? format(new Date(result.completionTime), "yyyy-MM-dd'T'HH:mm")
					: undefined
			}
			reset(formattedResult as any)
		}
	}, [result, reset])

	const handleUpdate = async (id: string | undefined, data: TypeResultForm) => {
		await update({
			id,
			data: {
				...data,
				interviewDate: new Date(data.interviewDate),
				completionTime: new Date(data.completionTime),
				scoreId: Number(data.scoreId)
			}
		})
		refetch()
		reset()
	}
	if (isLoading) return <CustomLoader />
	return (
		<Card
			className='mt-28'
			color='transparent'
			shadow={false}
		>
			<Typography
				variant='h4'
				color='blue-gray'
				className='text-center'
			>
				Форма изменения результата
			</Typography>

			<form
				onSubmit={handleSubmit(data => handleUpdate(id, data))}
				className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
			>
				<div>
					<Typography
						variant='h6'
						color='blue-gray'
						className='text-center'
					>
						{`${result?.user.lastName} ${result?.user.firstName} ${result?.user.middleName || ''}`}
					</Typography>
					<Typography
						variant='h6'
						color='blue-gray'
						className='text-center'
					>
						{`${result?.test.testDirection.directionName}`}
					</Typography>
					<Typography
						variant='h6'
						color='blue-gray'
						className='text-center'
					>
						{`${result?.test.title}`}
					</Typography>
				</div>
				<div className='mb-1 flex flex-col gap-6'>
					<Input
						label='Количество баллов'
						size='lg'
						type='number'
						placeholder='Выберите количество баллов'
						{...register('scoreId', {
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.scoreId && <span>{errors?.scoreId?.message}</span>}

					<Input
						label='Время прохождения'
						size='lg'
						type='datetime-local'
						placeholder='Выберите время прохождения'
						{...register('completionTime', {
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.completionTime && (
						<span>{errors?.completionTime?.message}</span>
					)}
					<Input
						label='Дата собеседования'
						size='lg'
						type='date'
						placeholder='Выберите дату собеседования'
						{...register('interviewDate', {
							required: { message: 'Обязательное поле', value: true }
						})}
					/>
					{errors.interviewDate && (
						<span>{errors?.interviewDate?.message}</span>
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

export default EditResultForm
