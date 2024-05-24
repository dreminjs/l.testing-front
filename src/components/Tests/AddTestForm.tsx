import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Option,
	Select,
	Typography
} from '@material-tailwind/react'
import { ArrowRight } from 'lucide-react'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { TypeTestForm } from '@/types/test.types'

import CustomLoader from '../CustomLoader'

import { useGetTestDirections } from '@/queries/test-direction.queries'
import { useCreateTest } from '@/queries/test.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

const AddTestForm: FC = () => {
	const navigate = useNavigate()
	const { testDirections, isLoading } = useGetTestDirections()
	const { create } = useCreateTest()
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<TypeTestForm>()

	const onSubmit: SubmitHandler<TypeTestForm> = async (data: TypeTestForm) => {
		const test = await create({
			...data,
			accessTime: new Date(),
			attemptLimit: Number(data.attemptLimit),
			thresholdValue: Number(data.thresholdValue),
			directionId: Number(data.directionId)
		})
		if (test && test.id) navigate(`${PAGE_URLS.EDIT_TEST}/${test.id}`)
	}
	if (isLoading) return <CustomLoader />
	return (
		<Card className='w-96 '>
			<CardHeader
				variant='gradient'
				color='indigo'
				className='mb-4 grid h-12 place-items-center'
			>
				<Typography
					variant='h3'
					color='white '
					className='text-center'
				>
					Добавление теста
				</Typography>
			</CardHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardBody className='flex flex-col gap-4'>
					<Controller
						control={control}
						rules={{
							required: { message: 'Обязательное поле', value: true }
						}}
						name='directionId'
						render={({
							field: { onChange, value, ...field },
							fieldState: { error }
						}) => (
							<Select
								{...field}
								value={String(value)}
								label='Выберите направление'
								onChange={onChange}
								error={!!error}
							>
								{testDirections?.map(({ id, directionName }) => (
									<Option
										key={id}
										value={String(id)}
									>
										{directionName}
									</Option>
								))}
							</Select>
						)}
					/>
					{errors.directionId && errors?.directionId?.message}
					<Input
						{...register('title', {
							required: { message: 'Обязательное поле', value: true },
							minLength: { message: 'Минимальная длина 6 символов', value: 6 },
							maxLength: {
								message: 'Максимальная длина 255 символа',
								value: 255
							}
						})}
						label='Введите название теста'
						size='lg'
					/>
					{errors.title && errors?.title?.message}
					<Input
						{...register('thresholdValue', {
							required: { message: 'Обязательное поле', value: true }
						})}
						type='number'
						label='Введите количество баллов для прохождения'
						min={1}
						size='lg'
					/>
					{errors.thresholdValue && errors?.thresholdValue?.message}
					<Input
						{...register('timeLimit', {
							required: { message: 'Обязательное поле', value: true }
						})}
						type='datetime-local'
						label='Выберите время на прохождение'
						min={new Date().toISOString().slice(0, 16)}
						size='lg'
					/>
					{errors.timeLimit && errors?.timeLimit?.message}
					<Input
						{...register('attemptLimit', {
							required: { message: 'Обязательное поле', value: true }
						})}
						type='number'
						label='Введите лимит попыток'
						min={1}
						size='lg'
					/>
					{errors.attemptLimit && errors?.attemptLimit?.message}
				</CardBody>
				<CardFooter className='pt-0 flex justify-end'>
					<Button
						color='indigo'
						variant='gradient'
						className=' flex justify-end items-center'
						type='submit'
					>
						Далее
						<ArrowRight className=' ml-2 w-4 h-4' />
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}

export default AddTestForm
