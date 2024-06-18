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
				interviewDate: result.interviewDate
					? format(new Date(result.interviewDate), 'yyyy-MM-dd')
					: undefined,
				completionTime: result.completionTime
					? format(new Date(result.completionTime), "yyyy-MM-dd'T'HH:mm")
					: undefined,
				isPassed: result.isPassed,
				scoreId: result.scoreId,
				userId: result.userId,
				testId: result.testId,
				attemptRate: result.attemptRate
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
				scoreId: Number(data.scoreId),
				attemptRate: Number(data.attemptRate)
			}
		})
		refetch()
		reset()
	}
	if (isLoading) return <CustomLoader />
	return (
		<Card
			color='transparent'
			shadow={false} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}		>
			<Typography
				variant='h4'
				color='blue-gray'
				className='text-center font-bold' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}			>
				Форма изменения результата
			</Typography>
			<div className='flex flex-col items-center mt-2 justify-center'>
				<p
					color='blue-gray'
					className='text-center font-normal'
				>
					{`${result?.test.testDirection.directionName}`}
				</p>
				<p
					color='blue-gray'
					className='text-center '
				>
					{`${result?.test.title}`}
				</p>
				<p
					color='blue-gray'
					className='text-center font-normal'
				>
					{`${result?.user.lastName} ${result?.user.firstName} ${result?.user.middleName || ''}`}
				</p>
			</div>
			<form
				onSubmit={handleSubmit(data => handleUpdate(id, data))}
				className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'
			>
				<div className='mb-1 flex flex-col gap-6'>
					<Input
						onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Количество баллов'
						size='lg'
						type='number'
						placeholder='Выберите количество баллов'
						{...register('scoreId', {
							required: { message: 'Обязательное поле', value: true }
						})}					/>
					{errors.scoreId && <span>{errors?.scoreId?.message}</span>}
					<div className='mb-1 flex flex-col gap-6'>
						<Input
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Количество попыток'
							size='lg'
							type='number'
							placeholder='Выберите количество попыток'
							{...register('attemptRate', {
								required: { message: 'Обязательное поле', value: true }
							})}						/>
						{errors.attemptRate && <span>{errors?.attemptRate?.message}</span>}
					</div>

					<Input
						onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Время прохождения'
						size='lg'
						type='datetime-local'
						placeholder='Выберите время прохождения'
						{...register('completionTime', {
							required: { message: 'Обязательное поле', value: true }
						})}					/>
					{errors.completionTime && (
						<span>{errors?.completionTime?.message}</span>
					)}
					<Input
						onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='Дата собеседования'
						size='lg'
						type='date'
						placeholder='Выберите дату собеседования'
						{...register('interviewDate', {
							required: { message: 'Обязательное поле', value: true }
						})}					/>
					{errors.interviewDate && (
						<span>{errors?.interviewDate?.message}</span>
					)}
				</div>

				<Button
					color='teal'
					className='mt-6'
					fullWidth
					type='submit' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}				>
					Изменить
				</Button>
			</form>
		</Card>
	)
}

export default EditResultForm
