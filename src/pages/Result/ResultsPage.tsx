import { ResultsTable } from '@/components/Results/ResultsTable'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const ResultsPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<ResultsTable />
		</div>
	)
}

export default WithPageLayout(ResultsPage)
