import useGetLikedPosts from "../hooks/useGetLikedPosts.ts";
import styles from "../styles/feed/Feed.module.css";
import Post from "./feed/Post.tsx";
import {IPost} from "../hooks/useGetPosts.ts";

const LikedPosts = () => {
    const [likedPosts, sendRequest] = useGetLikedPosts();

    return(
        <div className={styles["feed"]}>
            {likedPosts.map((post:IPost) => (
                <Post key={post._id} post={post} onLike={sendRequest} />
            ))}
        </div>
    )
}

export default LikedPosts;