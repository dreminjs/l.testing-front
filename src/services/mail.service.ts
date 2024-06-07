

import instance from '@/shared/api/api.instance'

import {SERVICE_URLS} from "@/shared/constants/enums"

export const MailService = {
    async sendMail(userId:string,date:Date | null) {
        return instance.post(`${SERVICE_URLS.MAIL}`,{userId,date})
    }
}