import EditManagerForm from '@/components/Manager/EditManagerForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const EditManagerPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<EditManagerForm />
		</div>
	)
}

export default WithPageLayout(EditManagerPage)
