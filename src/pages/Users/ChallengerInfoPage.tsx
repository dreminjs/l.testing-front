import ChallengerInfoForm from '@/components/Users/ChallengerInfoForm'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const ChallengerInfoPage = () => {
	return (
		<div className='flex items-center justify-center '>
			<ChallengerInfoForm />
		</div>
	)
}

export default WithPageLayout(ChallengerInfoPage)
