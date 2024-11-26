import { useEffect, useState } from "react";

import styles from "../../../styles/user/sketch/Sketch.module.css";
import SketchCanvas from "./SketchCanvas.tsx";
import FormInput from "../../FormInput.tsx";
import Button from "../../Button.tsx";
import usePost from "../../../hooks/user/usePost.ts";
import { useNavigate } from "react-router-dom";

const Sketch = () => {
  const [image, setImage] = useState<Blob>();
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();

  const navigate = useNavigate();

  const [response, sendRequest] = usePost(title, text, image);

  useEffect(() => {
    if (response) {
      navigate("/");
    }

  }, [response, navigate])

  const handleSubmit = () => {
    sendRequest();
  }

  return (
    <>
      <div className={styles['sketch']}>
        <SketchCanvas onSave={(e) => setImage(e)}/>
        <form className={styles["form"]} onSubmit={(e) => e.preventDefault()}>
          <FormInput label="Sketch" onChange={(e) => setTitle(e)}/>
          <textarea className={styles["textarea"]} onChange={(e) => setText(e.target.value)}/>
          <Button onClick={handleSubmit} variant="default">Submit</Button>
        </form>
      </div>
    </>
  )
};

export default Sketch;
