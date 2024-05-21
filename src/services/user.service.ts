import { IUser, TypeUserForm } from '@/types/user.types'

import instance from '@/shared/api/api.instance'
import { SERVICE_URLS } from '@/shared/constants/enums'

export const UserService = {
	async getAll() {
		return instance.get<IUser[]>(SERVICE_URLS.USERS)
	},

	async getById(id: string | undefined) {
		return instance.get<IUser>(`${SERVICE_URLS.USERS}/${id}`)
	},

	async update(id: string | undefined, data: TypeUserForm) {
		return instance.patch<IUser>(`${SERVICE_URLS.USERS}/${id}`, data)
	},

	async delete(id: number | string) {
		return instance.delete<IUser>(`${SERVICE_URLS.USERS}/${id}`)
	}
}
