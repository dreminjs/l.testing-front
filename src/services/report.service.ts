import { IResultReport } from '@/types/report.types'

import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'

export const ReportService = {
	async getResultsReport() {
		return instance.get<IResultReport[]>(`${SERVICE_URLS.REPORTS}/get-results`)
	}
}
