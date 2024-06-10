import { Box, Modal } from '@mui/material'

export const ResponseMessageModal = ({
	onCloseModal,
	isOpen,
	isSuccess,
	isLoading,
	message,
	isError
}: {
	onCloseModal: () => void
	isOpen: boolean
	message: string
	isSuccess?: boolean
	isLoading?: boolean
	isError: boolean
}) => {

  console.log(isSuccess )

	return (
		<Modal
			className='mt-[50px]'
			open={isOpen}
			onClose={onCloseModal}
		>
			<Box
				className={`bg-white flex items-center justify-center h-28 w-1/2 mx-auto my-auto ${isError && `border-red-600 border-2` } ${
					isSuccess && `border-lime-400 border-2` 
				} ${isLoading && `border-slate-300 border-2`}`}
			>
				<p className='text-xl text-center'>{message}</p>
			</Box>
		</Modal>
	)
}
