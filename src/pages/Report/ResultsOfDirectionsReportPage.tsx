import ResultsOfDirectionReport from '@/components/Reports/ResultsOfDirectionReport'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const ResultsOfDirectionsReportPage = () => {
	return (
		<>
			<div className='w-full  flex flex-col px-4 mt-10'>
				<ResultsOfDirectionReport />
			</div>
		</>
	)
}

export default WithPageLayout(ResultsOfDirectionsReportPage)
