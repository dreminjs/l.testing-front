import { ResumeService } from "@/services/resume.service"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"

export const usePatchResume = (id:string) => {
	const queryClient = new QueryClient()
	const { mutateAsync: update, isPending } = useMutation({
		
		mutationFn: async (data: any) => {
			const response = await ResumeService.update(id,data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['resume'] })
		}
	})
	return { update, isPending }
}

export const useGetResume = (id?:string) => {
    
	const { data, isPending ,refetch,isSuccess} = useQuery({
		queryFn: async () => {
			const response = await ResumeService.getOne(id)
			return response.data
		},
		enabled:id === undefined,
        queryKey:["resume"]
	})
	return { data, isPending,refetch,isSuccess }

}