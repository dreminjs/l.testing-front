import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'


export const ResumeService = {
    async update(id:string,data:any){
        return await instance.patch(`${SERVICE_URLS.RESUME}/${id}`,data)
    },
    async getOne(id?:string) {
        return await instance.get(`${SERVICE_URLS.RESUME}/${id}`,)
    }
}