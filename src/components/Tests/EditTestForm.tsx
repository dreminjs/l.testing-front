import { TrashIcon } from '@heroicons/react/24/solid'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Input,
	Option,
	Select,
	Typography
} from '@material-tailwind/react'
import { format } from 'date-fns'
import { PlusCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { TypeAnswerForm } from '@/types/answer.types'
import { TypeQuestionForm } from '@/types/question.types'
import { TypeTestForm } from '@/types/test.types'

import CustomLoader from '../CustomLoader'

import { useCreateAnswer, useDeleteAnswer } from '@/queries/answer.queries'
import {
	useCreateQuestion,
	useDeleteQuestion
} from '@/queries/question.queries'
import { useGetTestDirections } from '@/queries/test-direction.queries'
import { useGetTest, useUpdateTest } from '@/queries/test.queries'
import { InputFileUpload } from '@/shared/components/InputUploadFile'

const EditTestForm = () => {
	const { id } = useParams()

	const { testDirections } = useGetTestDirections()

	const { test, refetch, isLoading } = useGetTest(id)
	const { update } = useUpdateTest()

	const {
		handleSubmit: updateTest,
		register: updateTestRegister,
		reset: updateTestReset,
		control,
		formState: { errors: updateTestErrors }
	} = useForm<TypeTestForm>({
		defaultValues: { timeLimit: test?.timeLimit },
		mode: 'onChange'
	})

	const handleUpdateTest = async (
		id: string | undefined,
		data: TypeTestForm
	) => {

		console.log(data.photo)

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

		await update({
			id,
			data: formData
		})
	}
	useEffect(() => {
		if (test) {
			const formattedTest = {
				...test,
				directionId: test.directionId,
				timeLimit: test.timeLimit
			}
			updateTestReset(formattedTest as any)
		}
	}, [test, updateTestReset])

	const { remove: removeQuestion } = useDeleteQuestion()

	const { create: createQuestion } = useCreateQuestion()

	const handleDeleteQuestion = async (id: any) => {
		await removeQuestion(id)
		refetch()
	}

	const {
		handleSubmit: submitQuestion,
		register: questionRegister,
		reset: questionReset
		// formState: { errors: questionErrors }
	} = useForm<TypeQuestionForm>()

	const handleCreateQuestion = async (
		// data: TypeQuestionForm & TypeTestContentForm
		data: TypeQuestionForm
	) => {

		await createQuestion({
			...data,
			testId: Number(id)
		})
		// const questionResponse = await createQuestion(data)
		// const questionId = questionResponse.id
		// const testId = id
		// await createContent({ questionId, testId: Number(testId) })
		questionReset()
		refetch()
	}

	//answer
	const {
		handleSubmit: submitAnswer,
		register: answerRegister,
		reset: answerReset,
		formState: { errors: answerErrors }
	} = useForm<TypeAnswerForm>()

	const { create: createAnswer } = useCreateAnswer()

	const { remove: removeAnswer } = useDeleteAnswer()

	const handleCreateAnswer = async (
		questionId: number | undefined,
		data: TypeAnswerForm
	) => {
		await createAnswer({
			content: data.content,
			isCorrect:data.isCorrect,
			questionId: Number(questionId)
		})
		// const answerResponse = await createAnswer({
		// 	...data,
		// 	questionId: Number(questionId)
		// })
		// const answerId = answerResponse.id
		// await createContent({ questionId, answerId, testId: Number(id) })
		answerReset()
		refetch()
	}

	const handleDeleteAnswer = async (id: string | number) => {
		await removeAnswer(id)
		refetch()
	}

	const [open, setOpen] = useState(0)

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

	const handleOpen = (value: number) => setOpen(open === value ? 0 : value)

	if (isLoading) return <CustomLoader />

	return (
		<>
			<div className='flex flex-wrap md:flex-nowrap  '>
				<div className='flex-auto w-full md:w-1/2 p-4'>
					<Card className='w-full'>
						<CardHeader
							variant='gradient'
							color='indigo'
							className='mb-4 grid h-12 place-items-center'
						>
							<Typography
								variant='h3'
								color='white'
							>
								Изменение теста
							</Typography>
						</CardHeader>
						<form onSubmit={updateTest(data => handleUpdateTest(id, data))}>
							<CardBody className='flex flex-col gap-4'>
								<Controller
									control={control}
									name='directionId'
									render={({ field: { onChange, value, ...field } }) => (
										<Select
											{...field}
											value={String(value)}
											label='Выберите направление'
											onChange={onChange}
										>
											{testDirections?.map(({ id, directionName }) => (
												<Option
													key={id}
													value={String(id)}
												>
													{directionName || undefined}
												</Option>
											))}
										</Select>
									)}
								/>

								{photo && (
									<img
										className='h-[250px] w-[350px] block mx-auto border-2 h-full object-cover'
										src={photo}
										alt=''
									/>
								)}
								{!photo && test?.photo && (
									<img
										className='h-[250px] w-[350px] block mx-auto border-2 h-full object-cover'
										src={`http://localhost:8077/${test?.photo}`}
										alt=''
									/>
								)}
								<InputFileUpload
									register={updateTestRegister}
									onChangePhoto={handleChangePhoto}
								/>
								{answerErrors.photo && answerErrors?.photo?.message}

								<Input
									label='Название теста'
									size='lg'
									{...updateTestRegister('title', {
										required: { message: 'Обязательное поле', value: true },
										minLength: {
											message: 'Минимальная длина 6 символов',
											value: 6
										},
										maxLength: {
											message: 'Максимальная длина 255 символа',
											value: 255
										}
									})}
								/>
								{updateTestErrors.title && updateTestErrors?.title?.message}
								<Input
									{...updateTestRegister('thresholdValue', {
										required: { message: 'Обязательное поле', value: true }
									})}
									type='number'
									label='Введите количество баллов для прохождения'
									min={1}
									size='lg'
								/>
								{updateTestErrors.thresholdValue &&
									updateTestErrors?.thresholdValue?.message}
								<Input
									{...updateTestRegister('timeLimit', {
										required: { message: 'Обязательное поле', value: true }
									})}
									type='text'
									label='Напишите кол-во минут для прохождения'
									size='lg'
								/>
								{updateTestErrors.timeLimit &&
									updateTestErrors?.timeLimit?.message}
								<Input
									{...updateTestRegister('attemptLimit', {
										required: { message: 'Обязательное поле', value: true }
									})}
									type='number'
									label='Введите лимит попыток'
									min={1}
									size='lg'
								/>
								{updateTestErrors.attemptLimit &&
									updateTestErrors?.attemptLimit?.message}
							</CardBody>
							<CardFooter className='pt-0'>
								<Button
									variant='gradient'
									color='indigo'
									fullWidth
									type='submit'
								>
									Изменить
								</Button>
							</CardFooter>
						</form>
					</Card>
				</div>

				{/* Правая колонка */}
				<div className='flex-auto w-full md:w-1/2 p-4 '>
					<Card className='w-full'>
						<CardHeader
							variant='gradient'
							color='teal'
							className='mb-4 grid h-12 place-items-center'
						>
							<Typography
								variant='h3'
								color='white'
							>
								Вопросы и ответы
							</Typography>
						</CardHeader>
						<CardBody className='flex flex-col gap-4'>
							<form onSubmit={submitQuestion(handleCreateQuestion)}>
								<div className='flex gap-4 items-center'>
									<Input
										type='text'
										label='Введите новый вопрос'
										size='md'
										{...questionRegister('content', {
											required: { message: 'Обязательное поле', value: true }
										})}
									/>

									<button type='submit'>
										<PlusCircleIcon className='cursor-pointer' />
									</button>
								</div>
							</form>

							{test?.questions?.map((question, index) => (
								<div key={question?.id}>
									<div
										onClick={() => handleOpen(index + 1)}
										className='flex justify-between items-center cursor-pointer'
									>
										<Typography variant='h6'>{question?.content}</Typography>
										<div className='flex gap-2'>
											<TrashIcon
												color='red'
												onClick={() => handleDeleteQuestion(question?.id)}
												className='h-5 w-5'
											/>
										</div>
									</div>
									{open === index + 1 && (
										<div className='flex flex-col pt-2'>
											{question?.answers.map(answer => (
												<div
													key={answer.id}
													className='flex justify-between items-center'
												>
													<Typography>
														{answer.content} -{' '}
														<span className='font-bold'>
															{answer.isCorrect ? 'Верный' : 'Неверный'}
														</span>
													</Typography>
													<TrashIcon
														color='red'
														onClick={() => handleDeleteAnswer(answer.id)}
														className='h-5 w-5 mr-6 cursor-pointer'
													/>
												</div>
											))}

											<form
												onSubmit={submitAnswer(data =>
													handleCreateAnswer(question?.id, data)
												)}
											>
												<div className='flex flex-wrap gap-2 pt-2 items-center'>
													<div className='flex-grow min-w-0'>
														<Input
															{...answerRegister('content', { required: true })}
															label='Введите вариант ответа'
															type='text'
															size='md'
														/>
													</div>
													<div className='shrink-0'>
														<Checkbox
															color='teal'
															label='Верный?'
															{...answerRegister('isCorrect', {
																required: false,
																setValueAs: v => v === 'true'
															})}
														/>
													</div>
													<button
														type='submit'
														className='shrink-0'
													>
														<PlusCircleIcon className='cursor-pointer' />
													</button>
												</div>
											</form>
										</div>
									)}
								</div>
							))}
						</CardBody>
					</Card>
				</div>
			</div>
		</>
	)
}

export default EditTestForm
