import { Card, Option, Select } from '@material-tailwind/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomLoader from '../CustomLoader'
import TableHeads from '../Users/TableHeads'

import ResultData from './ResultData'
import { ResultHeads } from './result-heads'
import { useDeleteResult, useGetResults } from '@/queries/result.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

export const ResultsTable = () => {
	const navigate = useNavigate()
	const { results, refetch, isLoading } = useGetResults()

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

	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

	const handleSortOrder = () => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
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
							onChange={handleSortOrder}
						>
							<Option value='asc'>По возрастанию</Option>
							<Option value='desc'>По убыванию</Option>
						</Select>
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
