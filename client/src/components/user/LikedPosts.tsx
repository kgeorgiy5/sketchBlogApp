import useGetLikedPosts from "../../hooks/user/useGetLikedPosts.ts";
import styles from "../../styles/posts/Feed.module.css";
import Post from "../posts/Post.tsx";
import {IPost} from "../../hooks/posts/useGetPosts.ts";

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