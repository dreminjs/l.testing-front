import { Typography } from '@material-tailwind/react'
import { FC } from 'react'

interface ITableHeads {
	data: string[] | undefined
}

const TableHeads: FC<ITableHeads> = ({ data }) => {
	return (
		<tr>
			{data?.map((head, index) => (
				<th
					key={head + index}
					className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
				>
					<Typography
						variant='small'
						color='black'
						className='font-bold  leading-none ' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}					>
						{head}
					</Typography>
				</th>
			))}
		</tr>
	)
}

export default TableHeads
