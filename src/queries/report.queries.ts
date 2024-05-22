import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IResultReport } from '@/types/report.types'

import { ReportService } from '@/services/report.service'
import { QUERY_KEYS } from '@/shared/constants/enums'

export const useGetTestingResultsReport = () => {
	const {
		data: results,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.REPORTS],
		queryFn: async () => {
			const response: AxiosResponse<IResultReport[]> =
				await ReportService.getResultsReport()
			return response.data
		}
	})
	return { results, isLoading, refetch }
}
