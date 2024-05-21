import { IUser } from './user.types'

export interface ILogin {
	login: string
	password: string
}

export interface IRegister {
	login: string
	password: string
	roleId: number
}

export interface IChallengerLogin {
	email: string
}

export interface IChallengerRegister {
	lastName: string
	firstName: string
	middleName?: string
	phoneNumber: string
	isMilitaryId: boolean
	hasChildren: boolean
	maritalStatus: string
	email: string
	resume: string
	roleId: number
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
