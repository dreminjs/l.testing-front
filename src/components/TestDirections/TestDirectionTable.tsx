import { Button, Card, Option, Select } from '@material-tailwind/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomLoader from '../CustomLoader'
import TableHeads from '../Users/TableHeads'

import TestDirectionData from './TestDirectionData'
import { TestDirectionHeads } from './test-direction-heads'
import {
	useDeleteTestDirection,
	useGetTestDirections
} from '@/queries/test-direction.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

const TestDirectionTable = () => {
	const navigate = useNavigate()
	const { testDirections, refetch, isLoading } = useGetTestDirections()

	const { remove } = useDeleteTestDirection()

	const handleDelete = async (id: number | string) => {
		await remove(id)
		refetch()
	}

	const handleEdit = (id: number | string) => {
		navigate(`${PAGE_URLS.EDIT_TEST_DIRECTION}/${id}`)
	}

	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

	const handleSortOrder = () => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
	}

	const sortedDirections = testDirections?.sort((a, b) => {
		if (a.directionName < b.directionName) return sortOrder === 'asc' ? -1 : 1
		if (a.directionName > b.directionName) return sortOrder === 'asc' ? 1 : -1
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
						onClick={() => navigate(PAGE_URLS.ADD_TEST_DIRECTION)}
					>
						Добавить
					</Button>
				</div>
			</div>

			<Card className='h-full w-full mt-10 rounded-md overflow-x-auto	 overflow-y-auto'>
				<table className='w-full min-w-max table-auto text-left'>
					<thead>
						<TableHeads data={TestDirectionHeads} />
					</thead>
					<tbody>
						<TestDirectionData
							data={sortedDirections}
							onDelete={handleDelete}
							onEdit={handleEdit}
						/>
					</tbody>
				</table>
			</Card>
		</>
	)
}

export default TestDirectionTable
