import { Dialog, LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import usePostData from '../../../hooks/usePostData';
import { useQueryClient } from 'react-query';
import resizeImage from '../../../utils/resizeImage';


type AddNewUploadFileProps = {
    setShowAddStory: (value : boolean) => void,
    setShowIsUploadFileStory: (value : boolean) => void,
    showIsUploadFileStory : boolean,
}

const AddNewUploadFile = ({ showIsUploadFileStory, setShowIsUploadFileStory, setShowAddStory } : AddNewUploadFileProps) => {

    const [storyImage, setStoryImage] = useState<null | File>(null);
    const [storyPreview, setStoryPreview] = useState<string>("");
    const [dragged, setDragged] = useState(false);

    const queryClient = useQueryClient();
    const { mutate: addNewStory, isLoading } = usePostData(
        'story/createStory',
        "Story Uploaded successfuly",
        false,
        () => {
            setStoryImage(null);
            setStoryPreview("");
            setShowAddStory(false);
            setShowIsUploadFileStory(false);
            queryClient.invalidateQueries(["getAllStories"]);
        },
        true
    );


    const handleDragChange = () => {
        setDragged(!dragged);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        setStoryImage(null);
        setStoryPreview("")
        reader.onload = () => {
            if (reader.readyState === 2) {
                setStoryPreview(reader.result as string);
            }
        };
        if (e.target.files) {
            reader.readAsDataURL(e.target.files[0]);
            setStoryImage(e.target.files[0]);
        }

    }

    const newPostSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    
        if (!storyImage) {
            toast.error("Select Image");
            return;
        }
    
        const formData = new FormData();
    
        try {
            // Await the resized image file before setting it to FormData
            const resizedImage = await resizeImage(storyImage as File, 500, 300);
            formData.set("storyMedia", resizedImage);
    
            // Call the function to add the story with the FormData
            addNewStory(formData);
        } catch (error) {
            console.error("Error resizing image:", error);
            toast.error("Image resizing failed.");
        }
    };
    



    return (
        <Dialog open={showIsUploadFileStory} onClose={() => setShowIsUploadFileStory(false)} maxWidth='xl'>
            <div className="flex flex-col sm:w-screen max-w-4xl bg-white dark:bg-black">
                <div className=" py-3 border-b  dark:border-gray-300/20 border-gray-300 px-4 flex justify-between w-full">
                    <span className="font-medium">Create new post</span>
                    <button onClick={newPostSubmitHandler} disabled={isLoading} className="text-blue-500 font-medium">Share</button>
                </div>

                <div className="flex sm:flex-row sm:items-start items-center flex-col w-full">

                    {storyImage ?
                        <div className=" h-48 sm:h-[80vh] w-full">
                            <img draggable="false" className="object-contain h-full w-full" src={storyPreview} alt="post" />
                        </div>
                        :
                        <div onDragEnter={handleDragChange} onDragLeave={handleDragChange} className={`${dragged && 'opacity-40'} relative h-36 sm:h-[80vh] w-full flex flex-col gap-2 items-center justify-center mx-16`}>
                            <svg aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            <p className="text-xl">Drag photos and videos here</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute h-full w-full opacity-0" />
                        </div>
                    }

                    <div className="flex flex-col border-l dark:border-gray-300/20 border-gray-300 sm:h-[80vh] w-full ">

                        {/* <div className="flex gap-3 px-3 py-2 items-center">
                            <img draggable="false" className="w-11 h-11 rounded-full object-cover" src={user.avatar} alt="avatar" />
                            <span className="text-black text-sm font-semibold">{user.username}</span>
                        </div> */}

                        <form onSubmit={e => e.preventDefault} className="p-3 w-full border-b dark:border-gray-300/20 border-gray-300 relative">
                            <div className='flex items-center'>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-[150px] text-sm text-white
                                    dark:text-black
                            file:py-2 file:px-6
                            file:rounded-full file:border-0
                            file:text-sm file:cursor-pointer file:font-semibold
                            file:bg-purple-100 file:text-purple-700
                            hover:file:bg-purple-200
                            "/>
                                {/* <p className='text-sm text-slate-500'> {postImage ? postImage.name : "No file Choosen"}</p> */}
                            </div>
                            <div className="flex justify-center w-full mt-4">
                                <button onClick={newPostSubmitHandler} disabled={isLoading} className="bg-primary-blue hover:bg-primaryhover-blue transition-all duration-300 w-full text-white py-1.5 rounded font-medium hover:drop-shadow-lg uppercase text-sm tracking-wider">Upload Story</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}

export default AddNewUploadFile