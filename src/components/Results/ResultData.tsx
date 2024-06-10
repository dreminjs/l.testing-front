import {
	IdentificationIcon,
	PencilSquareIcon,
	TrashIcon
} from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'
import { format } from 'date-fns'
import { FC, useState } from 'react'

import { IResult } from '@/types/result.types'
import { MailModal } from '../Mail/MailModal'
import { formatTime } from '@/shared/utils/formatTime'

interface ResultDataProps {
	data: IResult[] | undefined
	onDelete: (id: number | string) => void
	onEdit: (id: number | string) => void
	onInfo: (id: number | string) => void,
	refetch: Function
}

const ResultData: FC<ResultDataProps> = ({
	data,
	onDelete,
	onEdit,
	onInfo,
	refetch
}) => {
	const [isMailModalOpen, setIsMailModalOpen] = useState(false)

	const [userId, setUserId] = useState("")

	const [resultId, setResultId] = useState("")

	const handleOpenMailModal = (e: any) => {
	
		const { userId , resultId } = JSON.parse(e.target.id)

		setUserId(userId)

		setResultId(resultId)
		
		setIsMailModalOpen(true)

	}

	const handleCloseMailModal = () => {
		setUserId('')
		setResultId('')
		setIsMailModalOpen(false)
		refetch()
	}

	return (
		<>
			{!data || data.length === 0
				? null
				: data.map(
						({ id, scoreId, completionTime, interviewDate, user, test,isPassed }) => (
							<tr
								className='even:bg-blue-gray-50/50'
								key={id}
							>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium'
									>
										{`${user?.lastName || ''} ${user?.firstName || 'Не указано'}
										${user?.middleName || ''}`}
									</Typography>
								</td>

								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium'
									>
										{test?.testDirection?.directionName}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium'
									>
										{test?.title}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium'
									>
										{`${scoreId} / ${test?.thresholdValue}`}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium'
									>
										{`${format(new Date(completionTime), 'mm:ss')} / ${formatTime(test?.timeLimit)}`}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										
										className={'font-medium text-center'}
									>
										{
											interviewDate === null ? "❌" : format(new Date(interviewDate), 'dd.MM.yyyy')
										}										
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className={`font-medium px-2 py-1 inline-block rounded-md ${
												isPassed
												? 'bg-green-500 text-white'
												: 'bg-red-500 text-white'
										}`}
									>
										{isPassed
											? 'Прошёл'
											: 'Не прошёл'}
									</Typography>
								</td>
								<td>
									<Button
										color='teal'
										id={JSON.stringify({userId:user.id,resultId:id})}
										onClick={handleOpenMailModal}
										className='block mx-auto'
										disabled={interviewDate === null ? false : true}
									>
										{
											interviewDate === null ? "Пригласить на Собес" : "Приглашен"
										}
										
									</Button>
								</td>
								<td className='p-4 flex justify-end items-center gap-3'>
									{/* <div
										className='inline-block cursor-pointer'
										onClick={() => onEdit(id)}
									>
										<PencilSquareIcon className='h-7 w-7' />
									</div> */}
									<div
										className='inline-block cursor-pointer'
										onClick={() => onInfo(user?.id)}
									>
										<IdentificationIcon
											color='teal'
											className='h-7 w-7'
										/>
									</div>
									<div
										className='inline-block cursor-pointer'
										onClick={() => onDelete(id)}
									>
										<TrashIcon className='h-6 w-6 text-red-600' />
									</div>
								</td>
							</tr>
						)
					)}

			<MailModal
				resultId={resultId}
				userId={userId}
				isOpen={isMailModalOpen}
				onClose={handleCloseMailModal}
			/>
		</>
	)
}

export default ResultData
