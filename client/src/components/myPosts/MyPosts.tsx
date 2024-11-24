import styles from "../../styles/feed/Feed.module.css";
import useGetMyPosts from "../../hooks/useGetMyPosts.ts";
import Post from "../feed/Post.tsx";
import {IPost} from "../../hooks/useGetPosts.ts";

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
