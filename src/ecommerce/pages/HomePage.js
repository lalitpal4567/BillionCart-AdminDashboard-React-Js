import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import SubcategoryCard from '../components/SubcategoryCard'
import CategoryCard from '../components/CategoryCard'
import Footer from '../components/Footer'
import CategoryNavbar from '../components/CategoryNavbar'
import CategoryGroup from '../components/CategoryGroup'

const HomePage = () => {
  
  return (
    <div>
      <Navbar />
      <CategoryNavbar/>
      <Carousel />
      <CategoryGroup/>
      <Footer/>
    </div>
  )
}

export default HomePage
