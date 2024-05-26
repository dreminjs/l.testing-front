import { IResultReport } from '@/types/report.types'

import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'

export const ReportService = {
	async getResultsReport(
		isPassed?: string,
		directionName?: string,
		maritalStatus?: string,
		children?: string,
		militaryId?: string
	) {
		const params = new URLSearchParams()
		if (isPassed) params.append('isPassed', isPassed)
		if (directionName) params.append('directionName', directionName)
		if (maritalStatus) params.append('maritalStatus', maritalStatus)
		if (children) params.append('children', children)
		if (militaryId) params.append('militaryId', militaryId)

		const url = `${SERVICE_URLS.REPORTS}/get-results${params.toString() && '?' + params.toString()}`

		return instance.get<IResultReport[]>(`${url}`)
	}
}
