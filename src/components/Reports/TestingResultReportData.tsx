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
				: data.map(({ id, directionName }) => (
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
									{directionName || 'Не указано'}
								</Typography>
							</td>
						</tr>
					))}
		</>
	)
}

export default TestingResultReportData
