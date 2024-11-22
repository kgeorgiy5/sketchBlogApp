import {FC} from "react";
import { HiOutlineShare } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

import {IPost} from "../../hooks/useGetPosts.ts";
import styles from "../../styles/feed/Post.module.css";
import Button from "../Button.tsx";


interface IPostProps{
    post: IPost;
}

const Post:FC<IPostProps> = ({post}) => {
   return(
       <div className={styles["post"]}>
           <h2 className={styles["post-title"]}>{post.title}</h2>
           <img className={styles["sketch"]} src={`data:image/jpeg;base64,${post.content}`} alt={post.title} />
           <div className={styles["post-buttons"]}>
               <Button onClick={() => console.log("clicked")} variant={"toolbar"}>{<FaRegHeart size="1rem"/>}</Button>
               <Button onClick={() => console.log("clicked")} variant={"toolbar"}>{<FiDownload size="1rem"/>}</Button>
               <Button onClick={() => console.log("clicked")} variant={"toolbar"}><HiOutlineShare size="1rem"/></Button>
           </div>
       </div>
   )
}

export default Post;