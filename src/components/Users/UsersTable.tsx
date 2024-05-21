import { Button, Card } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

import CustomLoader from '../CustomLoader'

import TableHeads from './TableHeads'
import UserData from './UserData'
import { UserHeads } from './user-heads'
import { useDeleteUser, useGetUsers } from '@/queries/user.queries'
import { PAGE_URLS } from '@/shared/constants/enums'

const UsersTable = () => {
	const navigate = useNavigate()
	const { users, refetch, isLoading } = useGetUsers()

	const { mutateAsync } = useDeleteUser()

	const handleDelete = async (id: number | string) => {
		await mutateAsync(id)
		refetch()
	}
	if (isLoading) return <CustomLoader />
	return (
		<>
			<div className=' flex justify-end mb-2'>
				<Button
					color='teal'
					onClick={() => navigate(PAGE_URLS.ADD_MANAGER)}
				>
					Добавить
				</Button>
			</div>

			<Card className='h-full w-full rounded-md overflow-x-auto	 overflow-y-auto'>
				<table className='w-full min-w-max table-auto text-left'>
					<thead>
						<TableHeads data={UserHeads} />
					</thead>
					<tbody>
						<UserData
							data={users}
							onDelete={handleDelete}
						/>
					</tbody>
				</table>
			</Card>
		</>
	)
}

export default UsersTable
