import TestPassingForm from '@/components/Tests/TestPassingForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const TestPassingPages = () => {
	return (
		<div className='flex items-center justify-center '>
			<TestPassingForm />
		</div>
	)
}

export default WithPageLayout(TestPassingPages)
