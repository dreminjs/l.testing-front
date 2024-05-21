import UsersTable from '@/components/Users/UsersTable'

import WithPageLayout from '@/app/Layout/hoc/WithPageLayout'

const UsersPage = () => {
	return <UsersTable />
}
export default WithPageLayout(UsersPage)
