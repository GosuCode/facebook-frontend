import React, { useEffect, useState } from 'react'
import fbicon from '../assets/fbicon.png'
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiFillLike } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Posts = () => {

    const [getPost, setGetPost] = useState([])
    const navigate = useNavigate();

    const getData = async () => {
        try {
            axios.get("http://localhost:4000/posts")
                .then((res) => {
                    // console.log(res.data);
                    setGetPost(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {     //don't go to the posts page if user is not logged in
            navigate("/login");
        } else {
            getData();
        }
    }, []);

    const likeAPost = (postId) => {
        axios
            .post(
                "http://localhost:4000/likes",
                { PostId: postId },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            )
            .then((response) => {
                setGetPost(
                    getPost.map((post) => {
                        if (post.id === postId) {      //logic to update the likes
                            if (response.data.liked) {
                                return { ...post, Likes: [...post.Likes, 0] };
                            } else {
                                const likesArray = post.Likes;
                                likesArray.pop();
                                return { ...post, Likes: likesArray };
                            }
                        } else {
                            return post;
                        }
                    })
                );
            });
    };

    //delete post if the user is the one who created it
    const deletePost = (id) => {
        axios
            .delete(
                `http://localhost:4000/posts/${id}`,
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            )
            .then((response) => {
                console.log(response);
                navigate('/posts');
                // setGetPost(getPost.filter((post) => post.id !== postId));
            });
    }

    return (
        <div className='grid justify-center text-white'>
            {
                getPost.map((val, i) => {
                    return (

                        <div className='h-[400px] w-[600px] shadow-lg shadow-black mt-4 rounded-md grid content-between' key={i}>
                            <div className='grid grid-cols-12 w-full bg-blue-500 rounded-t-md'>
                                <div>
                                    <img src={fbicon} alt="" height={40} width={40} />
                                </div>
                                <div className='col-start-2 col-span-9'>
                                    <p>{val.username}</p>
                                    <p>{val.createdAt}</p>
                                </div>
                                <div className='grid items-center text-xl'>
                                    <FiMoreHorizontal />
                                </div>
                                <div
                                    //show delete icon if the user is the on who posted
                                    // style={
                                    //     val.username === localStorage.getItem("username")
                                    //         ? { display: "block" }
                                    //         : { display: "none" }
                                    // }
                                    onClick={() => deletePost(val.id)}
                                    className='grid items-center text-xl'>
                                    <RxCross2 />
                                </div>
                            </div>
                            <div className='text-center'>
                                <Link to={`/viewmore/${val.id}`}>
                                    <div>
                                        {val.title} <br />
                                        {val.description}
                                    </div>
                                </Link>
                            </div>

                            <div className='w-full bg-gray-500 p-2'>
                                <div className='flex items-center'>
                                    <AiFillLike
                                        size={30}
                                        className={
                                            //if a user liked, text color white else black
                                            val.Likes.includes(0)
                                                ? "text-white"
                                                : "text-gray-400"
                                        }
                                        onClick={() => {
                                            likeAPost(val.id);
                                        }} />
                                    <label className='ml-2 text-xl'>{val.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Posts
