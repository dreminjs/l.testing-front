import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
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

interface ITestItemProps {
	data: ITest[] | undefined
	onDelete: (id: number | string) => void
	onEdit: (id: number | string) => void
}

const TestItem: FC<ITestItemProps> = ({ data, onDelete, onEdit }) => {
	const navigate = useNavigate()
	const { user } = useAuth()
	return (
		<>
			{!data || data.length === 0 ? (
				<NoData />
			) : (
				data.map(({ id, title, timeLimit, testDirection, questions }) => (
					<Card
						key={id}
						className='mt-6 max-w-full flex flex-col'
					>
						<CardHeader
							color='blue-gray'
							className='relative'
						>
							{user?.roleId === 2 ? null : (
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
							)}
							<img
								className='w-full h-[150px]  object-cover'
								src='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp'
								alt='card-image'
							/>
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
									<Button
										onClick={() => navigate(`${PAGE_URLS.TEST_PASSING}/${id}`)}
										color='indigo'
									>
										Пройти
									</Button>
									<div className='flex items-center gap-2'>
										<Timer color='indigo' /> {format(timeLimit, 'mm:ss')}
										<CircleHelp color='indigo' /> {questions?.length || 0}
									</div>
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
				))
			)}
		</>
	)
}

export default TestItem
