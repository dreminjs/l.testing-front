import {
	Button,
	Card,
	Option,
	Select,
	Typography
} from '@material-tailwind/react'
import { useState } from 'react'

import CustomLoader from '../CustomLoader'
import TableHeads from '../Users/TableHeads'

import TestingResultReportData from './TestingResultReportData'
import { TestingResultsReportHeads } from './testing-results-report-heads'
import { useGetTestingResultsReport } from '@/queries/report.queries'
import { useGetTestDirections } from '@/queries/test-direction.queries'
import usePrint from '@/shared/hooks/usePrint'

const TestingResultsReport = () => {
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
	const [directionName, setDirectionName] = useState('')
	const [isPassed, setIsPassed] = useState('')
	const [maritalStatus, setMaritalStatus] = useState('')
	const [hasChildren, setHasChildren] = useState('')
	const [isMilitaryId, setIsMilitaryId] = useState('')
	const { testDirections } = useGetTestDirections()
	const { results, isLoading } = useGetTestingResultsReport(
		isPassed,
		directionName,
		maritalStatus,
		hasChildren,
		isMilitaryId
	)

	const handleSortOrder = () => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
	}

	const { handlePrint, printRef } = usePrint()
	const sortedResults = results?.sort((a, b) => {
		if (a.completionTime < b.completionTime) return sortOrder === 'asc' ? -1 : 1
		if (a.completionTime > b.completionTime) return sortOrder === 'asc' ? 1 : -1
		return 0
	})
	if (isLoading) return <CustomLoader />
	return (
		<>
			<div className='flex flex-col-reverse justify-between items-center md:flex-row md:items-end mb-5 md:mb-0'>
				<div className='flex flex-col mt-4 gap-3 sm:flex-row sm:mt-6 sm:justify-between sm:items-center'>
					<div className='flex-grow'>
						<Select
							value={sortOrder}
							onChange={handleSortOrder}
						>
							<Option value='asc'>По возрастанию</Option>
							<Option value='desc'>По убыванию</Option>
						</Select>
					</div>
					<div>
						<select
							className='border w-[200px] text-[14px] border-blue-gray-200 text-[#455A64] h-[40px] outline-none p-2 rounded-md'
							value={maritalStatus}
							onChange={e => setMaritalStatus(e.target.value)}
						>
							<option value=''>Семейное положение</option>
							<option value='Никогда не состоял (-а)'>
								Никогда не состоял (-а)
							</option>
							<option value='Состоит в зарегистрированном браке'>
								Состоит в зарегистрированном браке
							</option>
							<option value='Состоит в незарегистрированном браке'>
								Состоит в незарегистрированном браке
							</option>
							<option value='Вдова (вдовец)'>Вдова (вдовец)</option>
							<option value='Разведен (-а)'>Разведен (-а)</option>
							<option value='Разошёлся (разошлась)'>
								Разошёлся (разошлась)
							</option>
						</select>
					</div>
					<div>
						<select
							className='border w-[200px] text-[14px] border-blue-gray-200 text-[#455A64] h-[40px] outline-none p-2 rounded-md'
							value={hasChildren}
							onChange={e => setHasChildren(e.target.value)}
						>
							<option value=''>Есть ли дети?</option>

							<option value='true'>Есть</option>
							<option value='false'>Нет</option>
						</select>
					</div>
					<div>
						<select
							className='border w-[200px] text-[14px] border-blue-gray-200 text-[#455A64] h-[40px] outline-none p-2 rounded-md'
							value={isMilitaryId}
							onChange={e => setIsMilitaryId(e.target.value)}
						>
							<option value=''>Есть ли военный билет?</option>

							<option value='true'>Есть</option>
							<option value='false'>Нет</option>
						</select>
					</div>
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
						onClick={handlePrint}
					>
						Печать
					</Button>
				</div>
			</div>

			<Card className='h-full mt-10 w-full rounded-md overflow-x-auto	 overflow-y-auto'>
				<div ref={printRef}>
					<Typography
						className='mb-4'
						variant='h4'
					>
						Отчет по результатам тестирования
					</Typography>
					<table className='w-full min-w-max table-auto text-left'>
						<thead>
							<TableHeads data={TestingResultsReportHeads} />
						</thead>

						<tbody>
							<TestingResultReportData data={sortedResults} />
						</tbody>
					</table>
				</div>
			</Card>
		</>
	)
}

export default TestingResultsReport
