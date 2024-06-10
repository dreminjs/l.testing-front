import { usePostMail } from '@/queries/mail.queries'
import { Button, Input, Typography } from '@material-tailwind/react'
import { Box, Modal } from '@mui/material'
import { Calendar } from 'lucide-react'
import { useState } from 'react'

export const MailModal = ({
	isOpen,
	onClose,
	userId,
	resultId
}: {
	isOpen: boolean
	onClose: () => void
	userId: string,
	resultId: string
}) => {

    const [date,setDate] = useState(null)

    const handleChangeDate = (e:any) => {
        setDate(e.target.value)
    }

    const {sendMail} = usePostMail(userId,resultId,date)

    const submit = () => {
        if(date && userId){
            sendMail()
        }
    }

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
		>
			<Box className={`bg-white w-1/2 mx-auto my-[55px] p-5 rounded-xl`}>
				<Typography
					variant='h5'
					color='blue-gray'
					className='text-center mb-5'
				>
					Отправить приглашение
				</Typography>
				<Input
					type='datetime-local'
					label='Выберите время для собеса!'
                    onChange={handleChangeDate}
					min={new Date().toISOString().slice(0, 16)}
					size='lg'
				/>
				<Button
					className='mt-5'
					color='teal'
                    onClick={submit}
				>
					Отправить
				</Button>
			</Box>
		</Modal>
	)
}
