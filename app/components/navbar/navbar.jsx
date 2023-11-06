"use client";
import React, { useState } from "react";
import style from "@/app/components/navbar/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Navbar({ hideNav, showOptions, addNote }) {
  let initialNote = {
    text: "Empty note",
  };

  const [note, setNote] = useState(initialNote);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const getCurrentDate = () => {
    const now = new Date();

    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      day: "numeric",
      month: "short",
    };

    const formattedTime = now.toLocaleString("en-US", options);
    return formattedTime;
  };

  const handleAdd = (bgColor) => {
    note.date = getCurrentDate();
    note.bgColor = bgColor;
    addNote(note);
    setNote(initialNote);
    hideNav();
  };

  return (
    <div className={style.nav_box}>
      <FontAwesomeIcon
        icon={faPlusCircle}
        className={style.icons}
        onClick={hideNav}
      ></FontAwesomeIcon>

      {showOptions && (
        <motion.div
          className={style.options_box}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            className={style.option_buttons}
            id={style.white_note}
            variants={item}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleAdd("antiquewhite")}
          ></motion.button>

          <motion.button
            className={style.option_buttons}
            id={style.red_note}
            variants={item}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleAdd("red")}
          ></motion.button>

          <motion.button
            className={style.option_buttons}
            id={style.blue_note}
            variants={item}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleAdd("blue")}
          ></motion.button>

          <motion.button
            className={style.option_buttons}
            id={style.green_note}
            variants={item}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAdd("green")}
          ></motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default Navbar;
