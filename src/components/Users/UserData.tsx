import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Typography } from '@material-tailwind/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { IUser } from '@/types/user.types'

import { PAGE_URLS } from '@/shared/constants/enums'
import useAuth from '@/shared/hooks/useAuth'

interface IUserDataProps {
	data: IUser[] | undefined
	onDelete: (id: number | string) => void
}

const UserData: FC<IUserDataProps> = ({ data, onDelete }) => {
	const navigate = useNavigate()
	const { user } = useAuth()
	return (
		<>
			{!data || data.length === 0
				? null
				: data.map(
						({
							id,
							login,
							email,
							lastName,
							firstName,
							middleName,
							hasChildren,
							phoneNumber,
							maritalStatus,
							isMilitaryId,
							roleId
						}) =>
							user && user.id !== id ? (
								<tr
									className='even:bg-blue-gray-50/50'
									key={id}
								>
									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{login || 'Не указано'}
										</Typography>
									</td>
									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{email || 'Не указано'}
										</Typography>
									</td>
									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{lastName || 'Не указано'}
										</Typography>
									</td>
									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{firstName || 'Не указано'}
										</Typography>
									</td>
									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{middleName || 'Не указано'}
										</Typography>
									</td>
									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{phoneNumber || 'Не указано'}
										</Typography>
									</td>
									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{hasChildren ? 'Есть' : 'Нет'}
										</Typography>
									</td>
									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{maritalStatus || 'Не указано'}
										</Typography>
									</td>

									<td className='p-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-medium'
										>
											{isMilitaryId ? 'Есть' : 'Нет'}
										</Typography>
									</td>
									<td className='p-4 flex justify-end items-center gap-3'>
										<div
											className='inline-block cursor-pointer'
											onClick={() =>
												roleId === 3
													? navigate(`${PAGE_URLS.EDIT_MANAGER}/${id}`)
													: navigate(`${PAGE_URLS.EDIT_CHALLENGER}/${id}`)
											}
										>
											<PencilSquareIcon className='h-7 w-7' />
										</div>
										<div
											className='inline-block cursor-pointer'
											onClick={() => onDelete(id)}
										>
											<TrashIcon className='h-6 w-6 text-red-600' />
										</div>
									</td>
								</tr>
							) : null
					)}
		</>
	)
}

export default UserData
