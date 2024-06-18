import { Button, Card, Typography } from '@material-tailwind/react'
import { useState } from 'react'

import CustomLoader from '../CustomLoader'

import ResultsOfDirectionData from './ResultsOfDirectionData'
import { useGetResultsOfDirection } from '@/queries/report.queries'
import { useGetTestDirections } from '@/queries/test-direction.queries'
import usePrint from '@/shared/hooks/usePrint'

const ResultsOfDirectionReport = () => {
	const [directionName, setDirectionName] = useState('')

	const { testDirections } = useGetTestDirections()
	const { results, isLoading } = useGetResultsOfDirection(directionName)

	// const handleSortOrder = () => {
	// 	setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
	// }

	const { handlePrint, printRef } = usePrint()
	// const sortedResults = results?.sort((a, b) => {
	// 	if (a.test.testDirection.directionName < b.test.testDirection.directionName)
	// 		return sortOrder === 'asc' ? -1 : 1
	// 	if (a.test.testDirection.directionName > b.test.testDirection.directionName)
	// 		return sortOrder === 'asc' ? 1 : -1
	// 	return 0
	// })

	if (isLoading) return <CustomLoader />

	return (
		<>
			<div className='flex flex-col-reverse justify-between items-center md:flex-row md:items-end mb-5 md:mb-0'>
				<div className='flex flex-col mt-4 gap-3 sm:flex-row sm:mt-6 sm:justify-between sm:items-center'>
					{/* <div className='flex-grow'>
						<Select
							value={sortOrder}
							onChange={handleSortOrder}
						>
							<Option value='asc'>По возрастанию</Option>
							<Option value='desc'>По убыванию</Option>
						</Select>
					</div> */}

					<div>
						<select
							className='border w-[200px] text-[14px] border-blue-gray-200 text-[#455A64] h-[40px] outline-none p-2 rounded-md'
							value={directionName}
							onChange={e => setDirectionName(e.target.value)}
						>
							<option value=''>Все направления</option>
							{testDirections?.map(td => (
								<option
									key={td.id}
									value={td.directionName}
								>
									{td.directionName}
								</option>
							))}
						</select>
					</div>
				</div>
				<div>
					<Button
						color='teal'
						onClick={handlePrint} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}					>
						Печать
					</Button>
				</div>
			</div>

			<Card className='h-full mt-10 w-full rounded-md overflow-x-auto	 overflow-y-auto' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
				<div ref={printRef}>
					<Typography
						className='mb-4'
						variant='h4' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}					>
						Отчет по количеству опрошенных по направлению
					</Typography>
					<span>Всего опрошенных: {results?.length}</span>
					<table className='w-full min-w-max table-auto text-left'>
						<thead>
							<th className='border-b text-center text-black font-bold	 border-blue-gray-100 bg-blue-gray-50 p-4'>
								Название направления
							</th>
							<th className='border-b text-center  text-black font-bold	 border-blue-gray-100 bg-blue-gray-50 p-4'>
								Количество опрошенных
							</th>
						</thead>

						<tbody>
							<ResultsOfDirectionData data={results} />
						</tbody>
					</table>
				</div>
			</Card>
		</>
	)
}

export default ResultsOfDirectionReport
