import TestingResultsReport from '@/components/Reports/TestingResultsReport'

import Header from '@/app/Layout/Header'

const TestingResultsReportPage = () => {
	return (
		<>
			<Header />
			<div className='w-full  flex flex-col px-4 mt-5 pb-5'>
				<TestingResultsReport />
			</div>
		</>
	)
}

export default TestingResultsReportPage
