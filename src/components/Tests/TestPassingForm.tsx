import { Button, Card } from '@material-tailwind/react'
import { format } from 'date-fns'
import { ArrowRight, BarChart, StarIcon, TimerIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { TypeResultForm } from '@/types/result.types'

import CustomLoader from '../CustomLoader'
import { useCreateResult } from '@/queries/result.queries'
import { useGetTest } from '@/queries/test.queries'
import useAuth from '@/shared/hooks/useAuth'

const TestPassingForm = () => {
	const { id } = useParams()
	const { user } = useAuth()
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [answers, setAnswers] = useState<{ [questionId: string]: string }>({})
	const [testCompleted, setTestCompleted] = useState(false)

	const [testResult, setTestResult] = useState({
		correct: 0,
		incorrect: 0
	})
	const [testScore, setTestCore] = useState(0)
	const { test, isLoading } = useGetTest(id)

	const [startTime, setStartTime] = useState<Date | null>(null)
	const [elapsedTime, setElapsedTime] = useState<number>(0)
	const { create } = useCreateResult()

	const { handleSubmit } = useForm<any>()

	useEffect(() => {
		if (test && !startTime) {
			const start = new Date()
			localStorage.setItem('testStartTime', start.toISOString())
			setStartTime(start)
		}
	}, [test, startTime])

	useEffect(() => {
		let timerInterval = null
		if (!startTime) {
			const storedStartTime = localStorage.getItem('testStartTime')
			if (storedStartTime) {
				setStartTime(new Date(storedStartTime))
			}
		}

		if (startTime && !testCompleted) {
			timerInterval = setInterval(() => {
				const now = new Date()
				setElapsedTime(now.getTime() - startTime.getTime())
			}, 1000)
		}
		return () => {
			if (timerInterval) clearInterval(timerInterval)
		}
	}, [startTime, testCompleted])

	const userResults = user?.tests
		?.map(t => t.results)
		.flat()
		.filter(r => r.testId === Number(id))
	const [attemptRate, setAttemptRate] = useState(0)

	const a = userResults?.find(r => r.attemptRate)

	const onSubmit = async (data: TypeResultForm) => {
		const endTime = new Date()
		console.log(endTime?.getTime() - startTime.getTime())
		const duration = startTime ? endTime.getTime() - startTime.getTime() : 0
		const completionTime = new Date()
		const result = test?.questions?.reduce(
			(acc, question) => {
				const answerId = answers[question.id]
				const answer = question.answers.find(a => a.id.toString() === answerId)
				if (answer?.isCorrect) {
					acc.correct += 1
				} else {
					acc.incorrect += 1
				}
				return acc
			},
			{ correct: 0, incorrect: 0 }
		)

		const pointsPerQuestion = test?.thresholdValue / test?.questions.length

		const correctAnswersCount = result?.correct ?? 0

		const score = Math.round(correctAnswersCount * pointsPerQuestion)

		setTestCore(score)
		
		setTestResult(prevResult => ({
			...prevResult,
			correct: result?.correct ?? 0,
			incorrect: result?.incorrect ?? 0
		}))

		await create({
			...data,
			scoreId: score,
			// interviewDate: new Date(),
			testId: Number(id),
			completionTime: completionTime,
			userId: user?.id as number,
			isPassed: duration / 1000 <= (test?.timeLimit * 60) && score >= test?.thresholdValue ? true : false,
			attemptRate: data.attemptRate ? Number(data.attemptRate) : 0
		})
		localStorage.removeItem('testStartTime')
		setTestCompleted(true)
	}

	const handleSelectAnswer = (questionId: string, answerId: string) => {
		setAnswers(prevAnswers => ({
			...prevAnswers,
			[questionId]: answerId
		}))
	}
	const handleNextQuestion = () => {
		if (currentQuestionIndex < test?.questions?.length - 1) {
			setCurrentQuestionIndex(prevIndex => prevIndex + 1)
		} else {
			handleSubmit(onSubmit)()
		}
	}
	const currentQuestion = test?.questions[currentQuestionIndex]
	if (isLoading) return <CustomLoader />

	if (testCompleted) {
		return (
			<Card className='max-w-md mx-auto mt-10 p-10 text-center'>
				<h2 className='text-3xl sm:text-4xl font-bold text-teal-600'>
					Результаты теста
				</h2>
				<p className='text-[16px] sm:text-[16px] mt-4'>
					{test?.testDirection.directionName}
				</p>
				<p className='text-lg sm:text-xl '>{test?.title}</p>
				<div>
					<img
						className='w-32 sm:w-48 md:w-64 mx-auto'
						src='https://static.vecteezy.com/system/resources/previews/009/225/006/original/champion-winners-trophy-icon-the-golden-cup-flat-illustration-symbol-of-victory-vector.jpg'
						alt='Трофей'
					/>

					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-2'>
							<StarIcon
								color='teal'
								className='w-6 h-6'
							/>
							{testScore}/{test?.thresholdValue}
						</div>
						{/* <div className='flex items-center gap-2'>
							<BarChart color='teal' />
							{attemptRate}
						</div> */}

						<div className='flex items-center gap-2'>
							<TimerIcon color='teal' />
							{format(new Date(elapsedTime), 'mm:ss')}
						</div>
					</div>
				</div>
				<div className='flex justify-between items-center flex-wrap'>
					<div className='mt-6 flex-1'>
						<h3 className='text-xl sm:text-2xl font-semibold'>Правильно</h3>
						<p className='text-3xl sm:text-5xl text-green-500'>
							{testResult.correct}
						</p>
					</div>
					<div className='mt-6 flex-1'>
						<h3 className='text-xl sm:text-2xl font-semibold'>Неправильно</h3>
						<p className='text-3xl sm:text-5xl text-red-500'>
							{testResult.incorrect}
						</p>
					</div>
				</div>
			</Card>
		)
	}

	return (
		<Card className='min-w-[400px] mx-auto p-4 '>
			<div className='flex justify-between'>
				{test?.testDirection.directionName}

				<div className='flex items-center gap-2'>
					<TimerIcon color='teal' />
					{format(new Date(elapsedTime), 'mm:ss')}
				</div>
			</div>
			<h1 className='text-3xl font-bold mb-4'>{test?.title}</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6'
			>
				<div className='flex flex-col'>
					<div className='flex justify-between items-center'>
						<label className='mb-2 text-lg font-semibold w-[250px]'>
							{currentQuestion?.content}
						</label>
						{currentQuestionIndex + 1}/{test?.questions.length}
					</div>
					{currentQuestion?.answers.map(answer => (
						<div
							key={answer.id}
							className='flex items-center gap-2'
						>
							<input
								className='w-4 h-4 cursor-pointer'
								type='radio'
								value={answer.id}
								id={`answer_${answer.id}`}
								checked={answers[currentQuestion.id] === answer.id.toString()}
								onChange={() =>
									handleSelectAnswer(
										currentQuestion.id.toString(),
										answer.id.toString()
									)
								}
							/>
							<label
								htmlFor={`answer_${answer.id}`}
								className='select-none cursor-pointer'
							>
								{answer.content}
							</label>
						</div>
					))}
				</div>
				<div className='pt-0 flex justify-end'>
					<Button
						color='teal'
						type='button'
						className=' flex justify-end items-center'
						onClick={handleNextQuestion}
					>
						{currentQuestionIndex < test?.questions?.length - 1
							? 'Далее'
							: 'Завершить'}
						<ArrowRight className=' ml-2 w-4 h-4' />
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default TestPassingForm
