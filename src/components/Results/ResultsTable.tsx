import { Card, Option, Select } from '@material-tailwind/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomLoader from '../CustomLoader'
import TableHeads from '../Users/TableHeads'

import ResultData from './ResultData'
import { ResultHeads } from './result-heads'
import { useDeleteResult, useGetResults } from '@/queries/result.queries'
import { useGetTestDirections } from '@/queries/test-direction.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

export const ResultsTable = () => {
	const navigate = useNavigate()

	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
	const [directionName, setDirectionName] = useState('')
	const [isPassed, setIsPassed] = useState('')

	const { results, refetch, isLoading } = useGetResults(directionName, isPassed)
	const { testDirections } = useGetTestDirections()
	const { remove } = useDeleteResult()

	const handleDelete = async (id: number | string) => {
		await remove(id)
		refetch()
	}

	const handleEdit = (id: number | string) => {
		navigate(`${PAGE_URLS.EDIT_RESULT}/${id}`)
	}

	const handleInfo = (id: number | string) => {
		navigate(`${PAGE_URLS.CHALLENGER_INFO}/${id}`)
	}

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
							onChange={() =>
								setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
							}
						>
							<Option value='asc'>По возрастанию</Option>
							<Option value='desc'>По убыванию</Option>
						</Select>
					</div>
					<div className='flex-grow'>
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
					<div className='flex-grow'>
						<select
							className='border w-[200px] text-[14px] border-blue-gray-200 text-[#455A64] h-[40px] outline-none p-2 rounded-md'
							value={isPassed}
							onChange={e => setIsPassed(e.target.value)}
						>
							<option value=''>Прошел?</option>
							<option value='true'>Да</option>
							<option value='false'>Нет</option>
						</select>
					</div>
				</div>
			</div>

			<Card className='h-full mt-10 w-full rounded-md overflow-x-auto	 overflow-y-auto'>
				<table className='w-full min-w-max table-auto text-left'>
					<thead>
						<TableHeads data={ResultHeads} />
					</thead>

					<tbody>
						<ResultData
							data={sortedResults}
							onDelete={handleDelete}
							onEdit={handleEdit}
							onInfo={handleInfo}
						/>
					</tbody>
				</table>
			</Card>
		</>
	)
}
