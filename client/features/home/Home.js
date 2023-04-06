import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddBird from '../AddBird';

const Home = () => {
  let [allBirds, setAllBirds]= useState([])
  let [name, setName]= useState('')
  let [family, setFamily]= useState('')
  let [habitat, setHabitat]= useState('')
  let [imageUrl, setImageUrl]= useState('')
  let [description, setDescription]= useState('')

let fetchBirds =async ()=>{
  const {data}=await axios.get('http://localhost:8080/api/birds')
setAllBirds(data)
}

console.log(allBirds)

let addBird=async ({name, family, habitat, imageurl, description})=>{
    const {data} = await axios.post('http://localhost:8080/api/birds', {
      name, family, habitat, imageurl, description
    })
    setAllBirds((prev)=> [...prev, data])
}

let removeBird=async ({id})=>{
  console.log(id)
  const { data } = await axios.delete(`http://localhost:8080/api/birds/${id}`)

console.log(data)
}

  useEffect( ()=>{
    fetchBirds()
  },[])
  const handleSubmit = async (event) => {
    event.preventDefault()
    await addBird({name, family, habitat, imageUrl, description })
    setName('')
    setDescription('')
    setFamily('')
    setHabitat('')
    setImageUrl('')
}

  return (
    <div>
      <h3>Welcome</h3>
      <div>
            <form className='signupForm' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'> *Name</label>
                    <input className='name' name='name' value={name} onChange={(evt) => setName(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='family'>*Family</label>
                    <input className='family' name='family' value={family} onChange={(evt) => setFamily(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='habitat'>*Habitat</label>
                    <input className='habitat' name='habitat' value={habitat} onChange={(evt) => setHabitat(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='imageUrl'>Image Url</label>
                    <input className='imageUrl' name='imageUrl' value={imageUrl} onChange={(evt) => setImageUrl(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input className='description' name='description' value={description} onChange={(evt) => setDescription(evt.target.value)}  />
                </div>

                <button className='SignUpBtn' type='submit'>Add</button>
            </form>        
    </div>
      {allBirds.map((bird)=>(
        <div> 
        <h3> {bird.name}</h3>
        {bird.id}
        <button onClick={()=>removeBird(bird.id)}>X</button>
        <img src={bird.imageUrl} className="allBirdImg"/> 
        <div> Habitat: {bird.habitat}</div>
         {bird.description?<div> Description: {bird.description} </div> : <></>}
        </div>

      ))}
    </div>
  );
};

export default Home;
