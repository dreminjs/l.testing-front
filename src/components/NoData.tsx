import { Package2 } from 'lucide-react'

const NoData = () => {
	return (
		<div className='flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
			<div className='text-center'>
				<Package2 className='mx-auto w-1/2 max-w-md mb-8 ' />
				<h1 className='text-xl md:text-3xl font-semibold text-gray-800'>
					Данные не найдены
				</h1>
			</div>
		</div>
	)
}

export default NoData
