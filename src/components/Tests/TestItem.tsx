import {
	CheckBadgeIcon,
	PencilSquareIcon,
	TrashIcon
} from '@heroicons/react/24/solid'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography
} from '@material-tailwind/react'
import { format } from 'date-fns'
import { CircleHelp, Timer } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ITest } from '@/types/test.types'

import NoData from '../NoData'

import { PAGE_URLS } from '@/shared/constants/enums'
import useAuth from '@/shared/hooks/useAuth'
import { formatTime } from '@/shared/utils/formatTime'

interface ITestItemProps {
	data: ITest[] | undefined
	onDelete: (id: number | string) => void
	onEdit: (id: number | string) => void
}

const TestItem: FC<ITestItemProps> = ({ data, onDelete, onEdit }) => {
	const navigate = useNavigate()
	const { user } = useAuth()

	console.log(data)

	return (
		<>
			{!data || data.length === 0 ? (
				<NoData />
			) : (
				data.map(
					(
						{
							id,
							title,
							timeLimit,
							testDirection,
							questions,
							attemptLimit,
							results,
							photo
						},
						idx
					) => (
						<Card
							key={id}
							className='mt-6 max-w-full flex flex-col'
						>
							<CardHeader
								color='blue-gray'
								className='relative'
							>
								{user?.roleId === 2 &&
								data?.some(test =>
									test.results.some(
										result => result.isPassed === true && result.testId === id
									)
								) ? (
									<div className='absolute top-0 left-0 p-2 flex gap-3'>
										<CheckBadgeIcon
											color='green'
											className='w-6 h-6'
											aria-hidden='true'
										/>
									</div>
								) : null}
								{user?.roleId !== 2 ? (
									<div className='absolute top-0 right-0 p-2 flex gap-3'>
										<PencilSquareIcon
											className='w-6 h-6 cursor-pointer text-black'
											onClick={() => onEdit(id)}
											aria-hidden='true'
										/>
										<TrashIcon
											className='w-6 h-6 cursor-pointer text-red-600'
											onClick={() => onDelete(id)}
											aria-hidden='true'
										/>
									</div>
								) : null}
								{photo ? (
									<img
										className='w-full h-full object-cover'
										src={`http://localhost:8077/${photo}`}
										alt='card-image'
									/>
								) : (
									<img
										className='w-full h-full object-cover'
										src='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp'
										alt='card-image'
									/>
								)}
							</CardHeader>
							<CardBody className='flex-1'>
								<Typography
									variant='h5'
									color='blue-gray'
									className='mb-2'
								>
									{testDirection.directionName}
								</Typography>
								<div className='flex flex-col space-y-2'>
									<Typography
										className='whitespace-normal break-words'
										title={title}
									>
										{title}
									</Typography>
								</div>
							</CardBody>
							<CardFooter className='pt-0 flex flex-wrap justify-between items-center'>
								{user?.roleId === 2 ? (
									<>
										{data?.some((test, idx) =>
											test.results.some(
												result =>
													result.isPassed === true && result.testId === id
											)
										) ? (
											<>
												<Button
													disabled
													color='indigo'
													className='mb-5'
												>
													Пройдено
												</Button>
												<div className='flex items-center gap-2'>
													<Timer color='indigo' /> {format(timeLimit, 'mm:ss')}
													<CircleHelp color='indigo' /> {questions?.length || 0}
												</div>
											</>
										) : (
											<>
												{
													<Button
														onClick={() =>
															navigate(`${PAGE_URLS.TEST_PASSING}/${id}`)
														}
														color='indigo'
														className='mb-5'
														disabled={
															results[idx]?.scoreId && attemptLimit === 1
																? true
																: false
														}
													>
														{results[idx]?.scoreId && attemptLimit === 1
															? 'вы прошли'
															: 'Пройти'}
													</Button>
												}

												<div className='flex items-center gap-2'>
													<Timer color='indigo' /> {formatTime(timeLimit)}
													<CircleHelp color='indigo' /> {questions?.length || 0}
												</div>
											</>
										)}
									</>
								) : (
									<>
										<div className='flex items-center gap-2'>
											<Timer color='indigo' /> {format(timeLimit, 'mm:ss')}
										</div>
										<div className='flex items-center gap-2'>
											<CircleHelp color='indigo' /> {questions?.length || 0}
										</div>
									</>
								)}
							</CardFooter>
						</Card>
					)
				)
			)}
		</>
	)
}

export default TestItem
