export interface ITestDirection {
	id: number
	directionName: string
}

export type TypeTestDirectionForm = Omit<ITestDirection, 'id'>
