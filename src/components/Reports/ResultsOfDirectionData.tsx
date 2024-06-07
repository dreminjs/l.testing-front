import { Typography } from '@material-tailwind/react'
import { FC, useMemo } from 'react'

import { IReportOfDirection } from '@/types/report.types'

interface DataProps {
	data: IReportOfDirection[] | undefined
}

const ResultsOfDirectionData: FC<DataProps> = ({ data }) => {
	const groupedData = useMemo(() => {
		const groups = new Map()

		data?.forEach(({ test }) => {
			const directionName = test?.testDirection.directionName
			if (directionName) {
				groups.set(directionName, (groups.get(directionName) || 0) + 1)
			}
		})

		return Array.from(groups, ([directionName, count]) => ({
			directionName,
			count
		}))
	}, [data])

	if (!data || data.length === 0) {
		return null
	}

	return (
		<>
			{!data || data.length === 0
				? null
				: groupedData.map(({ directionName, count }) => (
						<tr
							className='even:bg-blue-gray-50/50 '
							key={directionName}
						>
							<td className='p-4 text-center'>
								<Typography
									variant='small'
									color='blue-gray'
									className='font-medium'
								>
									{directionName}
								</Typography>
							</td>
							<td className='p-4 text-center'>
								<Typography
									variant='small'
									color='blue-gray'
									className='font-medium'
								>
									{count || 0}
								</Typography>
							</td>
						</tr>
					))}
		</>
	)
}

export default ResultsOfDirectionData
