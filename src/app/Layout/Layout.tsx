import { FC, PropsWithChildren } from 'react'

import Header from './Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='w-full pt-2 flex flex-col items-center '>
			<Header />
			<div className='w-full max-w-[1750px] flex flex-col px-4 mt-[95px]'>
				{children}
			</div>
		</div>
	)
}

export default Layout
