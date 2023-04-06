import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  let [allBirds, setAllBirds]= useState([])

let fetchBirds =async ()=>{
  const {data}=await axios.get('http://localhost:8080/api/birds')
setAllBirds(data)
}

let addBird=async ({name, family, habitat, imageurl, description})=>{
const {data} = await axios.post('http://localhost:8080/api/birds', {
  name, family, habitat, imageurl, description
})
setAllBirds((...prev)=> [...prev, data])
}

  useEffect( ()=>{
    fetchBirds()
  },[])


  return (
    <div>
      <h3>Welcome</h3>

      {allBirds.map((bird)=>(
        <div> 
        <h3> {bird.name}</h3>
    
        <img src={bird.imageUrl} className="allBirdImg"/> 
        <div> Habitat: {bird.habitat}</div>
        <div> Description: {bird.description}</div>
        </div>

      ))}
    </div>
  );
};

export default Home;
