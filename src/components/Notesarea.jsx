import React, { useState, useEffect } from "react";
import sendIcon from "../assets/send.png";
import back from "../assets/back.png";
import "./Notes.css";
import { IoSend } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";

const Notesarea = (props) => {
  const [note, setNote] = useState("");

  let groupSelect = props.groupSelect;
  let notes = groupSelect.notes;
  let groups = props.groups;
  let setGroups = props.setGroups;

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    let newGroup = [...groups];

    let Cgroup = newGroup[groupSelect.id];

    let time = `${new Date().toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;

    let date = ` ${new Date().toLocaleDateString([], {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;

    Cgroup["notes"].push({ date, time, note });
    localStorage.setItem("groups", JSON.stringify(newGroup));
    setGroups(newGroup);
    setNote("");
  };
  const keypress = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
      setNote("");
    }
  };
  const parts = groupSelect.groupName.trim().split(/\s+/);
  console.log(parts[1]?.[0] || "");
  return (
    <>
      {screenSize.width < 989 ? (
        <div className="notesContainer">
          <div className="notesHeader" style={{ background: "rgb(0,31,139)" }}>
            <img
              src={back}
              alt={back}
              onClick={() => {
                window.location.reload();
              }}
            />
            <div
              className="notesGroup"
              style={{ background: groupSelect.color }}
            >
              {parts[0][0] + (parts[1]?.[0] || "")}
            </div>
            <h2
              className="groupName
            "
              style={{ color: "white" }}
            >
              {groupSelect.groupName}
            </h2>
          </div>
          <div className="NotesAndDateMobile">
            {notes.map((note) => (
              <div className="DateAndTextMobile">
                <p className="TextMobile">{note.note}</p>
                <div className="DateAndTimeMobile">
                  <p className="DateMobile">{note.date}</p>
                  <p className="TimeMobile">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="area" style={{ backgroundColor: "rgb(0,31,139)" }}>
            <div className="TextareaMobile">
              <textarea
                className="TextInputMobile"
                type="text"
                value={note}
                onChange={handleChange}
                placeholder="Enter your text here..."
                onKeyDown={keypress}
              ></textarea>
              {note ? (
                <IoSend
                  size="20px"
                  className="SendImgMobile"
                  onClick={handleSubmit}
                />
              ) : (
                <VscSend size="20px" className="SendImgMobile" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="notesContainer">
          <div className="notesHeader" style={{ background: "rgb(0,31,139)" }}>
            <div
              className="notesGroup"
              style={{ background: groupSelect.color }}
            >
              {parts[0][0] + (parts[1]?.[0] || "")}
            </div>
            <h2 className="groupName" style={{ color: "white" }}>
              {groupSelect.groupName}
            </h2>
          </div>
          <div className="NotesAndDate">
            {notes.map((note) => (
              <div className="DateAndText">
                <p className="Text">{note.note}</p>
                <div className="DateAndTime">
                  <p className="Date">{note.date}</p>
                  <p className="Time">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="area" style={{ backgroundColor: "rgb(0,31,139)" }}>
            <div className="Textarea">
              <textarea
                className="TextInput"
                type="text"
                value={note}
                onChange={handleChange}
                placeholder="Enter your text here..."
                onKeyDown={keypress}
              ></textarea>
              {note ? (
                <IoSend
                  size="30px"
                  className="SendImg"
                  onClick={handleSubmit}
                />
              ) : (
                <VscSend size="30px" className="SendImg" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notesarea;
