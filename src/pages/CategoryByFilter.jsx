import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './../styles/categoryfilter.css'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import FooterSubstitute from '../components/FooterSubstitute'

const CategoryByFilter = () => {

    const {category} = useParams()
    const [artisans, setArtisans] = useState([])

    
    const url = 'https://artisanaid.onrender.com/v1/artisans/category'


    const getCategory = async ()=>{
        try{
            const response = await axios.get(`${url}`,{category})
            
            console.log(response.data.data)
            if(!response?.data?.data){
                toast.error("No data")
            }
            setArtisans(response.data.data)


        }catch(error){
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }
    
    useEffect(()=>{
        getCategory()

    },[])

  return (
    <div className='catfilter'>
        <Header/>
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
        <FooterSubstitute/>
    </div>
  )
}

export default CategoryByFilter
