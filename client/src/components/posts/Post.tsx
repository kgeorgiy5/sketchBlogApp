import {FC, useEffect, useState} from "react";
import { HiOutlineShare } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
;

import {IPost} from "../../hooks/posts/useGetPosts.ts";
import styles from "../../styles/posts/Post.module.css";
import Button from "../Button.tsx";
import useLikePost from "../../hooks/user/useLikePost.ts";
import {useNavigate} from "react-router-dom";
import getPostUrl from "../../utils/getPostUrl.ts";
import useCheckLiked from "../../hooks/user/useCheckLiked.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import useDeletePost from "../../hooks/user/useDeletePost.ts";

interface IPostProps{
    post: IPost;
    onLike?: () => void;
}

const Post:FC<IPostProps> = ({post, onLike}) => {
    const navigate = useNavigate();

    const userId = useSelector((state:RootState) => state.user.userId);
    const deletePost = useDeletePost(post._id);

    console.log(userId);
    console.log(post.userId);

    const [likes, setLikes] = useState<number>(post.numberOfLikes);

    const [isLiked, setIsLiked] = useCheckLiked(post._id);
    const [isLikeDisabled, setIsLikeDisabled] = useState(false);

    const detailsHandler = () => {
        const path = `/post/${post._id}`
        navigate(path);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLikeDisabled(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [isLikeDisabled]);

    const shareHandler = () => {
        const url = getPostUrl(post._id);
        navigator.clipboard.writeText(url);
    }

    const likeHandler = useLikePost(post._id,
        (numberOfLikes) => {
            setLikes(numberOfLikes);
            setIsLiked((prevState:boolean) => !prevState);
            setIsLikeDisabled(true);
            if(onLike){
                onLike();
            }
        });

   return(
       <div className={styles["post"]}>
           <h2 className={styles["post-title"]}>{post.title}</h2>
           <img className={styles["sketch"]} src={`data:image/jpeg;base64,${post.content}`} alt={post.title} />
           <div className={styles["post-buttons"]}>
               <p className={styles["post-likes"]}>{likes}</p>
               <Button
                   onClick={likeHandler}
                   variant={"toolbar"}
                    disabled={isLikeDisabled}>
                       {isLiked ? <FaHeart size="1rem"/> : <FaRegHeart size="1rem" />}
               </Button>
               <Button
                   filename={`sketch${post._id}.jpeg`}
                   link={`data:image/jpeg;base64,${post.content}`}
                   variant={"toolbar"}>{<FiDownload size="1rem"/>}</Button>
               <Button onClick={shareHandler} variant={"toolbar"}><HiOutlineShare size="1rem"/></Button>
               {userId.toString() === post.userId.toString() ? (
                   <>
                       <Button variant="toolbar" onClick={deletePost}><MdDeleteOutline size="1rem"/></Button>
                   </>
               ) : null}
               <Button onClick={detailsHandler} variant={"toolbar"}><LuMoreHorizontal size="1rem"/></Button>
           </div>
       </div>
   )
}

export default Post;