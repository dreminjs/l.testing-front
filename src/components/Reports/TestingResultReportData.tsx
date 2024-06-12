import { Typography } from '@material-tailwind/react'
import { format } from 'date-fns'
import { FC } from 'react'

import { IResultReport } from '@/types/report.types'

import { formatTime } from '@/shared/utils/formatTime'

interface TestingResultReportDataProps {
	data: IResultReport[] | undefined
}

const TestingResultReportData: FC<TestingResultReportDataProps> = ({
	data
}) => {
	return (
		<>
			{!data || data.length === 0
				? null
				: data.map(
						({
							id,
							user,

							completionTime,
							interviewDate,
							isPassed,
							scoreId,
							test
						}) => (
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
										{user?.maritalStatus}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium text-center'
									>
										{user?.hasChildren ? 'Есть' : 'Нет'}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium text-center'
									>
										{user?.isMilitaryId ? 'Есть' : 'Нет'}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium text-center'
									>
										{test?.testDirection?.directionName}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium text-center'
									>
										{test?.title}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium text-center'
									>
										{`${scoreId} / ${test?.thresholdValue}`}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium text-center'
									>
										{`${format(new Date(completionTime), 'dd.MM.yyyy')}`}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-medium text-center'
									>
										{interviewDate === null
											? '❌'
											: format(new Date(interviewDate), 'dd.MM.yyyy')}
									</Typography>
								</td>
								<td>
									<Typography
										variant='small'
										color='blue-gray'
										className={`font-medium px-2 py-1 inline-block rounded-md ${
											isPassed === true
												? 'bg-green-500 text-white'
												: 'bg-red-500 text-white'
										}`}
									>
										{isPassed === true ? 'Прошёл' : 'Не прошёл'}
									</Typography>
								</td>
							</tr>
						)
					)}
		</>
	)
}

export default TestingResultReportData
