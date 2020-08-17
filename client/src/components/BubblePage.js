import React, { useState, useEffect } from "react";
import { axiosAuth } from "./utils/axiosAuth";
import {Link} from "react-router-dom";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  const [dependency, setDependency] = useState(false);
  useEffect(() => {
    axiosAuth()
    .get("colors")
    .then( res => {setColorList(res.data); setDependency(false)})
    .catch( err => console.log(err))

  }, [dependency])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setDependency={setDependency}/>
      <Bubbles colors={colorList} />
      <Link to= "/"><button>Home</button></Link>
    </>
  );
};

export default BubblePage;
