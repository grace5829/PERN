import React, { useState } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios';

const SingleBird = () => {
    const location=useLocation()
    const {data}=location.state
    const [name, setName]= useState(data.name)
    const [family, setFamily]= useState(data.family)
    const [habitat, setHabitat]= useState(data.habitat)
    const [imageUrl, setImageUrl]= useState(data.imageUrl)
    const [description, setDescription]= useState(data.description)

    console.log(data)

    let updateBird=async ({id, name, family, habitat, imageUrl, description})=>{
        console.log(id)
        const res = await axios.put(`http://localhost:8080/api/birds/${id}`, {
          name, family, habitat, imageUrl, description
        })
        console.log(res.data)
        // setAllBirds((prev)=> [...prev, data])
    }


    const handleSubmit = async () => {
        event.preventDefault()
        let id=data.id
        await updateBird({id, name, family, habitat, imageUrl, description })
        setName('')
        setDescription('')
        setFamily('')
        setHabitat('')
        setImageUrl('')
    }
    return (
    <div>
    <div>
    <h1>{data.name}</h1>
    <img src={data.imageUrl} className="allBirdImg"/> 
        <div> Habitat: {data.habitat}</div>
        <div> Family: {data.family}</div>
         {data.description?<div> Description: {data.description} </div> : <></>}
    
    <div>
            <form className='signupForm' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'> Name</label>
                    <input className='name' name='name' value={name} onChange={(evt) => setName(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='family'>Family</label>
                    <input className='family' name='family' value={family} onChange={(evt) => setFamily(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='habitat'>Habitat</label>
                    <input className='habitat' name='habitat' value={habitat} onChange={(evt) => setHabitat(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='imageUrl'>Image Url</label>
                    <input className='imageUrl' name='imageUrl' value={imageUrl} onChange={(evt) => setImageUrl(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input className='description' name='description' value={description} onChange={(evt) => setDescription(evt.target.value)}  size='20'/>
                </div>

                <button className='SignUpBtn' type='submit'>Add</button>
            </form>        
    </div>
    </div>
    
    
    </div>
  )
}

export default SingleBird