import { create } from "zustand";

export const usePostsStore = create((set) => ({
    posts: [{
        id: 1,
        title: "Post1",
        description: "post description"
    }, {
        id: 2,
        title: "Post2",
        description: "post Description"
    }],
    addPost: (newPost) => {
        set((state) => {
            return {posts: [...state.posts, newPost]}
        })
    },
    editPost: (id, updatePost) => {
        set((state) => {
            const updatePosts = state.posts.map((post) => {
                if (post.id === id)
                    return {...post, ...updatePost}
                return post
            })

            return {posts: updatePosts}
        })
    },
    deletePost: (id) => {
        set((state) => {
            const filteredPosts = state.posts.filter(post => post.id !== id);
            return {posts: filteredPosts}
        })
    }
}))