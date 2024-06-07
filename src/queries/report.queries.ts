import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IReportOfDirection, IResultReport } from '@/types/report.types'

import { ReportService } from '@/services/report.service'
import { QUERY_KEYS } from '@/shared/constants/enums'

export const useGetTestingResultsReport = (
	isPassed?: string,
	directionName?: string,
	maritalStatus?: string,
	children?: string,
	militaryId?: string,
	startDate?: string,
	endDate?: string
) => {
	const {
		data: results,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [
			QUERY_KEYS.REPORTS,
			{
				isPassed,
				directionName,
				maritalStatus,
				children,
				militaryId,
				startDate,
				endDate
			}
		],
		queryFn: async () => {
			const response: AxiosResponse<IResultReport[]> =
				await ReportService.getResultsReport(
					isPassed,
					directionName,
					maritalStatus,
					children,
					militaryId,
					startDate,
					endDate
				)
			return response.data
		}
	})
	return { results, isLoading, refetch }
}

export const useGetResultsOfDirection = (directionName?: string) => {
	const {
		data: results,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.REPORTS, directionName],
		queryFn: async () => {
			const response: AxiosResponse<IReportOfDirection[]> =
				await ReportService.getResultsOfDirections(directionName)
			return response.data
		}
	})
	return { results, isLoading, refetch }
}
