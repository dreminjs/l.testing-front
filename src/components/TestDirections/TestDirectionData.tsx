import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Typography } from '@material-tailwind/react'
import { FC } from 'react'

import { ITestDirection } from '@/types/test-direction.types'

interface ITestDirectionDataProps {
	data: ITestDirection[] | undefined
	onDelete: (id: number | string) => void
	onEdit: (id: number | string) => void
}

const TestDirectionData: FC<ITestDirectionDataProps> = ({
	data,
	onDelete,
	onEdit
}) => {
	return (
		<>
			{!data || data.length === 0
				? null
				: data.map(({ id, directionName }) => (
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
									{directionName || 'Не указано'}
								</Typography>
							</td>
							<td className='p-4 flex justify-end items-center gap-3'>
								<div
									className='inline-block cursor-pointer'
									onClick={() => onEdit(id)}
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
					))}
		</>
	)
}

export default TestDirectionData
