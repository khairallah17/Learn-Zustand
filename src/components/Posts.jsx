"use client"
import React, { useState } from 'react'
import { usePostsStore } from '@/store/Posts'

const Posts = () => {
    
    const { posts, addPost, editPost, deletePost } = usePostsStore()
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [postId, setPostId] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    const handleAddPost = (e) => {
        e.preventDefault()

        const newPost = {
            id: Date.now(),
            title,
            description
        }

        addPost(newPost)
        setTitle("")
        setDescription("")

    }

    const editAPost = (id) => {

        const post = posts.filter((pos) => pos.id === id)[0]
        setTitle(post.title)
        setDescription(post.description)
        setPostId(id)
        setIsEdit(true)
    }

    const handleEditPost = (e) => {
        e.preventDefault()

        editPost(postId, {
            title,
            description,
            id: postId
        })

        clearPostFields()

    }

    const clearPostFields = () => {

        setTitle("")
        setDescription("")
        setPostId(null)
        setIsEdit(false)

    }

    const handleDeletePost = (id) => {
        deletePost(id)
    }

    return (
        <div>
            <form onSubmit={isEdit ? handleEditPost : handleAddPost} className='flex flex-col gap-3'>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Post title' className='outline-none py-2 px-4 bg-transparent border-slate-500 border rounded-md' required/>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className='outline-none py-2 px-4 bg-transparent border-slate-500 border rounded-md' id="" placeholder='enter post description' cols="30" rows="10" required></textarea>
                <button type="submit" className={`${isEdit ? "bg-yellow-500" : "bg-green-500"} py-2 mb-3 rounded-md`}>
                    {isEdit ? "Edit Post" : "Add Post"}
                </button>
                {
                    isEdit && (
                        <button onClick={() => clearPostFields()} className='rounded-md py-2 mb-3 bg-orange-500'>
                            Clear
                        </button>
                    )
                }
            </form>
            <h1 className='text-5xl font-bold mb-3'>Posts</h1>
            {
                posts && posts.map((item, index) => (
                    <div key={index} className='border border-slate-500 p-4 mb-3 rounded-md'>
                        <h3 className='text-3xl font-bold'>
                            {item.title}
                        </h3>
                        <p className='py-3 text-lg'>
                            {item.description}
                        </p>
                        <div className='flex'>
                            <button onClick={() => editAPost(item.id)} className='bg-red-500 rounded-md px-8 py-2 mr-3 w-full'>
                                Edit
                            </button>
                            <button onClick={() => handleDeletePost(item.id)} className='bg-blue-500 rounded-md px-8 py-2 w-full'>
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Posts