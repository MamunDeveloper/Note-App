import React, { useState } from "react";
import styles from "@/app/components/noteViewer/noteViewer.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsToDot,
  faFile,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function NoteViewer({
  noteList,
  noteId,
  toggleOpenNote,
  isEditing,
  saveNote,
  deleteNote,
}) {
  const note = noteList.find((notes) => {
    return notes.id === noteId;
  });

  const [noteText, setNoteText] = useState(note.text);

  const handleSave = (noteId) => {
    saveNote(noteId, noteText);
    toggleOpenNote();
  };

  const handleDelete = (noteId) => {
    deleteNote(noteId);
    toggleOpenNote();
  };

  return (
    <>
      <motion.div
        drag
        className={styles.notes}
        key={note.id}
        style={{
          backgroundColor: note.bgColor,
        }}
      >
        <div>{note.date}</div>

        <div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className={styles.text_box}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.icon_box}>
          {isEditing ? (
            <FontAwesomeIcon
              icon={faFile}
              onClick={() => handleSave(note.id)}
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => handleEdit(note.id)}
            ></FontAwesomeIcon>
          )}

          <FontAwesomeIcon
            icon={faArrowsToDot}
            onClick={toggleOpenNote}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(note.id)}
          ></FontAwesomeIcon>
        </div>
      </motion.div>
    </>
  );
}

export default NoteViewer;
