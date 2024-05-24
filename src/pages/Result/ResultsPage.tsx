import { ResultsTable } from '@/components/Results/ResultsTable'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const ResultsPage = () => {
	return (
		<div>
			<ResultsTable />
		</div>
	)
}

export default WithPageLayout(ResultsPage)
