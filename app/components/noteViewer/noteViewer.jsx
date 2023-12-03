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
        <div className={styles.date_box}>{note.date}</div>

        <div className={styles.text_box_container}>
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
            <div className={styles.save_icon_box}>
              <FontAwesomeIcon
                className={styles.save_icon}
                icon={faFile}
                onClick={() => handleSave(note.id)}
              ></FontAwesomeIcon>
              <label htmlFor="save_icon" className={styles.labels}>
                Save
              </label>
            </div>
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

          <div className={styles.delete_icon_box}>
            <FontAwesomeIcon
              className={styles.delete_icon}
              icon={faTrash}
              onClick={() => handleDelete(note.id)}
            ></FontAwesomeIcon>
            <label htmlFor="delete_icon" className={styles.labels}>
              Delete
            </label>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default NoteViewer;
