import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

const CustomLoadingBar = () => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.continuousStart();
  }, []);
  return <LoadingBar color="#f11946" ref={ref} loaderSpeed={1000} />;
};

export default CustomLoadingBar;
