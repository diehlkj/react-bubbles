import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {

  console.log(colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToPost, setColorToPost] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    // console.log(colorToEdit);

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('[[PUT]] [[SUCCESS]] App.js > BubblePage.js > ColorList.js :: saveEdit ~ axiosWithAuth res == ', res);

        axiosWithAuth()
          .get('/colors')
          .then(res => {
            console.log('[[GET]] [[SUCCESS]] App.js > BubblePage.js > ColorList.js :: saveEdit ~ axiosWithAuth ~ axiosWithAuth res == ', res);
            updateColors(res.data);
            setEditing(false);
          })
          .catch(err => {
            console.log('[[GET]] [[ERROR]] App.js > BubblePage.js > ColorList.js :: saveEdit ~ axiosWithAuth ~ axiosWithAuth err == ', err);
          })
      })
      .catch(err => {
        console.log('[[PUT]] [[ERROR]] App.js > BubblePage.js > ColorList.js :: saveEdit ~ axiosWithAuth err == ', err);
      })
  };

  const saveNewColor = e => {
    e.preventDefault();

    console.log(colorToPost);

    axiosWithAuth()
      .post(`/colors`, colorToPost)
      .then(res => {
        console.log('[[POST]] [[SUCCESS]] App.js > BubblePage.js > ColorList.js :: saveNewColor ~ axiosWithAuth res == ', res);

        axiosWithAuth()
          .get('/colors')
          .then(res => {
            console.log('[[GET]] [[SUCCESS]] App.js > BubblePage.js > ColorList.js :: saveNewColor ~ axiosWithAuth ~ axiosWithAuth res == ', res);
            updateColors(res.data);
            setEditing(false);
          })
          .catch(err => {
            console.log('[[GET]] [[ERROR]] App.js > BubblePage.js > ColorList.js :: saveNewColor ~ axiosWithAuth ~ axiosWithAuth err == ', err);
          })
      })
      .catch(err => {
        console.log('[[POST]] [[ERROR]] App.js > BubblePage.js > ColorList.js :: saveNewColor ~ axiosWithAuth err == ', err);
      })
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log('[[DELETE]] [[SUCCESS]] App.js > BubblePage.js > ColorList.js :: deleteColor ~ axiosWithAuth res == ', res);
        axiosWithAuth()
          .get('/colors')
          .then(res => {
            console.log('[[GET]] [[SUCCESS]] App.js > BubblePage.js > ColorList.js :: deleteColor ~ axiosWithAuth ~ axiosWithAuth res == ', res);
            updateColors(res.data);
            setEditing(false);
          })
          .catch(err => {
            console.log('[[GET]] [[ERROR]] App.js > BubblePage.js > ColorList.js :: deleteColor ~ axiosWithAuth ~ axiosWithAuth err == ', err);
          })
      })
      .catch(err => {
        console.log('[[DELETE]] [[ERROR]] App.js > BubblePage.js > ColorList.js :: deleteColor ~ axiosWithAuth err == ', err);
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => {
          // console.log('Color Mapped: ', color);
          return (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span className="delete" onClick={e => {
                      e.stopPropagation();
                      deleteColor(color)
                    }
                  }>
                    x
                </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          );
        })}
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
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={saveNewColor}>
          <legend>new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToPost({ ...colorToPost, color: e.target.value })
              }
              value={colorToPost.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToPost({
                  ...colorToPost,
                  code: { hex: e.target.value }
                })
              }
              value={colorToPost.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">submit</button>
            <button onClick={() => setColorToPost(initialColor)}>clear</button>
          </div>
        </form>
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
