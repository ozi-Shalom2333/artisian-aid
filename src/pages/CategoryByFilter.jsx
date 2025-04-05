import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryByFilter = () => {
   const {category} = useParams()
  return (
    <div>
      axios.get(`url/getone/${category}`)
      serfthujmk,l
    </div>
  )
}

export default CategoryByFilter
