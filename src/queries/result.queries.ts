import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IResult, TypeResultForm } from '@/types/result.types'

import { ResultService } from '@/services/result.service'
import { QUERY_KEYS } from '@/shared/constants/enums'

export const useCreateResult = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: create, isPending } = useMutation({
		mutationFn: async (data: TypeResultForm) => {
			const response = await ResultService.create(data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESULTS] })
		}
	})
	return { create, isPending }
}

export const useGetResults = (maritalStatus?: string, isPassed?: string,sortedDatesOrder?:string) => {
	const {
		data: results,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.RESULTS, { maritalStatus, isPassed }],
		queryFn: async () => {
			const response: AxiosResponse<IResult[]> = await ResultService.getAll(
				maritalStatus,
				isPassed,
				sortedDatesOrder
			)
			return response.data
		}
	})
	return { results, isLoading, refetch }
}

export const useGetResult = (id: string | undefined) => {
	const {
		data: result,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.RESULTS, id],
		queryFn: async () => {
			const response: AxiosResponse<IResult> = await ResultService.getById(id)
			return response.data
		}
	})
	return { result, isLoading, refetch }
}

export const useUpdateResult = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: update, isPending } = useMutation<
		IResult | undefined,
		Error,
		{ id: string | undefined; data: TypeResultForm }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await ResultService.update(id, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESULTS] })
		}
	})
	return { update, isPending }
}

export const useDeleteResult = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: remove } = useMutation({
		mutationFn: async (id: string | number) => {
			await ResultService.delete(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESULTS] })
		}
	})
	return { remove }
}
