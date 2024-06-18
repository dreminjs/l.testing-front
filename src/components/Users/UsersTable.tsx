import { Button, Card, Option, Select } from '@material-tailwind/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomLoader from '../CustomLoader'

import TableHeads from './TableHeads'
import UserData from './UserData'
import { UserHeads } from './user-heads'
import { useDeleteUser, useGetUsers } from '@/queries/user.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

const UsersTable = () => {
	const navigate = useNavigate()
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
	const [maritalStatus, setMaritalStatus] = useState<string>('')
	const [hasChildren, setHasChildren] = useState<string>('')
	const [hasMilitaryId, setHasMilitaryId] = useState<string>('')
	const { users, refetch, isLoading } = useGetUsers(
		maritalStatus,
		hasChildren,
		hasMilitaryId
	)

	const { mutateAsync } = useDeleteUser()

	const handleDelete = async (id: number | string) => {
		await mutateAsync(id)
		refetch()
	}

	const sortedUsers = users?.sort((a:any, b:any) => {
		if (a.lastName < b.lastName) return sortOrder === 'asc' ? -1 : 1
		if (a.lastName > b.lastName) return sortOrder === 'asc' ? 1 : -1
		return 0
	})

	const resetFilters = () => {
		setSortOrder("asc")
		setMaritalStatus("")
		setHasChildren("")
		setHasMilitaryId("")
	}

	if (isLoading) return <CustomLoader />
	return (
		<>
			<div className='flex flex-col-reverse justify-between items-center md:flex-row md:items-end mb-5  md:mb-0'>
				<div className='flex flex-col mt-4 gap-3 sm:flex-row sm:mt-6 sm:justify-between sm:items-center flex-wrap'>
					<div className='flex-grow'>
						<Select
							value={sortOrder}
							onChange={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}						>
							<Option value='asc'>от А до Я</Option>
							<Option value='desc'>от Я до А</Option>
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
							value={hasMilitaryId}
							onChange={e => setHasMilitaryId(e.target.value)}
						>
							<option value=''>Есть ли военный билет?</option>

							<option value='true'>Есть</option>
							<option value='false'>Нет</option>
						</select>
					</div>
					<div>
					<Button color='teal' onClick={resetFilters} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							Сбросить все фильтры
					</Button>
				</div>
				</div>

				<div>
					<Button
						color='teal'
						onClick={() => navigate(PAGE_URLS.ADD_MANAGER)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}					>
						Добавить
					</Button>
				</div>
				
			</div>

			<Card className='h-full mt-10 w-full rounded-md overflow-x-auto	 overflow-y-auto' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
				<table className='w-full min-w-max table-auto text-left'>
					<thead>
						<TableHeads data={UserHeads} />
					</thead>
					<tbody>
						<UserData
							data={sortedUsers}
							onDelete={handleDelete}
						/>
					</tbody>
				</table>
			</Card>
		</>
	)
}

export default UsersTable
