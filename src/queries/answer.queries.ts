import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IAnswer, TypeAnswerForm } from '@/types/answer.types'

import { AnswerService } from '@/services/answer.service'
import { QUERY_KEYS } from '@/shared/constants/enums'

export const useCreateAnswer = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: create, isPending } = useMutation({
		mutationFn: async (data: TypeAnswerForm) => {
			const response = await AnswerService.create(data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ANSWERS] })
		}
	})
	return { create, isPending }
}

export const useGetAnswers = () => {
	const {
		data: answers,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.ANSWERS],
		queryFn: async () => {
			const response: AxiosResponse<IAnswer[]> = await AnswerService.getAll()
			return response.data
		}
	})
	return { answers, isLoading, refetch }
}

export const useGetAnswer = (id: string | undefined) => {
	const {
		data: answer,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.ANSWERS, id],
		queryFn: async () => {
			const response: AxiosResponse<IAnswer> = await AnswerService.getById(id)
			return response.data
		}
	})
	return { answer, isLoading, refetch }
}

export const useUpdateAnswer = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: update, isPending } = useMutation<
		IAnswer | undefined,
		Error,
		{ id: string | undefined; data: TypeAnswerForm }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await AnswerService.update(id, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ANSWERS] })
		}
	})
	return { update, isPending }
}

export const useDeleteAnswer = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: remove } = useMutation({
		mutationFn: async (id: string | number) => {
			await AnswerService.delete(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ANSWERS] })
		}
	})
	return { remove }
}
