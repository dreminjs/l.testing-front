import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IResultReport } from '@/types/report.types'

import { ReportService } from '@/services/report.service'
import { QUERY_KEYS } from '@/shared/constants/enums'

export const useGetTestingResultsReport = (
	isPassed?: string,
	directionName?: string,
	maritalStatus?: string,
	children?: string,
	militaryId?: string
) => {
	const {
		data: results,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [
			QUERY_KEYS.REPORTS,
			{ isPassed, directionName, maritalStatus, children, militaryId }
		],
		queryFn: async () => {
			const response: AxiosResponse<IResultReport[]> =
				await ReportService.getResultsReport(
					isPassed,
					directionName,
					maritalStatus,
					children,
					militaryId
				)
			return response.data
		}
	})
	return { results, isLoading, refetch }
}
