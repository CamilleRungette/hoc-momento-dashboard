import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Navigate} from 'react-router-dom';
import MainApp from "./MainApp";

const Index = () => {

  const logged = useSelector(state => state.loginHandler);

  useEffect(() => {
  }, [logged]);


  return (
    <>
    {logged.logged? (
      <MainApp />
    ) : (
      <Navigate replace to="/login" />
    )}
    </>
  )
}

export default Index;