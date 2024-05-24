import TestingResultsReport from '@/components/Reports/TestingResultsReport'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const TestingResultsReportPage = () => {
	return (
		<div>
			<TestingResultsReport />
		</div>
	)
}

export default WithPageLayout(TestingResultsReportPage)
