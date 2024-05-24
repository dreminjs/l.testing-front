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
import usePrint from '@/shared/hooks/usePrint'

const TestingResultsReport = () => {
	const { results, isLoading } = useGetTestingResultsReport()

	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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
			<div className='flex flex-col-reverse justify-between items-center md:flex-row md:items-end mb-5  md:mb-0'>
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
