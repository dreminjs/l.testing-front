import { Typography } from '@material-tailwind/react'
import { format } from 'date-fns'
import { FC } from 'react'

import { IResultReport } from '@/types/report.types'

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
									className='font-medium' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
										{`${user?.lastName || ''} ${user?.firstName || 'Не указано'}
										${user?.middleName || ''}`}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
									variant='small'
									color='blue-gray'
									className='font-medium' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
										{user?.maritalStatus}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
									variant='small'
									color='blue-gray'
									className='font-medium text-center' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
										{user?.hasChildren ? 'Есть' : 'Нет'}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
									variant='small'
									color='blue-gray'
									className='font-medium text-center' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
										{user?.isMilitaryId ? 'Есть' : 'Нет'}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
									variant='small'
									color='blue-gray'
									className='font-medium text-center' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
										{test?.testDirection?.directionName}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
									variant='small'
									color='blue-gray'
									className='font-medium text-center' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
										{test?.title}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
									variant='small'
									color='blue-gray'
									className='font-medium text-center' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
										{`${scoreId} / ${test?.thresholdValue}`}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
									variant='small'
									color='blue-gray'
									className='font-medium text-center' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
										{`${format(new Date(completionTime), 'dd.MM.yyyy')}`}
									</Typography>
								</td>
								<td className='p-4'>
									<Typography
									variant='small'
									color='blue-gray'
									className='font-medium text-center'
									onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}	
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
									className={`font-medium px-2 py-1 inline-block rounded-md ${isPassed === true
											? 'bg-green-500 text-white'
											: 'bg-red-500 text-white'}`} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined}									>
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
