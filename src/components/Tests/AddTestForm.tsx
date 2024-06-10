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
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { TypeTestForm } from '@/types/test.types'

import CustomLoader from '../CustomLoader'

import { useGetTestDirections } from '@/queries/test-direction.queries'
import { useCreateTest } from '@/queries/test.queries'
import { InputFileUpload } from '@/shared/components/InputUploadFile'
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

	const [photo, setPhoto] = useState(null)

	const handleChangePhoto = (e: any) => {
		const file = e.target.files[0]
		if (file) {
			const reader: any = new FileReader()
			reader.onload = () => {
				setPhoto(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	const onSubmit: SubmitHandler<TypeTestForm> = async (data: TypeTestForm) => {
		const formData = new FormData()

		formData.append('accessTime', new Date().toISOString())

		formData.append('attemptLimit', String(data.attemptLimit))

		formData.append('thresholdValue', String(data.thresholdValue))

		formData.append('directionId', String(data.directionId))

		formData.append('timeLimit', String(data.timeLimit))

		formData.append('questions', JSON.stringify(data.questions))

		formData.append('title', data.title)

		formData.append('testDirection', JSON.stringify(data.testDirection))

		formData.append('photo', data.photo[0])

		const test = await create(formData)

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

					{photo && (
						<img
							className='h-[250px] w-[350px] h-full object-cover'
							src={photo}
							alt=''
						/>
					)}

					<InputFileUpload
						register={register}
						onChangePhoto={handleChangePhoto}
					/>
					{errors.photo && errors?.photo?.message}
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
						max={10}
						size='lg'
					/>
					{errors.thresholdValue && errors?.thresholdValue?.message}
					<Input
						{...register('timeLimit', {
							required: { message: 'Обязательное поле', value: true }
						})}
						type='number'
						label='сколько минут дано на задание?'
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
