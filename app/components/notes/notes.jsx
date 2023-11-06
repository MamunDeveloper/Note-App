import React from "react";
import Note from "../note/note";

function Notes({ noteList, toggleOpenNote, saveNote }) {
  return (
    <>
      {noteList.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleOpenNote={toggleOpenNote}
          saveNote={saveNote}
        ></Note>
      ))}
    </>
  );
}

export default Notes;
