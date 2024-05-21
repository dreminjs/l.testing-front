import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { routeConfig } from '@/app/config/route.config'

const RouteProvider: FC = () => {
	return (
		<Routes>
			{Object.values(routeConfig).map(({ element, path }) => (
				<Route
					key={path}
					element={element}
					path={path}
				/>
			))}
		</Routes>
	)
}

export default RouteProvider
