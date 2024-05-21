import { Button, Card } from '@material-tailwind/react'
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
	if (isLoading) return <CustomLoader />
	return (
		<>
			<div className='flex justify-end mb-2'>
				<Button
					color='teal'
					onClick={() => navigate(PAGE_URLS.ADD_TEST_DIRECTION)}
				>
					Добавить
				</Button>
			</div>

			<Card className='h-full w-full rounded-md overflow-x-auto	 overflow-y-auto'>
				<table className='w-full min-w-max table-auto text-left'>
					<thead>
						<TableHeads data={TestDirectionHeads} />
					</thead>
					<tbody>
						<TestDirectionData
							data={testDirections}
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
