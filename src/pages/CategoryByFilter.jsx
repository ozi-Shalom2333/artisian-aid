import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './../styles/categoryfilter.css'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'

const CategoryByFilter = () => {

    const {category} = useParams()
    const [artisans, setArtisans] = useState([])
    console.log(category)
    const url = 'https://artisanaid.onrender.com/v1/artisans/category'

    const getCategory = async ()=>{
        try{
            const response = await axios.post(`${url}`,{category})
            console.log(response.data.data)
            setArtisans(response.data.data)

        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getCategory()

    },[category])

  return (
    <div className='catfilter'>
        <div className='hero-pic'>
          <h3>Painting Services</h3>
          <h1>Get <span style={{color:'rgba(255, 165, 0, 1)'}}>Satisfying</span> Painting <br /> Services at your Finger Tip</h1>
        </div>
        {
            artisans.map((e)=>(
                <Card data = {e}/>
            ))
        }
    </div>
  )
}

export default CategoryByFilter
