import { useEffect, useState } from "react";

import styles from "../../styles/sketch/Sketch.module.css";
import SketchCanvas from "./SketchCanvas";
import FormInput from "../FormInput";
import Button from "../Button";
import usePost from "../../hooks/usePost";
import ErrorStack from "../ErrorStack";
import { useNavigate } from "react-router-dom";

const Sketch = () => {
  const [image, setImage] = useState<Blob>();
  const [title, setTitle] = useState<string>();

  const navigate = useNavigate();

  const [response, error, setError, sendRequest] = usePost(title, image);

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
        <form className={styles["title-form"]} onSubmit={(e) => e.preventDefault()}>
          <FormInput label="Sketch" onChange={(e) => setTitle(e)} />
          <Button onClick={handleSubmit} variant="default">Submit</Button>
        </form>
        <SketchCanvas onSave={(e) => setImage(e)} />
      </div>
      <ErrorStack message={error} setMessage={setError} />
    </>
  )
};

export default Sketch;
