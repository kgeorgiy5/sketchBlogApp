import {useParams} from "react-router-dom";
import useGetPostDetails from "../../hooks/posts/useGetPostDetails.ts";
import styles from "../../styles/posts/PostDetails.module.css";
import Button from "../Button.tsx";
import {FiDownload} from "react-icons/fi";
import {HiOutlineShare} from "react-icons/hi";
import getPostUrl from "../../utils/getPostUrl.ts";
import {FaHeart} from "react-icons/fa";

export default function(){
    const {id} = useParams();
    const postDetails = useGetPostDetails(id);
    const fileName = `sketch${id}.jpeg`;

    const shareHandler = () => {
        if(!id){
            return;
        }

        const url = getPostUrl(id);
        navigator.clipboard.writeText(url);
    }

    return (
        <div className={styles["post-main"]}>
            {postDetails ? (
                <>
                    <div className={styles["post-details"]}>
                        <h1 className={styles["post-title"]}>{postDetails.title}</h1>
                        <p className={styles["post-author"]}>by {postDetails.email}</p>
                        <p className={styles["post-likes"]}><FaHeart/> {postDetails.numberOfLikes}</p>
                    </div>

                    <div className={styles["post-content"]}>
                        <img className={styles["sketch"]} src={`data:image/jpeg;base64,${postDetails.content}`}
                             alt={postDetails.title}/>
                        <div className={styles["post-content__details"]}>
                            <p className={styles["post-content__text"]}>{postDetails.text}</p>
                        </div>
                    </div>

                    <div className={styles["post-buttons"]}>
                        <Button filename={fileName} link={`data:image/jpeg;base64,${postDetails.content}`}
                                variant={"default"}>Download Sketch {<FiDownload
                            size="1rem"/>}</Button>
                        <Button onClick={shareHandler} variant={"default"}>Share Sketch <HiOutlineShare
                            size="1rem"/></Button>
                    </div>
                </>
            ) : null}
        </div>
    )
}