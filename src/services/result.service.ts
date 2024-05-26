import { IResult, TypeResultForm } from '@/types/result.types'

import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'

export const ResultService = {
	async create(data: TypeResultForm) {
		return instance.post<IResult>(SERVICE_URLS.RESULTS, data)
	},
	async getAll(directionName?: string, isPassed?: string) {
		const params = new URLSearchParams()

		if (directionName) params.append('directionName', directionName)
		if (isPassed) params.append('isPassed', isPassed)

		const url = `${SERVICE_URLS.RESULTS}${params.toString() && '?' + params.toString()}`

		return instance.get<IResult[]>(url)
	},

	async getById(id: string | undefined) {
		return instance.get<IResult>(`${SERVICE_URLS.RESULTS}/${id}`)
	},

	async update(id: string | undefined, data: TypeResultForm) {
		return instance.patch<IResult>(`${SERVICE_URLS.RESULTS}/${id}`, data)
	},

	async delete(id: number | string) {
		return instance.delete<IResult>(`${SERVICE_URLS.RESULTS}/${id}`)
	}
}
