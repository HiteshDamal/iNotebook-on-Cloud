
import React, { useState, useContext } from "react";
import noteContext from "../context/notes/notescontext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { Notes, updateNote } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-header "style={{backgroundColor:"rgb(125,31,163)"}}>
          <div className="header-container d-flex justify-content-between" style={{color:"white"}} >
          {Notes.title}
          <div className="icon">
          <i className={`fa-solid fa-trash mx-2 ${isHovered ? "fa-fade" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                deleteNote(Notes._id);
                props.showAlert("Deleted Successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(Notes);
              }}
            ></i>
          </div>
        </div></div>
       
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{Notes.description}</p>
            <footer className="footer">
              {Notes.time}
              <cite title="Source Title">{Notes.lastUpdated}</cite>
            </footer>
           
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
