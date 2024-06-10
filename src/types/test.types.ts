import { IQuestion } from './question.types'
import { IResult } from './result.types'
import { ITestDirection } from './test-direction.types'

export interface ITest {
	id: number
	title: string
	accessTime: Date
	timeLimit: number // minutes
	attemptLimit: number
	thresholdValue: number
	directionId: number
	testDirection: ITestDirection
	results: IResult[]
	questions: IQuestion[],
	photo: FileList
}

export type TypeTestForm = Omit<ITest, 'id'>
