import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './../styles/categoryfilter.css'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const CategoryByFilter = () => {

    const {category} = useParams()
    const [artisans, setArtisans] = useState([])
    // const [error, setError] = useState(null)
    console.log(category)
    const url = 'https://artisanaid.onrender.com/v1/artisans/category'

    const getCategory = async ()=>{
        try{
            const response = await axios.post(`${url}`,{category})
            console.log(response.data.data)
            setArtisans(response.data.data)

        }catch(error){
            console.log(error)
            toast.error(error?.response?.data?.message)
            // setError(error?.response?.data?.message)

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
        <div className='catfilter-card'>
        {
            artisans.map((e)=>(
                <Card data = {e}/>
            ))
        }
        </div>
        
    </div>
  )
}

export default CategoryByFilter
