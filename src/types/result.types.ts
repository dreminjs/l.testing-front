import { ITest } from './test.types'
import { IUser } from './user.types'

export interface IResult {
	id: number
	testId: number
	userId: number
	scoreId: number
	completionTime: Date
	interviewDate: Date | null
	attemptRate: number
	isPassed: boolean
	test: ITest
	user: IUser
}

export type TypeResultForm = Omit<IResult, 'id'>
