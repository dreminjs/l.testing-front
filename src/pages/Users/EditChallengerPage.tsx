import EditChallengerForm from '@/components/Users/EditChallengerForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const EditChallengerPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<EditChallengerForm />
		</div>
	)
}

export default WithPageLayout(EditChallengerPage)
