import React, { useState } from "react";
import styles from "@/app/components/note/note.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpDownLeftRight,
  faFile,
  faPen,
  faTrash,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Note({ note, toggleOpenNote, saveNote }) {
  const handleOpen = (noteId) => {
    toggleOpenNote(noteId);
  };

  return (
    <motion.div
      className={`${styles.notes} `}
      style={{
        backgroundColor: note.bgColor,
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div>
        {note.text.substring(0, 40)}
        {note.text.length > 40 ? "..." : ""}
      </div>

      <div className={styles.detail_box}>
        <div>{note.date}</div>

        <div className={styles.icon_box}>
          <FontAwesomeIcon
          className={styles.open_arrow}
            icon={faArrowsUpDownLeftRight}
            onClick={() => handleOpen(note.id)}
          ></FontAwesomeIcon>

          {/* <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> */}
        </div>
      </div>
    </motion.div>
  );
}

export default Note;
