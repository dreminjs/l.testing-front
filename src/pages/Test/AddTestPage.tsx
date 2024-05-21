import AddTestForm from '@/components/Tests/AddTestForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const AddTestPage = () => {
	return (
		<div className='flex items-center justify-center  h-full'>
			<AddTestForm />
		</div>
	)
}

export default WithPageLayout(AddTestPage)
