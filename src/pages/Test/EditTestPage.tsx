import EditTestForm from '@/components/Tests/EditTestForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const EditTestPage = () => {
	return (
		<div>
			<EditTestForm />
		</div>
	)
}

export default WithPageLayout(EditTestPage)
