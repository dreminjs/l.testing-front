import AddManagerForm from '@/components/Manager/AddManagerForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const AddManagerPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<AddManagerForm />
		</div>
	)
}

export default WithPageLayout(AddManagerPage)
