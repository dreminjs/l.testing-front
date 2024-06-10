import { Button, Option, Select } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomLoader from '../CustomLoader'

import TestItem from './TestItem'
import { useGetTestDirections } from '@/queries/test-direction.queries'
import { useDeleteTest, useGetTests } from '@/queries/test.queries'
import { PAGE_URLS } from '@/shared/constants/enums'
import useAuth from '@/shared/hooks/useAuth'

const TestComponent = () => {
	const navigate = useNavigate()

	const { user } = useAuth()
	const { testDirections } = useGetTestDirections()
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
	const [directionName, setDirectionName] = useState('')

	const handleSortOrder = () => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
	}

	const { tests, refetch, isLoading } = useGetTests(
		user,
		directionName,
		user?.roleId !== 2
	)

	const sortedTests = tests?.sort((a, b) => {
		if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1
		if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1
		return 0
	})

	const { remove } = useDeleteTest()
	const onDelete = async (id: number | string) => {
		await remove(id)
		refetch()
	}

	const onEdit = (id: number | string) => {
		navigate(`${PAGE_URLS.EDIT_TEST}/${id}`)
		refetch()
	}

	useEffect(() => {}, [directionName])

	if (isLoading) return <CustomLoader />
	return (
		<div className='w-full'>
			<div className='flex flex-col-reverse justify-between items-center md:flex-row md:items-end mb-5  md:mb-0'>
				<div className='flex flex-col mt-4 gap-3 sm:flex-row sm:mt-6 sm:justify-between sm:items-center'>
					<div className='flex-grow'>
						<Select
							value={sortOrder}
							onChange={handleSortOrder}
						>
							<Option value='asc'>От А до Я</Option>
							<Option value='desc'>От Я до А</Option>
						</Select>
					</div>
					<div className='flex-grow'>
						<select
							className='border w-[200px] text-[14px] border-blue-gray-200 text-[#455A64] h-[40px] outline-none p-2 rounded-md'
							value={directionName}
							onChange={e => setDirectionName(e.target.value)}
						>
							<option value=''>Все направления</option>
							{testDirections?.map(({ id, directionName }) => (
								<option
									key={id}
									value={directionName}
								>
									{directionName}
								</option>
							))}
						</select>
					</div>
				</div>

				<div>
					{user?.roleId !== 2 && (
						<Button
							color='teal'
							onClick={() => navigate(PAGE_URLS.ADD_TEST)}
						>
							Добавить
						</Button>
					)}
				</div>
			</div>

			<div className='grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6'>
				<TestItem
					onDelete={onDelete}
					onEdit={onEdit}
					data={sortedTests}
				/>
			</div>
		</div>
	)
}

export default TestComponent
