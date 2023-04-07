import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from '../features/home/Home';
import SingleBird from '../features/SingleBird';

const AppRoutes = () => {


  return (
    <div>
        <Routes>
          <Route path="/:birdName" element={<SingleBird />} />
          <Route path="/*" element={<Home />} />
        </Routes>

    </div>
  );
};

export default AppRoutes;
