import { IAnswer } from './answer.types'

export interface IQuestion {
	id: number
	content: string
	answers: IAnswer[]
	testId: number
}

export type TypeQuestionForm = Omit<IQuestion, 'id'>
