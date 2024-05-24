import { ITest } from './test.types'
import { IUser } from './user.types'

export interface IResultReport {
	id: number
	completionTime: Date
	interviewDate: Date
	isPassed: boolean
	scoreId: number
	user: IUser
	test: ITest
}
