import AddTestDirectionForm from '@/components/TestDirections/AddTestDirectionForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const AddTestDirectionPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<AddTestDirectionForm />
		</div>
	)
}

export default WithPageLayout(AddTestDirectionPage)
