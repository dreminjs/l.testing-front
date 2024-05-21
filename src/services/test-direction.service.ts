import {
	ITestDirection,
	TypeTestDirectionForm
} from '@/types/test-direction.types'

import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'

export const TestDirectionService = {
	async create(data: TypeTestDirectionForm) {
		return instance.post<ITestDirection>(SERVICE_URLS.TEST_DIRECTIONS, data)
	},
	async getAll() {
		return instance.get<ITestDirection[]>(SERVICE_URLS.TEST_DIRECTIONS)
	},

	async getById(id: string | undefined) {
		return instance.get<ITestDirection>(`${SERVICE_URLS.TEST_DIRECTIONS}/${id}`)
	},

	async update(id: string | undefined, data: TypeTestDirectionForm) {
		return instance.put<ITestDirection>(
			`${SERVICE_URLS.TEST_DIRECTIONS}/${id}`,
			data
		)
	},

	async delete(id: number | string) {
		return instance.delete<ITestDirection>(
			`${SERVICE_URLS.TEST_DIRECTIONS}/${id}`
		)
	}
}
