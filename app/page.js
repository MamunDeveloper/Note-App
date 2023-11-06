"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "./images/logo.png";
import Navbar from "./components/navbar/navbar";
import Notes from "./components/notes/notes";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import noteData from "./data/notes";
import NoteViewer from "./components/noteViewer/noteViewer";

export default function Home() {
  const [noteList, setNoteList] = useState(noteData);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("noteList")) || [];
    setNoteList(storedData);
  }, []);

  const [showOptions, setShowOptions] = useState(false);
  const [phoneView, setPhoneView] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const hideNav = () => {
    window.addEventListener("resize", handleScreenWidth);
    setShowOptions(!showOptions);
    handleScreenWidth();
  };

  // For checking the width of the window
  function handleScreenWidth() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 428 && typeof setPhoneView === "function") {
      setPhoneView(!phoneView);
    }
  }

  function toggleOpenNote(noteId) {
    setNoteOpen(!noteOpen);
    setIsEditing(!isEditing);
    setNoteId(noteId);
  }

  function addNote(note) {
    note.id = noteList.length + 1;
    setNoteList([note, ...noteList]);
    localStorage.setItem("noteList", JSON.stringify([note, ...noteList]));
    console.log(localStorage.getItem("noteList"));
  }
  function saveNote(noteId, editedText) {
    const note = noteList.find((notes) => {
      return notes.id === noteId;
    });
    note.text = editedText;
    localStorage.setItem("noteList", JSON.stringify(noteList));
  }

  function deleteNote(noteId) {
    const newList = noteList.filter((note) => {
      return note.id !== noteId;
    });
    setNoteList(newList);
    localStorage.setItem("noteList", JSON.stringify(newList));
  }

  return (
    <main className={styles.main}>
      {noteOpen && (
        <NoteViewer
          noteList={noteList}
          noteId={noteId}
          toggleOpenNote={toggleOpenNote}
          isEditing={isEditing}
          saveNote={saveNote}
          deleteNote={deleteNote}
        ></NoteViewer>
      )}

      <motion.div
        animate={
          showOptions && phoneView
            ? {
                backgroundColor: "rgb(255, 68, 0)",
                width: "100%",
              }
            : { width: 0 }
        }
        className={
          showOptions
            ? `${styles.navbar_container} ${styles.bg} `
            : styles.navbar_container
        }
        id="navbar"
      >
        <Navbar
          showOptions={showOptions}
          hideNav={hideNav}
          addNote={addNote}
        ></Navbar>
      </motion.div>

      <div className={styles.content}>
        <div className={styles.heading_box}>
          <Image src={logo} width={30} height={30} alt="Logo image"></Image>
          <h1 className={styles.heading}>Notes</h1>
        </div>
        <div className={styles.note_box}>
          <Notes
            noteList={noteList}
            toggleOpenNote={toggleOpenNote}
            saveNote={saveNote}
          ></Notes>
        </div>
      </div>
    </main>
  );
}
