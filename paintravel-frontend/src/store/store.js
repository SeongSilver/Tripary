import React, { useState, useEffect, createContext } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

export const Context = createContext();

const Store = (props) => {
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth()).then((response) => {
      console.log("여기는store222222" + response.payload._id);
      if (response.payload._id) {
        setCurrentId(response.payload._id);
      }
    });
  }, []);

  const data = {
    currentId: currentId,
  };

  console.log("여기는 store" + currentId);
  return <Context.Provider value={data}>{props.children}</Context.Provider>;
};

export default Store;
