import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './../styles/categoryfilter.css'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'

const CategoryByFilter = () => {

    const {category} = useParams()
    const [artisans, setArtisans] = useState([])
    
    useEffect(()=>{
        const getCategory = async ()=>{
            try{
                const response = await axios.get('https://artisanaid.onrender.com/v1/artisans/category', {
                    params: {
                        category: category
                    }})
                console.log(response)
                setArtisans(response.data.data)

            }catch(error){
                console.log(error)
            }
        }

        getCategory()

    },[])

  return (
    <div className='catfilter'>
        {
            artisans.map((e)=>(
                <Card data = {e}/>
            ))
        }
    </div>
  )
}

export default CategoryByFilter
