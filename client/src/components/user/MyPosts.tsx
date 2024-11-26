import styles from "../../styles/posts/Feed.module.css";
import useGetMyPosts from "../../hooks/user/useGetMyPosts.ts";
import Post from "../posts/Post.tsx";
import {IPost} from "../../hooks/posts/useGetPosts.ts";

const MyPosts = () => {
    const posts = useGetMyPosts();
  return (
      <>
          <div className={styles["feed"]}>
              {posts.length > 0 ?
                  posts.map((post: IPost) => (
                      <Post key={post._id} post={post}/>
                  ))
               : null}
          </div>
      </>
  )
};

export default MyPosts;
