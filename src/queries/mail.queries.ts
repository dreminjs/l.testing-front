import { MailService } from "@/services/mail.service"
import { useMutation } from "@tanstack/react-query"



export const usePostMail = (userId:string,date:Date | null) => {

    const { mutateAsync:sendMail } = useMutation({
        mutationFn:() => MailService.sendMail(userId,date)
    })

    return { sendMail }
}