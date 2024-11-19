import { useEffect, useState } from "react";

import SketchCanvas from "./SketchCanvas";
import FormInput from "../FormInput";
import Button from "../Button";
import usePost from "../../hooks/usePost";
import ErrorStack from "../ErrorStack";
import { useNavigate } from "react-router-dom";

const Sketch = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  const navigate = useNavigate();

  const [response, error, setError, sendRequest] = usePost(imageUrl, title, content);

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
      <div>
        <SketchCanvas onSave={(e) => setImageUrl(e)} />
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput label="Title" onChange={(e) => setTitle(e)} />
          <FormInput label="Description" onChange={(e) => setContent(e)} />
        </form>
        <Button onClick={handleSubmit} variant="default">Submit</Button>
      </div>
      <ErrorStack message={error} setMessage={setError} />
    </>
  )
};

export default Sketch;
