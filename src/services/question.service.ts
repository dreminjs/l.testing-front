import { IQuestion, TypeQuestionForm } from '@/types/question.types'

import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'

export const QuestionService = {
	async create(data: TypeQuestionForm) {
		return instance.post<IQuestion>(SERVICE_URLS.QUESTIONS, data)
	},
	async getAll() {
		return instance.get<IQuestion[]>(SERVICE_URLS.QUESTIONS)
	},

	async getById(id: string | undefined) {
		return instance.get<IQuestion>(`${SERVICE_URLS.QUESTIONS}/${id}`)
	},

	async update(id: string | undefined, data: TypeQuestionForm) {
		return instance.patch<IQuestion>(`${SERVICE_URLS.QUESTIONS}/${id}`, data)
	},

	async delete(id: number | string) {
		return instance.delete<IQuestion>(`${SERVICE_URLS.QUESTIONS}/${id}`)
	}
}
