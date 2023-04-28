import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    description: yup.string().required('Description is required.')
})
const CreatePost = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {     //don't go to the posts page if user is not logged in
            navigate("/login");
        }
    }, [])

    const formData = [
        {
            name: 'title',
        },
        {
            name: 'description',
        },
    ]

    const initialValues = {
        title: '',
        description: ''
    }


    const onSubmit = (data) => {
        axios.post("http://localhost:4000/posts",
            data,
            { headers: { accessToken: localStorage.getItem("accessToken") } })
            .then((res) => {
                console.log(res.data);
                navigate('/')
            })
    }


    return (
        <div className="grid justify-center mt-24">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form
                    className='rounded-lg bg-[#303338] text-white h-[400px] w-[500px] grid items-center px-6'>
                    <div className='grid grid-cols-3 border-b border-b-[#606770]'>
                        <div className='col-start-2 grid justify-center text-2xl pb-4'>Create post</div>
                        <div className='col-start-3 grid justify-end text-4xl'>
                            <RxCross2 />
                        </div>
                    </div>
                    {
                        formData.map((val, i) => {
                            return (
                                <div key={i} className='grid grid-cols-6'>
                                    <label htmlFor={val.name} className='capitalize'>{val.name}</label>
                                    <Field name={val.name}
                                        autoComplete='off'
                                        placeholder='enter your name'
                                        className='col-start-3 col-span-4 focus:outline-none rounded-md text-black px-2 py-1' />
                                    <ErrorMessage
                                        name={val.name}
                                        className='text-red-600 col-span-4'
                                        component='p' />
                                </div>
                            )
                        })
                    }
                    <button type='submit' className='bg-[#606770] rounded-md py-2'>Post</button>

                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
