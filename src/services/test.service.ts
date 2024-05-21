import { ITest, TypeTestForm } from '@/types/test.types'

import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'

export const TestService = {
	async create(data: TypeTestForm) {
		return instance.post<ITest>(SERVICE_URLS.TESTS, data)
	},
	async getAll() {
		return instance.get<ITest[]>(SERVICE_URLS.TESTS)
	},

	async getById(id: string | undefined) {
		return instance.get<ITest>(`${SERVICE_URLS.TESTS}/${id}`)
	},

	async update(id: string | undefined, data: TypeTestForm) {
		return instance.patch<ITest>(`${SERVICE_URLS.TESTS}/${id}`, data)
	},

	async delete(id: number | string) {
		return instance.delete<ITest>(`${SERVICE_URLS.TESTS}/${id}`)
	}
}
