import {
	ArrowLeftEndOnRectangleIcon,
	Bars2Icon,
	ChevronDownIcon,
	CodeBracketSquareIcon,
	Squares2X2Icon,
	TrophyIcon,
	UserCircleIcon,
	UserIcon,
	UsersIcon
} from '@heroicons/react/24/solid'
import {
	Button,
	IconButton,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	MobileNav,
	Navbar,
	Typography
} from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { PAGE_URLS } from '@/shared/constants/enums'
import { removeFromStorage } from '@/shared/helpers/auth.helper'
import useAuth from '@/shared/hooks/useAuth'

const ProfileMenu = () => {
	const navigate = useNavigate()

	const logout = () => {
		removeFromStorage()
		navigate(PAGE_URLS.LOGIN, { replace: true })
	}
	const [isMenuOpen, setIsMenuOpen] = React.useState(false)

	const { user } = useAuth()

	return (
		<Menu
			open={isMenuOpen}
			handler={setIsMenuOpen}
			placement='bottom-end'
		>
			<MenuHandler>
				<Button
					variant='text'
					color='blue-gray'
					className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
				>
					<UserCircleIcon
						color='teal'
						className='h-8 w-8'
					/>

					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? 'rotate-180' : ''
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className='p-1'>
				{user?.roleId === 2 ? (
					<MenuItem
						onClick={() => navigate(`${PAGE_URLS.EDIT_CHALLENGER}/${user?.id}`)}
					>
						<Typography
							as='span'
							variant='small'
							className='font-normal flex items-center gap-1 text-[17px]'
							color={'inherit'}
						>
							<UserIcon
								color='teal'
								className='h-4 w-4'
							/>
							Профиль
						</Typography>
					</MenuItem>
				) : null}

				<MenuItem onClick={logout}>
					<Typography
						as='span'
						variant='small'
						className='font-normal flex items-center gap-1 text-[17px]'
						color={'red'}
					>
						<ArrowLeftEndOnRectangleIcon className='h-4 w-4' />
						Выход
					</Typography>
				</MenuItem>
			</MenuList>
		</Menu>
	)
}

const NavList = () => {
	const { user } = useAuth()

	const navigate = useNavigate()
	return (
		<ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center '>
			{user?.roleId === 1 ? (
				<>
					<Typography
						variant='small'
						color='gray'
						onClick={() => navigate(PAGE_URLS.USERS)}
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.USERS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<UsersIcon
								color='teal'
								className='h-[18px] w-[18px] '
							/>
							<span className='text-gray-900 text-[17px]'> Пользователи</span>
						</MenuItem>
					</Typography>
					<Typography
						variant='small'
						color='gray'
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.TEST_DIRECTIONS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<Squares2X2Icon
								color='teal'
								className='h-[18px] w-[18px] '
							/>
							<span className='text-gray-900 text-[17px]'> Направления</span>
						</MenuItem>
					</Typography>
					<Typography
						variant='small'
						color='gray'
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.TESTS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<CodeBracketSquareIcon
								color='teal'
								className='h-[18px] w-[18px]'
							/>
							<span className='text-gray-900 text-[17px]'> Тесты</span>
						</MenuItem>
					</Typography>

					<Typography
						variant='small'
						color='gray'
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.RESULTS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<TrophyIcon
								color='teal'
								className='h-[18px] w-[18px]'
							/>
							<span className='text-gray-900 text-[17px]'>
								Результаты претендентов
							</span>
						</MenuItem>
					</Typography>
				</>
			) : //менеджер
			user?.roleId === 3 ? (
				<>
					<Typography
						variant='small'
						color='gray'
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.TEST_DIRECTIONS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<Squares2X2Icon
								color='teal'
								className='h-[18px] w-[18px] '
							/>
							<span className='text-gray-900 text-[17px]'> Направления</span>
						</MenuItem>
					</Typography>
					<Typography
						variant='small'
						color='gray'
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.TESTS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<CodeBracketSquareIcon
								color='teal'
								className='h-[18px] w-[18px]'
							/>
							<span className='text-gray-900 text-[17px]'> Тесты</span>
						</MenuItem>
					</Typography>

					<Typography
						variant='small'
						color='gray'
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.RESULTS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<TrophyIcon
								color='teal'
								className='h-[18px] w-[18px]'
							/>
							<span className='text-gray-900 text-[17px]'>
								Результаты претендентов
							</span>
						</MenuItem>
					</Typography>
				</>
			) : (
				//претендент
				<>
					<Typography
						variant='small'
						color='gray'
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.TESTS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<CodeBracketSquareIcon
								color='teal'
								className='h-[18px] w-[18px]'
							/>
							<span className='text-gray-900 text-[17px]'> Тесты</span>
						</MenuItem>
					</Typography>
					{/* <Typography
						variant='small'
						color='gray'
						className='font-medium text-blue-gray-500'
					>
						<MenuItem
							onClick={() => navigate(PAGE_URLS.RESULTS)}
							className='flex items-center gap-2 lg:rounded-full'
						>
							<TrophyIcon
								color='teal'
								className='h-[18px] w-[18px]'
							/>
							<span className='text-gray-900 text-[17px]'>
								Результаты тестов
							</span>
						</MenuItem>
					</Typography> */}
				</>
			)}
		</ul>
	)
}

const Header = () => {
	const [isNavOpen, setIsNavOpen] = React.useState(false)
	const { user } = useAuth()
	const toggleIsNavOpen = () => setIsNavOpen(cur => !cur)
	const navigate = useNavigate()
	React.useEffect(() => {
		window.addEventListener(
			'resize',
			() => window.innerWidth >= 960 && setIsNavOpen(false)
		)
	}, [])

	return (
		<Navbar className='mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 fixed z-10'>
			<div className='relative mx-auto flex items-center justify-between text-blue-gray-900'>
				<div className='hidden lg:block'>
					<NavList />
				</div>
				<IconButton
					size='sm'
					color='blue-gray'
					variant='text'
					onClick={toggleIsNavOpen}
					className='ml-auto mr-2 lg:hidden'
				>
					<Bars2Icon className='h-6 w-6' />
				</IconButton>

				{user?.roleId !== 2 ? (
					<div className='flex items-center gap-4'>
						<Menu>
							<MenuHandler>
								<Button color='teal'>Отчеты</Button>
							</MenuHandler>
							<MenuList>
								<MenuItem
									onClick={() => navigate(`${PAGE_URLS.REPORTS}/get-results`)}
								>
									Отчёт по результатам тестирования
								</MenuItem>
								<MenuItem
									onClick={() =>
										navigate(`${PAGE_URLS.REPORTS}/get-results-of-directions`)
									}
								>
									Отчёт по количеству опрошенных по направлению
								</MenuItem>
							</MenuList>
						</Menu>
						<ProfileMenu />
					</div>
				) : (
					<ProfileMenu />
				)}
			</div>
			<MobileNav
				open={isNavOpen}
				className='overflow-x-auto overflow-y-auto'
			>
				<NavList />
			</MobileNav>
		</Navbar>
	)
}

export default Header
