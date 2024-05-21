import { IAnswer, TypeAnswerForm } from '@/types/answer.types'

import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'

export const AnswerService = {
	async create(data: TypeAnswerForm) {
		return instance.post<IAnswer>(SERVICE_URLS.ANSWERS, data)
	},
	async getAll() {
		return instance.get<IAnswer[]>(SERVICE_URLS.ANSWERS)
	},

	async getById(id: string | undefined) {
		return instance.get<IAnswer>(`${SERVICE_URLS.ANSWERS}/${id}`)
	},

	async update(id: string | undefined, data: TypeAnswerForm) {
		return instance.patch<IAnswer>(`${SERVICE_URLS.ANSWERS}/${id}`, data)
	},

	async delete(id: number | string) {
		return instance.delete<IAnswer>(`${SERVICE_URLS.ANSWERS}/${id}`)
	}
}
