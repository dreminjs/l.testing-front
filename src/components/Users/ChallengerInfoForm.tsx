import {
	Card,
	CardBody,
	CardHeader,
	Textarea,
	Typography
} from '@material-tailwind/react'
import { useParams } from 'react-router-dom'

import CustomLoader from '../CustomLoader'

import { useGetUser } from '@/queries/user.queries'

const ChallengerInfoForm = () => {
	const { id } = useParams()
	const { user, isLoading } = useGetUser(id)
	if (isLoading) return <CustomLoader />
	return (
		<Card className='w-96'>
			<CardHeader
				variant='gradient'
				color='teal'
				className='mb-4 grid h-28 place-items-center'
			>
				<Typography
					variant='h4'
					color='white'
				>
					{`${user?.lastName} ${user?.firstName} ${user?.middleName || ''}`}
				</Typography>
			</CardHeader>
			<CardBody className='flex flex-col gap-4'>
				<div className='flex justify-between'>
					<Typography
						variant='h6'
						color='black'
					>
						Email:
					</Typography>
					<span className='font-normal'>{user?.email}</span>
				</div>
				<div className='flex justify-between'>
					<Typography
						variant='h6'
						color='black'
					>
						Номер телефона:
					</Typography>
					<span className='font-normal'>{user?.phoneNumber}</span>
				</div>
				<div className='flex justify-between'>
					<Typography
						variant='h6'
						color='black'
					>
						Семейное положение:
					</Typography>
					<span className='font-normal'>{user?.maritalStatus}</span>
				</div>
				<div className='flex justify-between'>
					<Typography
						variant='h6'
						color='black'
					>
						Наличие детей?:
					</Typography>
					<span className='font-normal'>
						{user?.hasChildren ? 'Да' : 'Нет'}
					</span>
				</div>
				<div className='flex justify-between'>
					<Typography
						variant='h6'
						color='black'
					>
						Наличие военного билета?:
					</Typography>
					<span className='font-normal'>
						{user?.isMilitaryId ? 'Да' : 'Нет'}
					</span>
				</div>
				<div className='flex flex-col'>
					<Typography
						variant='h6'
						color='black'
					>
						Резюме:
					</Typography>
					<Textarea
						disabled
						className='font-normal'
					>
						{user?.resume}
					</Textarea>
				</div>
			</CardBody>
		</Card>
	)
}

export default ChallengerInfoForm
