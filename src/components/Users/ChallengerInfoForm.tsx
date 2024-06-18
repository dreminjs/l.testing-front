import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Typography
} from '@material-tailwind/react'
import { useParams } from 'react-router-dom'

import CustomLoader from '../CustomLoader'

import { useGetUser } from '@/queries/user.queries'
import { useState } from 'react'
import { ResumeInfoModal } from '../Resume/ResumeInfoModal'

const ChallengerInfoForm = () => {
	const { id } = useParams()

	const { user, isLoading } = useGetUser(id)

	const [isResumeModalOpen,setIsResumeModal] = useState(false)
	
	const handleOpenResumeModal = () => setIsResumeModal(true)
	
	const handleCloseResumeModal = () => setIsResumeModal(false)

	if (isLoading) return <CustomLoader />

	return (
		<>
			<Card className='w-96'  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
				<CardHeader
					variant='gradient'
					color='teal'
					className='mb-4 grid h-28 place-items-center' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}				>
					<Typography
						variant='h4'
						color='white'
						className='text-center' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}					>
						{`${user?.lastName} ${user?.firstName} ${user?.middleName || ''}`}
					</Typography>
				</CardHeader>
				<CardBody className='flex flex-col gap-4' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
					<div className='flex justify-between'>
						<Typography
							variant='h6'
							color='black' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}						>
							Email:
						</Typography>
						<span className='font-normal'>{user?.email}</span>
					</div>
					<div className='flex justify-between'>
						<Typography
							variant='h6'
							color='black' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}						>
							Номер телефона:
						</Typography>
						<span className='font-normal'>{user?.phoneNumber}</span>
					</div>
					<div className='flex justify-between'>
						<Typography
							variant='h6'
							color='black' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}						>
							Семейное положение:
						</Typography>
						<span className='font-normal'>{user?.maritalStatus}</span>
					</div>
					<div className='flex justify-between'>
						<Typography
							variant='h6'
							color='black' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}						>
							Наличие детей:
						</Typography>
						<span className='font-normal'>
							{user?.hasChildren ? 'Да' : 'Нет'}
						</span>
					</div>
					<div className='flex justify-between'>
						<Typography
							variant='h6'
							color='black' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}						>
							Наличие военного билета:
						</Typography>
						<span className='font-normal'>
							{user?.isMilitaryId ? 'Да' : 'Нет'}
						</span>
					</div>
					<div className='flex flex-col'>
						<Button onClick={handleOpenResumeModal} color='teal' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Открыть резюме</Button>
					</div>
				</CardBody>
			</Card>
			<ResumeInfoModal
				isOpen={isResumeModalOpen}
				onClose={handleCloseResumeModal}
				userId={id}
			/>
		</>
	)
}

export default ChallengerInfoForm
