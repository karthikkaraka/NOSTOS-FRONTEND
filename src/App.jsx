import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home/Home.jsx'
import { Register } from './pages/registration/Register.jsx'
import { Login } from './pages/login/Login.jsx'
import { Items } from './pages/Items/Items.jsx'
import { PostItem } from './pages/PostItem/Postitem.jsx'
import { ItemDetail } from './pages/itemDetail/ItemDetail.jsx'
import { SelfItems } from './pages/selfItems/SelfItems.jsx'
import { SelfClaims } from './pages/selfclaims/SelfClaims.jsx'
import { MyClaims } from './pages/myclaims/MyClaims.jsx'
import { Suggestions } from './pages/suggestions/Suggestions.jsx'
import { Admin } from './pages/admin/Admin.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/postitem" element={<PostItem />}></Route>
        <Route path="/itemdetail/:id" element={<ItemDetail />}></Route>
        <Route path="/selfitems" element={<SelfItems />}></Route>
        <Route path="/selfclaims" element={<SelfClaims />}></Route>
        <Route path="/myclaims" element={<MyClaims />}> </Route>
        <Route path="/suggestions" element={<Suggestions />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </>
  )
}

export default App
