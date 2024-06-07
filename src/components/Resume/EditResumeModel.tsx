import {
	Button,
	Card,
	Checkbox,
	Input,
	Option,
	Select,
	Textarea,
	Typography
} from '@material-tailwind/react'
import { Box,Input as InputFile } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useForm } from 'react-hook-form'
import { InputFileUpload } from './InputUploadFile'
import { useEffect, useState } from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { usePatchResume,useGetResume }from "@/queries/resume.queries"
import { useParams } from 'react-router-dom'


export const EditResumeModal = ({
	isOpen,
	onClose
}: {
	isOpen: boolean
	onClose: () => void
}) => {

	const { id } = useParams()

	const {data,refetch} = useGetResume(String(id))
	
	useEffect(() => {
			if(id){
				refetch()
			}
	},[id])

	const schema = yup.object({
		about:yup.string().required("Расскажите о вас!").min(3,"минимально 3 символа!!").max(250,"максимально 250 символов!"),
		age:yup.number().positive().integer().required("Введите возраст!").min(1,"минимально 1 символ!"),
		desiredSalary:yup.number().positive().integer().required("Введите желаемую зп!"),
		experience:yup.string(),
		photo:yup.mixed()
		.notRequired()
		.test("fileSize", "файл слишком большой!", (value: any) => {
		  return value || (value[0] && value[0].size <= 5242880); // Maximum file size 5MB
		}),
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<any>({resolver:yupResolver(schema),values:{
		about:data?.about,
		age:data?.age,
		desiredSalary:data?.desiredSalary,
		experience:data?.experience
	}})

	const [photo,setPhoto] = useState(null)

	const handleChangePhoto = (e:any) => {
		const file = e.target.files[0];

		if (file) {
		  const reader: any = new FileReader();
		  reader.onload = () => {
			setPhoto(reader.result);
		  };
		  reader.readAsDataURL(file);
		}
	}

	const formData = new FormData()

	const onSubmit = (data:any) => {
		console.log(data)
		formData.append("about",data.about)
		formData.append("age",data.age)
		formData.append("desiredSalary",data.desiredSalary)
		formData.append("experience",data.experience)
		if(photo){
			formData.append('file',data.photo[0])
		}
		update(formData)
	}

	const {update,isPending} = usePatchResume(String(id))

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
		>
			<Box className={`bg-white w-1/2 mx-auto my-[55px] p-5 rounded-xl`}>
				<Typography
					variant='h4'
					color='blue-gray'
					className='text-center'
				>
					Резюме
				</Typography>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='mt-4 mb-2 px-4 sm:px-0 w-full max-w-screen-lg'
				>
					<div className='mb-1 flex flex-col gap-6'>
						<Textarea
							label='о себе'
							defaultValue={''}
							placeholder={''}
							{...register("about")}
						/>
						{errors.about && <span>{errors?.about?.message}</span>}

						<Input
							label='возраст'
							size='md'
							defaultValue={''}
							placeholder={''}
							{...register('age')}
						/>
						{errors.age && <span>{errors?.age?.message}</span>}
						<Input
							label='желаемая зп'
							size='md'
							defaultValue={''}
							placeholder={''}
							{...register('desiredSalary')}
						/>
						{errors.desiredSalary && (
							<span>{errors?.desiredSalary?.message}</span>
						)}
						<Textarea
							label='опыт работы'
							size='md'
							defaultValue={''}
							placeholder={''}
							{...register('experience')}
						/>
						{errors.experience && <span>{errors?.experience?.message}</span>}
						{

							photo ? <img className='h-[250px] w-[350px]' src={photo} alt="" /> : data?.photo && <img className='h-[250px] w-[350px]' src={`http://localhost:8077/${data?.photo}`} alt="photo" />
						}
						<InputFileUpload
							onChangePhoto={handleChangePhoto}
							register={register}
						/>
						{errors.photo && <span>{errors?.photo?.message}</span>}
					</div>
					<Button
						color='teal'
						className='mt-6'
						fullWidth
						type='submit'
					>
						Изменить
					</Button>
				</form>
			</Box>
		</Modal>
	)
}
