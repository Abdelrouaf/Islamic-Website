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
import ShahadahTopic from './Components/ShahadahTopic/ShahadahTopic';
import CreateTopicInShahadah from './Components/CreateTopicInShahadah/CreateTopicInShahadah';
import CreateTopicInPrayer from './Components/CreateTopicInPrayer/CreateTopicInPrayer';
import PrayerTopic from './Components/PrayerTopic/PrayerTopic';
import EditShahadah from './Components/EditShahadah/EditShahadah';
import EditPrayer from './Components/EditPrayer/EditPrayer'
import CreateTopicInSawm from './Components/CreateTopicInSawm/CreateTopicInSawm';
import SawmTopic from './Components/SawmTopic/SawmTopic';
import EditSawm from './Components/EditSawm/EditSawm'
import EditZakat from './Components/EditZakat/EditZakat';
import CreateTopicInZakat from './Components/CreateTopicInZakat/CreateTopicInZakat';
import ZakatTopic from './Components/ZakatTopic/ZakatTopic'
import EditHaij from './Components/EditHaij/EditHaij';
import CreateTopicInHaij from './Components/CreateTopicInHaij/CreateTopicInHaij';
import HaijTopic from './Components/HaijTopic/HaijTopic';
import CreateTopicInFaithBook from './Components/CreateTopicInFaithBook/CreateTopicInFaithBook';
import FaithBookTopic from './Components/FaithBookTopic/FaithBookTopic';
import EditFaithBook from './Components/EditFaithBook/EditFaithBook'
import EditFaithBlog from './Components/EditFaithBlog/EditFaithBlog';
import CreateTopicInFaithBlog from './Components/CreateTopicInFaithBlog/CreateTopicInFaithBlog';
import FaithBlogTopic from './Components/FaithBlogTopic/FaithBlogTopic';
import EditIslam from './Components/EditIslam/EditIslam';
import CreateTopicInIslam from './Components/CreateTopicInIslam/CreateTopicInIslam';
import IslamTopic from './Components/IslamTopic/IslamTopic';
import News from './Components/News/News';
import CreateTopicInNews from './Components/CreateTopicInNews/CreateTopicInNews';
import NewsTopic from './Components/NewsTopic/NewsTopic';
import EditNews from './Components/EditNews/EditNews'
import Quran from './Components/Quran/Quran';
import Azkar from './Components/Azkar/Azkar';
import './Components/Style/Base/Base.scss'

function App() {

  let router = createBrowserRouter(
  
    createRoutesFromElements(
    
      <>
      
        <Route path='/' element={<Layout />} errorElement={<NotFound />}>
        
          <Route index element={<Home />} />
        
          <Route path='quran' element={<Quran />} />

          <Route path='azkar' element={<Azkar />} />

          <Route path='monotheism' element={<Monotheism />} />
        
          <Route path='pillars' element={<Pillars />} />
        
          <Route path='islam' element={<Islam />} />
        
          <Route path='faith' element={<Faith />} />
        
          <Route path='news' element={<News />} />

        </Route>
      
        <Route path='en' element={<Admin />} >
        
          <Route path='monotheism' element={<EditMonotheism />}> 
          
            {/* <Route path='main' index element={<MonotheismMain />} /> */}
          
            <Route path='create/topic' index element={<CreateTopicInMonotheism />} />
          
            <Route path='topic/:id' element={<MonotheismTopic />}/>
          
          </Route>
        
          <Route path='pillars/shahadah'  element={<EditShahadah />}>
          
            <Route path='create' index element={<CreateTopicInShahadah />} />

            <Route path='topic/:id' element={<ShahadahTopic />} />

          </Route>

          <Route path='pillars/prayer'  element={<EditPrayer />}>
          
            <Route path='create' index element={<CreateTopicInPrayer />} />

            <Route path='topic/:id' element={<PrayerTopic />} />

          </Route>

          <Route path='pillars/sawm'  element={<EditSawm />}>
          
            <Route path='create' index element={<CreateTopicInSawm />} />

            <Route path='topic/:id' element={<SawmTopic />} />

          </Route>

          <Route path='pillars/zakat'  element={<EditZakat />}>
          
            <Route path='create' index element={<CreateTopicInZakat />} />

            <Route path='topic/:id' element={<ZakatTopic />} />

          </Route>

          <Route path='pillars/haij'  element={<EditHaij />}>
          
            <Route path='create' index element={<CreateTopicInHaij />} />

            <Route path='topic/:id' element={<HaijTopic />} />

          </Route>

          <Route path='faith/book'  element={<EditFaithBook />}>
          
            <Route path='create' index element={<CreateTopicInFaithBook />} />

            <Route path='topic/:id' element={<FaithBookTopic />} />

          </Route>

          <Route path='faith/blog'  element={<EditFaithBlog />}>
          
            <Route path='create' index element={<CreateTopicInFaithBlog />} />

            <Route path='topic/:id' element={<FaithBlogTopic />} />

          </Route>

          <Route path='islam'  element={<EditIslam />}>
          
            <Route path='create' index element={<CreateTopicInIslam />} />

            <Route path='topic/:id' element={<IslamTopic />} />

          </Route>

          <Route path='news'  element={<EditNews />} >
          
            <Route path='create' index element={<CreateTopicInNews />} />

            <Route path='topic/:id' element={<NewsTopic />} />

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
