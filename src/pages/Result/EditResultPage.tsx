import EditResultForm from '@/components/Results/EditResultForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const EditResultPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<EditResultForm />
		</div>
	)
}

export default WithPageLayout(EditResultPage)
