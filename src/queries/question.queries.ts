import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IQuestion, TypeQuestionForm } from '@/types/question.types'

import { QuestionService } from '@/services/question.service'
import { QUERY_KEYS } from '@/shared/constants/enums'

export const useCreateQuestion = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: create, isPending } = useMutation({
		mutationFn: async (data: TypeQuestionForm) => {
			const response = await QuestionService.create(data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.QUESTIONS] })
		}
	})
	return { create, isPending }
}

export const useGetQuestions = () => {
	const {
		data: questions,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.QUESTIONS],
		queryFn: async () => {
			const response: AxiosResponse<IQuestion[]> =
				await QuestionService.getAll()
			return response.data
		}
	})
	return { questions, isLoading, refetch }
}

export const useGetQuestion = (id: string | undefined) => {
	const {
		data: question,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [QUERY_KEYS.QUESTIONS, id],
		queryFn: async () => {
			const response: AxiosResponse<IQuestion> =
				await QuestionService.getById(id)
			return response.data
		}
	})
	return { question, isLoading, refetch }
}

export const useUpdateQuestion = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: update, isPending } = useMutation<
		IQuestion | undefined,
		Error,
		{ id: string | undefined; data: TypeQuestionForm }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await QuestionService.update(id, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.QUESTIONS] })
		}
	})
	return { update, isPending }
}

export const useDeleteQuestion = () => {
	const queryClient = new QueryClient()
	const { mutateAsync: remove } = useMutation({
		mutationFn: async (id: string | number) => {
			await QuestionService.delete(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.QUESTIONS] })
		}
	})
	return { remove }
}
