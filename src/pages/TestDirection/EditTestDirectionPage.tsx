import EditTestDirectionForm from '@/components/TestDirections/EditTestDirectionForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const EditTestDirectionPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<EditTestDirectionForm />
		</div>
	)
}

export default WithPageLayout(EditTestDirectionPage)
