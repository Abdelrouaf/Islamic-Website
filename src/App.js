import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import EditPrayer from './Components/EditPrayer/EditPrayer';
import CreateTopicInSawm from './Components/CreateTopicInSawm/CreateTopicInSawm';
import SawmTopic from './Components/SawmTopic/SawmTopic';
import EditSawm from './Components/EditSawm/EditSawm';
import EditZakat from './Components/EditZakat/EditZakat';
import CreateTopicInZakat from './Components/CreateTopicInZakat/CreateTopicInZakat';
import ZakatTopic from './Components/ZakatTopic/ZakatTopic';
import EditHaij from './Components/EditHaij/EditHaij';
import CreateTopicInHaij from './Components/CreateTopicInHaij/CreateTopicInHaij';
import HaijTopic from './Components/HaijTopic/HaijTopic';
import CreateTopicInFaithBook from './Components/CreateTopicInFaithBook/CreateTopicInFaithBook';
import FaithBookTopic from './Components/FaithBookTopic/FaithBookTopic';
import EditFaithBook from './Components/EditFaithBook/EditFaithBook';
import EditFaithBlog from './Components/EditFaithBlog/EditFaithBlog';
import CreateTopicInFaithBlog from './Components/CreateTopicInFaithBlog/CreateTopicInFaithBlog';
import FaithBlogTopic from './Components/FaithBlogTopic/FaithBlogTopic';
import EditIslam from './Components/EditIslam/EditIslam';
import CreateTopicInIslam from './Components/CreateTopicInIslam/CreateTopicInIslam';
import IslamTopic from './Components/IslamTopic/IslamTopic';
import News from './Components/News/News';
import CreateTopicInNews from './Components/CreateTopicInNews/CreateTopicInNews';
import NewsTopic from './Components/NewsTopic/NewsTopic';
import EditNews from './Components/EditNews/EditNews';
import QuranSurahs from './Components/QuranSurahs/QuranSurahs';
import './Components/Style/Base/Base.scss';
import AzkarCatagories from './Components/AzkarCatagories/AzkarCatagories';
import AzkarDetails from './Components/AzkarDetails/AzkarDetails';
import AzanTiming from './Components/AzanTiming/AzanTiming';
import Sign from './Components/Sign/Sign';
import VerifyAccount from './Components/VerifyAccount/VerifyAccount';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import Program from './Components/Program/Program';
import ProgramsLayout from './Components/ProgramsLayout/ProgramsLayout';
import ProgramsHome from './Components/ProgramsHome/ProgramsHome';
import Category from './Components/Category/Category';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import AddCategory from './Components/AddCateogry/AddCategory';
import AddProgram from './Components/AddProgram/AddProgram';
import UpdateProgram from './Components/UpdateProgram/UpdateProgram';
import AllUsers from './Components/AllUsers/AllUsers';
import ApproveUser from './Components/ApproveUser/ApproveUser';
import UserRole from './Components/UserRole/UserRole';
import User from './Components/User/User';
import UserProfile from './Components/UserProfile/UserProfile';
import SaveItems from './Components/SaveItems/SaveItems';
import UserInbox from './Components/UserInbox/UserInbox';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Chat from './Components/Chat/Chat';

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='azanTiming' element={< AzanTiming />} />
          <Route path='quran' element={<QuranSurahs />} />
          <Route path='azkarCatagories/:category' element={<AzkarDetails />} />
          <Route path='azkarCatagories' element={<AzkarCatagories />} />
          <Route path='monotheism' element={<Monotheism />} />
          <Route path='pillars' element={<Pillars />} />
          <Route path='islam' element={<Islam />} />
          <Route path='faith' element={<Faith />} />
          <Route path='news' element={<News />} />
          <Route path='sign' element={<Sign />} />
          <Route path='verify-account' element={<VerifyAccount />} />
          <Route path='forget-password' element={<ForgetPassword />} />
          <Route path='reset-password' element={<ChangePassword />} />
          {/* <Route path='program' element={<Program />} /> */}
        </Route>

        <Route path='programs' element={<ProgramsLayout />} >
        
          <Route index element={<ProgramsHome />} />
          <Route path='category/:category' element={<Category />} /> 
          <Route path=':category/program-autoDESK' element={<Program />} />
          <Route path='user' element={<User />} >
          
            <Route index element={<UserProfile />} />
            <Route path='save-items' element={<SaveItems />} />
            <Route path='inbox' element={<UserInbox />} />
            <Route path='change-password' element={<ResetPassword />} />
          
          </Route>
          <Route path='sign' element={<Sign />} />
        
        </Route>

        <Route path='en' element={<Admin />}>
    
          <Route path='user/all-users' element={<AllUsers />} />

          <Route path='user/approve-user' element={<ApproveUser />} />

          <Route path='user/user-role' element={<UserRole />} />

          <Route path='chat' element={<Chat />} />

          <Route path='islamic/monotheism' element={<EditMonotheism />}>
            <Route path='create/topic' index element={<CreateTopicInMonotheism />} />
            <Route path='topic/:id' element={<MonotheismTopic />} />
          </Route>

          <Route path='islamic/pillars/shahadah' element={<EditShahadah />}>
            <Route path='create' index element={<CreateTopicInShahadah />} />
            <Route path='topic/:id' element={<ShahadahTopic />} />
          </Route>

          <Route path='islamic/pillars/prayer' element={<EditPrayer />}>
            <Route path='create' index element={<CreateTopicInPrayer />} />
            <Route path='topic/:id' element={<PrayerTopic />} />
          </Route>

          <Route path='islamic/pillars/sawm' element={<EditSawm />}>
            <Route path='create' index element={<CreateTopicInSawm />} />
            <Route path='topic/:id' element={<SawmTopic />} />
          </Route>

          <Route path='islamic/pillars/zakat' element={<EditZakat />}>
            <Route path='create' index element={<CreateTopicInZakat />} />
            <Route path='topic/:id' element={<ZakatTopic />} />
          </Route>

          <Route path='islamic/pillars/haij' element={<EditHaij />}>
            <Route path='create' index element={<CreateTopicInHaij />} />
            <Route path='topic/:id' element={<HaijTopic />} />
          </Route>

          <Route path='islamic/faith/book' element={<EditFaithBook />}>
            <Route path='create' index element={<CreateTopicInFaithBook />} />
            <Route path='topic/:id' element={<FaithBookTopic />} />
          </Route>

          <Route path='islamic/faith/blog' element={<EditFaithBlog />}>
            <Route path='create' index element={<CreateTopicInFaithBlog />} />
            <Route path='topic/:id' element={<FaithBlogTopic />} />
          </Route>

          <Route path='islamic/islam' element={<EditIslam />}>
            <Route path='create' index element={<CreateTopicInIslam />} />
            <Route path='topic/:id' element={<IslamTopic />} />
          </Route>

          <Route path='islamic/news' element={<EditNews />}>
            <Route path='create' index element={<CreateTopicInNews />} />
            <Route path='topic/:id' element={<NewsTopic />} />
          </Route>
        
          <Route path='add-programs/categories/create' element={<AddCategory />} />

          <Route path='add-programs/program/create' element={<AddProgram />} />

          <Route path='programs/:category/:id' element={<UpdateProgram />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
