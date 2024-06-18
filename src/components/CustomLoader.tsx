import { Spinner } from '@material-tailwind/react'

const CustomLoader = () => {
	return (
		<div
			className={
				'fixed inset-0 z-50 flex justify-center items-center  bg-opacity-50'
			}
		>
			<Spinner
				color='teal'
				className='h-6 w-6' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}			/>
		</div>
	)
}

export default CustomLoader
