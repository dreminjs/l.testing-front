import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { ITest, TypeTestForm } from '@/types/test.types'

import { TestService } from './../services/test.service'
import { QUERY_KEYS } from '@/shared/constants/enums'

export const useCreateTest = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: create, isPending } = useMutation({
		mutationFn: async (data: TypeTestForm) => {
			const response = await TestService.create(data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TESTS] })
		}
	})
	return { create, isPending }
}

export const useGetTests = (user:any,name?: string,isAdmin?: boolean) => {
	const {
		data: tests,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.TESTS, name],
		enabled:user !== null ? true : false,
		queryFn: async () => {
			const response: AxiosResponse<ITest[]> = await TestService.getAll(name,isAdmin)
			return response.data
		}
	})
	return { tests, isLoading, refetch }
}

export const useGetTest = (id: string | undefined) => {
	const {
		data: test,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.TESTS, id],
		queryFn: async () => {
			const response: AxiosResponse<ITest> = await TestService.getById(id)
			return response.data
		}
	})
	return { test, isLoading, refetch }
}

export const useUpdateTest = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: update, isPending } = useMutation<
		ITest | undefined,
		Error,
		{ id: string | undefined; data: TypeTestForm }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await TestService.update(id, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TESTS] })
		}
	})
	return { update, isPending }
}

export const useDeleteTest = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: remove } = useMutation({
		mutationFn: async (id: string | number) => {
			await TestService.delete(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TESTS] })
		}
	})
	return { remove }
}
