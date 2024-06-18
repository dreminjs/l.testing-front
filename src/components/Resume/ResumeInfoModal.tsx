import { Box, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useEffect} from 'react'

import { useGetResume } from '@/queries/resume.queries'

export const ResumeInfoModal = ({
	isOpen,
	onClose,
	userId
}: {
	isOpen: boolean
	onClose: () => void
	userId?: string
}) => {
	const { data, refetch } = useGetResume(userId)
	
	useEffect(() => {
		if (userId) {
			refetch()
		}
	}, [userId])

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
		>
			<Box className={`bg-white w-1/2 mx-auto my-[55px] p-5 rounded-xl`}>
				<Typography
					variant='h6'
					color='blue-gray'
					className='text-center mb-5'
				>
					Резюме
				</Typography>
				{data?.about ? (
					<div>
						{data?.photo && (
							<img
								src={`http://localhost:8077/${data?.photo}`}
								className='h-[250px] w-[350px] mb-5 object-cover'
								alt=''
							/>
						)}
						<p>о себе : {data?.about}</p>
						<p>возраст : {data?.age} лет</p>
						<p>опыт : {data?.experience}</p>
						<p>желаемая зп : {data?.desiredSalary} рублей</p>
					</div>
				) : (
					<p className='text-center mt-5'>пользователь пока еще не добавил резюме :(</p>
				)}
			</Box>
		</Modal>
	)
}
