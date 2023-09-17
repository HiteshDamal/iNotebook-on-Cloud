
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notescontext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNotes } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    // props.showAlert("Added Successfully", "success")

  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const style1={backgroundColor:"rgb(125,31,163)"};
    const style2={marginTop:"10px"}

  return (
    <div className="container my-4 mx-6">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={handleChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={handleChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={note.title.length < 3 || note.description.length < 3}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          style={{...style1,...style2}}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
