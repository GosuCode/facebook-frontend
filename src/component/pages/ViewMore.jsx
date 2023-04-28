import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import fbicon from '../assets/fbicon.png'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlineSend } from 'react-icons/ai'



const ViewMore = () => {
    let { id } = useParams();

    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])     //for previous comments
    const [newComment, setNewComment] = useState("")    //for new comments

    useEffect(() => {
        //for posts, to get by id
        axios.get(`http://localhost:4000/posts/byId/${id}`)
            .then((res) => {
                setPostObject(res.data)
            })

        //for comments, to get by id
        axios.get(`http://localhost:4000/comments/${id}`)
            .then((res) => {
                setComments(res.data)
            })
    }, [id])

    const addComment = () => {
        axios.post("http://localhost:4000/comments", {
            commentBody: newComment,
            PostId: id
        },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        )
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data.error);
                } else {
                    const commentToAdd = { commentBody: newComment, username: res.data.username }     //to avoid keep refreshing for every time you comment
                    setComments([...comments, commentToAdd])
                    setNewComment('')      //to set the new comment empty
                }
            })
    }

    return (
        <div className='grid justify-center text-white'>
            <div className='h-[400px] w-[600px] shadow-lg shadow-black mt-4 rounded-md'>
                <div className='grid grid-cols-12 w-full bg-blue-500 rounded-t-md'>
                    <div>
                        <img src={fbicon} alt="" height={40} width={40} />
                    </div>
                    <div className='col-start-2 col-span-9'>
                        <p>{postObject.username}</p>
                        <p>{postObject.createdAt}</p>
                    </div>
                    <div>
                        <FiMoreHorizontal />
                    </div>
                    <div>
                        <RxCross2 />
                    </div>
                </div>
                <div>
                    {postObject.title} <br />
                    {postObject.description}
                </div>

                <div>
                    <input type="text" className='focus:outline-none text-black'
                        value={newComment}
                        placeholder='Write a comment...' autoComplete='off'
                        onChange={(e) => { setNewComment(e.target.value) }} />

                    <button onClick={addComment}>
                        <AiOutlineSend />
                    </button>
                </div>
            </div>
            <div className='text-4xl mt-10'>Comments</div>

            <div>
                {comments.map((value, index) => {
                    return <div key={index}
                        className='bg-yellow-800 w-[800px] border-2 border-black rounded-md pt-2 mt-2'>
                        <label className='bg-blue-500 rounded-sm px-2'>{value.username}</label>
                        <p className='p-2 '>{value.commentBody}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ViewMore
