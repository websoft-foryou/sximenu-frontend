import React from "react";
import {useRouteMatch} from "react-router-dom";
import MenuSlide from "../component/MenuSlide";
import App from "../App";


const MenuResult = () => {
  const match = useRouteMatch();
  console.table(match);

  return (
    <App>
      <MenuSlide/>
    </App>
  );
};

export default MenuResult;