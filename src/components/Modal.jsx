import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [formData, setFormData] = useState({ grpName: " ", color: "white" });
  const setGroups = props.setGroups;
  const groups = props.groups;
  const closeModal = props.closeModal;
  const color = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

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
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute("color"),
    });
  };
  const modalRef = useRef();

  useEffect(() => {
    // Handle outside click
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(false); // close modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleSubmit = () => {
    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    //console.log(groups);
    setGroups(newGroup);
    localStorage.setItem("groups", JSON.stringify(newGroup));
    closeModal(false);
    //console.log(formData);
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <>
          <div className="modalBackgroundMobile">
            <div className="modalContainerMobile">
              <h2 className="modalHeading">Create New Group</h2>
              <label className="modalGrp">Group Name</label>
              <input
                type="text"
                className="modalTextMobile"
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
              <br />
              <label className="modalColor">Choose Colour</label>
              {color.map((color, index) => (
                <button
                  className="colorButton"
                  name="color"
                  color={color}
                  key={index}
                  id={color}
                  style={{
                    height: "40px",
                    width: "40px",
                    background: color,
                    borderRadius: "25px",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={handleChangeColor}
                ></button>
              ))}
              <button className="modalCreateMobile" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="modalBackground">
          <div className="modalContainer">
            <h2 className="modalHeading">Create New group</h2>
            <label className="modalGrp">Group Name</label>
            <input
              type="text"
              className="modalText"
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className="modalColor">Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`colorButton  ${
                  formData.color === color ? "selected" : ""
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: "40px",
                  width: "40px",
                  background: color,
                  borderRadius: "25px",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className="modalCreate" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
