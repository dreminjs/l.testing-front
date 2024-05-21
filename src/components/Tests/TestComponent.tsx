import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

import CustomLoader from '../CustomLoader'

import TestItem from './TestItem'
import { useDeleteTest, useGetTests } from '@/queries/test.queries'
import { PAGE_URLS } from '@/shared/constants/enums'
import useAuth from '@/shared/hooks/useAuth'

const TestComponent = () => {
	const navigate = useNavigate()
	const { tests, refetch, isLoading } = useGetTests()
	const { user } = useAuth()

	const { remove } = useDeleteTest()
	const onDelete = async (id: number | string) => {
		await remove(id)
		refetch()
	}

	const onEdit = (id: number | string) => {
		navigate(`${PAGE_URLS.EDIT_TEST}/${id}`)
		refetch()
	}
	if (isLoading) return <CustomLoader />
	return (
		<div className='w-full'>
			<div className='flex flex-row-reverse mb-5 mr-6'>
				{user?.roleId !== 2 && (
					<Button
						color='teal'
						onClick={() => navigate(PAGE_URLS.ADD_TEST)}
					>
						Добавить
					</Button>
				)}
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6'>
				<TestItem
					onDelete={onDelete}
					onEdit={onEdit}
					data={tests}
				/>
			</div>
		</div>
	)
}

export default TestComponent
