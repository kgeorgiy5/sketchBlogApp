import {FC, useState} from "react";
import { HiOutlineShare } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";

import {IPost} from "../../hooks/useGetPosts.ts";
import styles from "../../styles/feed/Post.module.css";
import Button from "../Button.tsx";
import useLikePost from "../../hooks/useLikePost.ts";
import {useNavigate} from "react-router-dom";
import getPostUrl from "../../utils/getPostUrl.ts";

interface IPostProps{
    post: IPost;
}

const Post:FC<IPostProps> = ({post}) => {
    const navigate = useNavigate();

    const [likes, setLikes] = useState<number>(post.numberOfLikes);

    const detailsHandler = () => {
        const path = `/post/${post._id}`

        navigate(path);
    }

    const shareHandler = () => {
        const url = getPostUrl(post._id);
        navigator.clipboard.writeText(url);
    }

    const likeHandler = useLikePost(post._id, () => {
        setLikes(prevState => ++prevState);
    });

   return(
       <div className={styles["post"]}>
           <h2 className={styles["post-title"]}>{post.title}</h2>
           <img className={styles["sketch"]} src={`data:image/jpeg;base64,${post.content}`} alt={post.title} />
           <div className={styles["post-buttons"]}>
               <p className={styles["post-likes"]}>{likes}</p>
               <Button onClick={likeHandler} variant={"toolbar"}>{<FaRegHeart size="1rem"/>}</Button>
               <Button
                   filename={`sketch${post._id}.jpeg`}
                   link={`data:image/jpeg;base64,${post.content}`}
                   variant={"toolbar"}>{<FiDownload size="1rem"/>}</Button>
               <Button onClick={shareHandler} variant={"toolbar"}><HiOutlineShare size="1rem"/></Button>
               <Button onClick={detailsHandler} variant={"toolbar"}><LuMoreHorizontal size="1rem"/></Button>
           </div>
       </div>
   )
}

export default Post;