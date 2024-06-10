import { MailService } from "@/services/mail.service"
import { useMutation } from "@tanstack/react-query"



export const usePostMail = (userId:string,resultId:string,date:Date | null) => {

    const { mutateAsync:sendMail } = useMutation({
        mutationFn:() => MailService.sendMail(userId,resultId,date)
    })

    return { sendMail }
}