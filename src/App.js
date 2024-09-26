import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import NotFound from './Components/NotFound/NotFound';
import Monotheism from './Components/Monotheism/Monotheism';
import Pillars from './Components/Pillars/Pillars';
import Islam from './Components/Islam/Islam';
import Faith from './Components/Faith/Faith';
import Admin from './Components/Admin/Admin';
import EditMonotheism from './Components/EditMonotheism/EditMonotheism';
import CreateTopicInMonotheism from './Components/CreateTopicInMonotheism/CreateTopicInMonotheism';
import MonotheismTopic from './Components/MonotheismTopic/MonotheismTopic';
import './Components/Style/Base/Base.scss'
import EditShahadah from './Components/EditShahadah/EditShahadah';
import ShahadahTopic from './Components/ShahadahTopic/ShahadahTopic';
import CreateTopicInShahadah from './Components/CreateTopicInShahadah/CreateTopicInShahadah';


function App() {

  let router = createBrowserRouter(
  
    createRoutesFromElements(
    
      <>
      
        <Route path='/' element={<Layout />} errorElement={<NotFound />}>
        
          <Route index element={<Home />} />
        
          <Route path='monotheism' element={<Monotheism />} />
        
          <Route path='pillars' element={<Pillars />} />
        
          <Route path='islam' element={<Islam />} />
        
          <Route path='faith' element={<Faith />} />
        
        </Route>
      
        <Route path='en' element={<Admin />} >
        
          <Route path='monotheism' element={<EditMonotheism />}> 
          
            {/* <Route path='main' index element={<MonotheismMain />} /> */}
          
            <Route path='create/topic' index element={<CreateTopicInMonotheism />} />
          
            <Route path='topic/:id' element={<MonotheismTopic />}/>
          
          </Route>
        
          <Route path='pillars/'  element={<EditShahadah />}>
          
            <Route path='create/shahadah' index element={<CreateTopicInShahadah />} />

            <Route path='topic/:id' element={<ShahadahTopic />} />

          </Route>

          

        </Route>
      
      </>
    )
  
  )

  return (
  
    <RouterProvider router={router}></RouterProvider>
  
  );
}

export default App;
