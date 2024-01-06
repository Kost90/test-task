import { Link, Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import CardList from '../components/cardlist/CardList'


function RootLayout() {
  return (
    <div>
        <Header/>
        <div className="flex">
        <Sidebar/>
        <Outlet/>
        <CardList/>
        </div>
    </div>
  )
}

export default RootLayout