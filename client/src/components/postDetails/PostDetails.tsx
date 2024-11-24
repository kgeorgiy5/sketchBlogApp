import {useParams} from "react-router-dom";
import useGetPostDetails from "../../hooks/useGetPostDetails.ts";
import styles from "../../styles/postDetails/PostDetails.module.css";
import Button from "../Button.tsx";
import {FiDownload} from "react-icons/fi";
import {HiOutlineShare} from "react-icons/hi";
import getPostUrl from "../../utils/getPostUrl.ts";

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
                    </div>
                    <div className={styles["post-buttons"]}>
                    <Button filename={fileName} link={`data:image/jpeg;base64,${postDetails.content}`}
                                variant={"default"}>Download Sketch {<FiDownload
                            size="1rem"/>}</Button>
                        <Button onClick={shareHandler} variant={"default"}>Share Sketch <HiOutlineShare
                            size="1rem"/></Button>
                    </div>
                    <img className={styles["sketch"]} src={`data:image/jpeg;base64,${postDetails.content}`}
                         alt={postDetails.title}/>
                    <p className={styles["post-likes"]}>Likes: {postDetails.numberOfLikes}</p>
                </>
            ) : null}
        </div>
    )
}