import React, { useState } from "react";
import { axiosAuth } from "./utils/axiosAuth";
import AddForm from "./AddForm";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setDependency }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => 
      console.log(res.data),
      setDependency(true)
      )
      .catch(err => 
          console.log(err))
  };

  const deleteColor = color => {
    axiosAuth()
    .delete(`colors/${colorToEdit.id}`, color)
    .then(res => 
    console.log(res.data),
    updateColors(colors.filter((item) => item.id !== colorToEdit.id)
      )
    )
    .catch(err => 
        console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <p>Click on a color below to get started!</p>
        <div className="button-row2">
        </div>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={e => {
                            e.stopPropagation();
                            deleteColor()}}>
                            delete
                        </button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <div className="addColor">
        <p>AddColor</p>
        <AddForm updateColors={updateColors}/>
      </div>
      <div className ="spacer"/>
    </div>
  );
};

export default ColorList;