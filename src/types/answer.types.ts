export interface IAnswer {
	id: number
	content: string
	isCorrect: boolean
	questionId: number
}

export type TypeAnswerForm = Omit<IAnswer, 'id'>
