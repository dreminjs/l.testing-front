import {
	Button,
	Input,
	Textarea,
	Typography
} from '@material-tailwind/react'
import { Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useForm } from 'react-hook-form'
import { InputFileUpload } from '@/shared/components/InputUploadFile'
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
		age:yup.number().positive("возраст может быть только больше 0").required("Введите возраст!").min(2,"минимально 2 символа!").moreThan(15,"вам должно быть не меньше 16!"),
		desiredSalary:yup.number().positive("вы хотите нам платить? :)").integer().required("Введите желаемую зп!"),
		experience:yup.string().required("расскажите о своем опыте!"),
		photo:yup.mixed()
		.notRequired()
		.test("fileSize", "файл слишком большой!", (value: any) => {
		  return value || (value[0] && value[0].size <= 5242880); // Maximum file size 5MB
		}),
	})

	const {
		register,
		handleSubmit,
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

	const {update} = usePatchResume(String(id))

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
		>
			<Box className={`bg-white w-1/2 mx-auto  p-5 rounded-xl mt-5`}>
				<Typography
					variant='h4'
					color='blue-gray'
					className='text-center' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}				>
					{data?.about ? "Изменить резюме" : "Добавить резюме"}
				</Typography>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='mt-4 mb-2 px-4 sm:px-0 w-full max-w-screen-lg'
				>
					<div className='mb-1 flex flex-col gap-6'>
						<Textarea
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label='о себе'
							defaultValue={''}
							placeholder={''}
							{...register("about")}						/>
						{errors.about && <span>{String(errors?.about?.message)}</span>}

						<Input
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='возраст'
							size='md'
							defaultValue={''}
							placeholder={''}
							type='number'
							{...register('age')}						/>
						{errors.age && <span>{String(errors?.age?.message)}</span>}
						<Input
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='желаемая зп'
							size='md'
							defaultValue={''}
							placeholder={''}
							type='number'
							{...register('desiredSalary')}						/>
						{errors.desiredSalary && (
							<span>{String(errors?.desiredSalary?.message)}</span>
						)}
						<Textarea
							onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label='опыт работы'
							size='md'
							defaultValue={''}
							placeholder={''}
							{...register('experience')}						/>
						{errors.experience && <span>{String(errors?.experience?.message)}</span>}
						{

							photo ? (<img className='h-[250px] w-[350px]' src={photo} alt="" />) : data?.photo && <img className='h-[250px] w-[350px]' src={`http://localhost:8077/${data?.photo}`} alt="photo" />
						}
						<InputFileUpload
							onChangePhoto={handleChangePhoto}
							register={register}
						/>
						{errors.photo && <span>{String(errors?.photo?.message)}</span>}
					</div>
					<Button
						color='teal'
						className='mt-6'
						fullWidth
						type='submit' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}					>
						Изменить
					</Button>
				</form>
			</Box>
		</Modal>
	)
}
