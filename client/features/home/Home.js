import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  let [allBirds, setAllBirds]= useState([])

let fetchBirds =async ()=>{
  const {data}=await axios.get('http://localhost:8080/api/birds')
setAllBirds(data)
}

  useEffect( ()=>{
    fetchBirds()
  },[])


  return (
    <div>
      <h3>Welcome</h3>

      {allBirds.map((bird)=>(
        <div> {bird.name}</div>

      ))}
    </div>
  );
};

export default Home;
