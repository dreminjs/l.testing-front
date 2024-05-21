import { Card } from '@material-tailwind/react'
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
	if (isLoading) return <CustomLoader />
	return (
		<>
			<Card className='h-full w-full rounded-md overflow-x-auto	 overflow-y-auto'>
				<table className='w-full min-w-max table-auto text-left'>
					<thead>
						<TableHeads data={ResultHeads} />
					</thead>
					<tbody>
						<ResultData
							data={results}
							onDelete={handleDelete}
							onEdit={handleEdit}
						/>
					</tbody>
				</table>
			</Card>
		</>
	)
}
