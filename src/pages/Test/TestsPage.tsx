import TestComponent from '@/components/Tests/TestComponent'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const TestsPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<TestComponent />
		</div>
	)
}

export default WithPageLayout(TestsPage)
