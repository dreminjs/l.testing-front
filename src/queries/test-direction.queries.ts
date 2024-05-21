import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import {
	ITestDirection,
	TypeTestDirectionForm
} from '@/types/test-direction.types'

import { TestDirectionService } from '@/services/test-direction.service'
import { QUERY_KEYS } from '@/shared/constants/enums'

export const useCreateTestDirection = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: create, isPending } = useMutation({
		mutationFn: async (data: TypeTestDirectionForm) => {
			const response = await TestDirectionService.create(data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEST_DIRECTIONS] })
		}
	})
	return { create, isPending }
}

export const useGetTestDirections = () => {
	const {
		data: testDirections,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.TEST_DIRECTIONS],
		queryFn: async () => {
			const response: AxiosResponse<ITestDirection[]> =
				await TestDirectionService.getAll()
			return response.data
		}
	})
	return { testDirections, isLoading, refetch }
}

export const useGetTestDirection = (id: string | undefined) => {
	const {
		data: testDirection,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.TEST_DIRECTIONS, id],
		queryFn: async () => {
			const response: AxiosResponse<ITestDirection> =
				await TestDirectionService.getById(id)
			return response.data
		}
	})
	return { testDirection, isLoading, refetch }
}

export const useUpdateTestDirection = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: update, isPending } = useMutation<
		ITestDirection | undefined,
		Error,
		{ id: string | undefined; data: TypeTestDirectionForm }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await TestDirectionService.update(id, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEST_DIRECTIONS] })
		}
	})
	return { update, isPending }
}

export const useDeleteTestDirection = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: remove } = useMutation({
		mutationFn: async (id: string | number) => {
			await TestDirectionService.delete(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEST_DIRECTIONS] })
		}
	})
	return { remove }
}
