import React, { useState, useRef } from 'react';
//initial value of fileInput set to null - this ensures that the reference to the DOM element is current
const fileInput = useRef(null);

const ThoughtForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    thought: "",
  });
  const [characterCount, setCharacterCount] = useState(0);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();

    //POST - new thought - Fetch function - send the form data to the endpoint in the body of the request
    const postData = async () => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      console.log(data);
    };
    postData();

    // clear form value
    setFormState({ username: "", thought: "" });
    setCharacterCount(0);
  };
  //handleImageUpload function - Upload image button - retrieves the image file uploaded by the user 
  const handleImageUpload = (event) => {
    //preventDefault - so the image can be uploaded before the thought is saved
    event.preventDefault();
    const data = new FormData();
    data.append('image', fileInput.current.files[0]);
    // send image file to endpoint with the postImage function
    // ...
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
        Character Count: {characterCount}/280
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Name"
          name="username"
          value={formState.username}
          className="form-input col-12 "
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="Here's a new thought..."
          name="thought"
          value={formState.thought}
          className="form-input col-12 "
          onChange={handleChange}
        ></textarea>
        <label className="form-input col-12  p-1">
          Add an image to your thought:
          <input type="file" ref="{fileInput}" className="form-input p-2" />
          <button className="btn" onClick="{handleImageUpload}" type="submit">
            Upload
          </button>
        </label>
        <button className="btn col-12 " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
