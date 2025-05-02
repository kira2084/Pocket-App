import React, { useState, useEffect } from "react";
import sendIcon from "../assets/send.png";
import back from "../assets/back.png";
import "./Notes.css";

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

  return (
    <>
      {screenSize.width < 989 ? (
        <div className="notesContainer">
          <div className="notesHeader">
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
              {groupSelect.groupName?.slice(0, 1)?.toUpperCase() +
                groupSelect.groupName.split(" ")[1].toUpperCase()}
            </div>
            <h2
              className="groupName
            "
            >
              {groupSelect.groupName?.slice(0, 1)?.toUpperCase() +
                groupSelect.groupName.split(" ")[1].toUpperCase()}
            </h2>
          </div>
          <div className="NotesAndDateMobile">
            {notes.map((note) => (
              <div className="DateAndTextMobile">
                <p className="TextMobile">{note.note}</p>
                <div className="DateAndTimeMobile">
                  <p className="TimeMobile">{note.time}</p>
                  <p className="DateMobile">{note.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="TextareaMobile">
            <textarea
              className="TextInputMobile"
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
            ></textarea>
            {note && (
              <img
                src={sendIcon}
                className="SendImgMobile"
                alt="SendImg"
                onClick={handleSubmit}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="notesContainer">
          <div className="notesHeader">
            <div
              className="notesGroup"
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 1)?.toUpperCase() +
                groupSelect.groupName.split(" ")[1].toUpperCase()}
            </div>
            <h2 className="groupName">{groupSelect.groupName}</h2>
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
          <div className="Textarea">
            <textarea
              className="TextInput"
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
            ></textarea>
            {note && (
              <img
                src={sendIcon}
                className="SendImg"
                alt="SendImg"
                onClick={handleSubmit}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Notesarea;
