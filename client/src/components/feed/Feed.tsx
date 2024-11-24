import useGetPosts, {IPost} from "../../hooks/useGetPosts.ts";
import Post from "./Post.tsx";
import styles from "../../styles/feed/Feed.module.css";

const Feed = () => {
    const posts = useGetPosts()[0];
  return (
      <div className={styles["feed"]}>
          {posts ? (<>
              {posts.map((post:IPost) => (
                  <Post key={post._id} post={post} />
              ))}
              </>) : null}

      </div>
  )
}

export default Feed;
