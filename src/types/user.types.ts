import { ITest } from './test.types'

export interface IUser {
	id: number
	password?: string
	login?: string
	roleId?: number
	resume?: string
	email?: string
	firstName?: string
	lastName?: string
	middleName?: string
	hasChildren?: boolean
	maritalStatus?: string
	isMilitaryId?: boolean
	phoneNumber?: string
	tests: ITest[]
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
