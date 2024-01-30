import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import LmsComp from './LmsComp';
import AddBranchForm from './AddBranchForm';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<LmsComp></LmsComp>}></Route>
        <Route path='/addcompp' element={<AddBranchForm></AddBranchForm>}></Route>
        
      </Routes>
    
    </BrowserRouter>
  );
};

export default Routing;
