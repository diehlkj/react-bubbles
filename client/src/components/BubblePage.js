import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useState(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        console.log('[[SUCCESS]] App.js > BubblePage.js :: useState axiosWithAuth res == ', res);
        setColorList(res.data);
      })
      .catch(err => {
        console.log('[[ERROR]] App.js > BubblePage.js :: useState axiosWithAuth err == ', err);
      })
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
