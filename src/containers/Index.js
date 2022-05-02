import React, { useEffect } from 'react';
import { Navigate} from 'react-router-dom';
import MainApp from "./MainApp";
import { connect } from 'react-redux';

const Index = ({logged}) => {

  useEffect(() => {
  }, [logged]);

  return (
    <>
    {logged? (
      <MainApp />
    ) : (
      <Navigate replace to="/login" />
    )}
    </>
  )
}

export default connect (
  (state) => ({
    logged: state.loginReducer.logged
  })
)(Index);
