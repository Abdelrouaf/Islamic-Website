import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { Helmet } from "react-helmet";
import './App.css';
import layout from './Components/Style/Base/Base.scss';
// import Home from './Components/Home/Home'
// import Layout from './Components/Layout/Layout';
// import NotFound from './Components/NotFound/NotFound';
// import Monotheism from './Components/Monotheism/Monotheism';
// import Pillars from './Components/Pillars/Pillars';
// import Islam from './Components/Islam/Islam';
// import Faith from './Components/Faith/Faith';
// import Admin from './Components/Admin/Admin';
// import EditMonotheism from './Components/EditMonotheism/EditMonotheism';
// import CreateTopicInMonotheism from './Components/CreateTopicInMonotheism/CreateTopicInMonotheism';
// import MonotheismTopic from './Components/MonotheismTopic/MonotheismTopic';
// import ShahadahTopic from './Components/ShahadahTopic/ShahadahTopic';
// import CreateTopicInShahadah from './Components/CreateTopicInShahadah/CreateTopicInShahadah';
// import CreateTopicInPrayer from './Components/CreateTopicInPrayer/CreateTopicInPrayer';
// import PrayerTopic from './Components/PrayerTopic/PrayerTopic';
// import EditShahadah from './Components/EditShahadah/EditShahadah';
// import EditPrayer from './Components/EditPrayer/EditPrayer';
// import CreateTopicInSawm from './Components/CreateTopicInSawm/CreateTopicInSawm';
// import SawmTopic from './Components/SawmTopic/SawmTopic';
// import EditSawm from './Components/EditSawm/EditSawm';
// import EditZakat from './Components/EditZakat/EditZakat';
// import CreateTopicInZakat from './Components/CreateTopicInZakat/CreateTopicInZakat';
// import ZakatTopic from './Components/ZakatTopic/ZakatTopic';
// import EditHaij from './Components/EditHaij/EditHaij';
// import CreateTopicInHaij from './Components/CreateTopicInHaij/CreateTopicInHaij';
// import HaijTopic from './Components/HaijTopic/HaijTopic';
// import CreateTopicInFaithBook from './Components/CreateTopicInFaithBook/CreateTopicInFaithBook';
// import FaithBookTopic from './Components/FaithBookTopic/FaithBookTopic';
// import EditFaithBook from './Components/EditFaithBook/EditFaithBook';
// import EditFaithBlog from './Components/EditFaithBlog/EditFaithBlog';
// import CreateTopicInFaithBlog from './Components/CreateTopicInFaithBlog/CreateTopicInFaithBlog';
// import FaithBlogTopic from './Components/FaithBlogTopic/FaithBlogTopic';
// import EditIslam from './Components/EditIslam/EditIslam';
// import CreateTopicInIslam from './Components/CreateTopicInIslam/CreateTopicInIslam';
// import IslamTopic from './Components/IslamTopic/IslamTopic';
// import News from './Components/News/News';
// import CreateTopicInNews from './Components/CreateTopicInNews/CreateTopicInNews';
// import NewsTopic from './Components/NewsTopic/NewsTopic';
// import EditNews from './Components/EditNews/EditNews';
// import QuranSurahs from './Components/QuranSurahs/QuranSurahs';
// import AzkarCatagories from './Components/AzkarCatagories/AzkarCatagories';
// import AzkarDetails from './Components/AzkarDetails/AzkarDetails';
// import AzanTiming from './Components/AzanTiming/AzanTiming';
// import Sign from './Components/Sign/Sign';
// import ChangePassword from './Components/ChangePassword/ChangePassword';
// import Program from './Components/Program/Program';
// import ProgramsLayout from './Components/ProgramsLayout/ProgramsLayout';
// import ProgramsHome from './Components/ProgramsHome/ProgramsHome';
// import Category from './Components/Category/Category';
// import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
// import AddProgram from './Components/AddProgram/AddProgram';
// import UpdateProgram from './Components/UpdateProgram/UpdateProgram';
// import AllUsers from './Components/AllUsers/AllUsers';
// import ApproveUser from './Components/ApproveUser/ApproveUser';
// import UserRole from './Components/UserRole/UserRole';
// import User from './Components/User/User';
// import UserProfile from './Components/UserProfile/UserProfile';
// import SaveItems from './Components/SaveItems/SaveItems';
// import UserInbox from './Components/UserInbox/UserInbox';
// import ResetPassword from './Components/ResetPassword/ResetPassword';
// import Chat from './Components/Chat/Chat';
// import Dashboard from './Components/Dashboard/Dashboard';

const Home = React.lazy(() => import('./Components/Home/Home'));
const Layout = React.lazy(() => import('./Components/Layout/Layout'));
const NotFound = React.lazy(() => import('./Components/NotFound/NotFound'));
const Monotheism = React.lazy(() => import('./Components/Monotheism/Monotheism'));
const Pillars = React.lazy(() => import('./Components/Pillars/Pillars'));
const Islam = React.lazy(() => import('./Components/Islam/Islam'));
const Faith = React.lazy(() => import('./Components/Faith/Faith'));
const Admin = React.lazy(() => import('./Components/Admin/Admin'));
const EditMonotheism = React.lazy(() => import('./Components/EditMonotheism/EditMonotheism'));
const CreateTopicInMonotheism = React.lazy(() => import('./Components/CreateTopicInMonotheism/CreateTopicInMonotheism'));
const MonotheismTopic = React.lazy(() => import('./Components/MonotheismTopic/MonotheismTopic'));
const ShahadahTopic = React.lazy(() => import('./Components/ShahadahTopic/ShahadahTopic'));
const CreateTopicInShahadah = React.lazy(() => import('./Components/CreateTopicInShahadah/CreateTopicInShahadah'));
const CreateTopicInPrayer = React.lazy(() => import('./Components/CreateTopicInPrayer/CreateTopicInPrayer'));
const PrayerTopic = React.lazy(() => import('./Components/PrayerTopic/PrayerTopic'));
const EditShahadah = React.lazy(() => import('./Components/EditShahadah/EditShahadah'));
const EditPrayer = React.lazy(() => import('./Components/EditPrayer/EditPrayer'));
const CreateTopicInSawm = React.lazy(() => import('./Components/CreateTopicInSawm/CreateTopicInSawm'));
const SawmTopic = React.lazy(() => import('./Components/SawmTopic/SawmTopic'));
const EditSawm = React.lazy(() => import('./Components/EditSawm/EditSawm'));
const EditZakat = React.lazy(() => import('./Components/EditZakat/EditZakat'));
const CreateTopicInZakat = React.lazy(() => import('./Components/CreateTopicInZakat/CreateTopicInZakat'));
const ZakatTopic = React.lazy(() => import('./Components/ZakatTopic/ZakatTopic'));
const EditHaij = React.lazy(() => import('./Components/EditHaij/EditHaij'));
const CreateTopicInHaij = React.lazy(() => import('./Components/CreateTopicInHaij/CreateTopicInHaij'));
const HaijTopic = React.lazy(() => import('./Components/HaijTopic/HaijTopic'));
const CreateTopicInFaithBook = React.lazy(() => import('./Components/CreateTopicInFaithBook/CreateTopicInFaithBook'));
const FaithBookTopic = React.lazy(() => import('./Components/FaithBookTopic/FaithBookTopic'));
const EditFaithBook = React.lazy(() => import('./Components/EditFaithBook/EditFaithBook'));
const EditFaithBlog = React.lazy(() => import('./Components/EditFaithBlog/EditFaithBlog'));
const CreateTopicInFaithBlog = React.lazy(() => import('./Components/CreateTopicInFaithBlog/CreateTopicInFaithBlog'));
const FaithBlogTopic = React.lazy(() => import('./Components/FaithBlogTopic/FaithBlogTopic'));
const EditIslam = React.lazy(() => import('./Components/EditIslam/EditIslam'));
const CreateTopicInIslam = React.lazy(() => import('./Components/CreateTopicInIslam/CreateTopicInIslam'));
const IslamTopic = React.lazy(() => import('./Components/IslamTopic/IslamTopic'));
const News = React.lazy(() => import('./Components/News/News'));
const CreateTopicInNews = React.lazy(() => import('./Components/CreateTopicInNews/CreateTopicInNews'));
const NewsTopic = React.lazy(() => import('./Components/NewsTopic/NewsTopic'));
const EditNews = React.lazy(() => import('./Components/EditNews/EditNews'));
const QuranSurahs = React.lazy(() => import('./Components/QuranSurahs/QuranSurahs'));
const AzkarCatagories = React.lazy(() => import('./Components/AzkarCatagories/AzkarCatagories'));
const AzkarDetails = React.lazy(() => import('./Components/AzkarDetails/AzkarDetails'));
const AzanTiming = React.lazy(() => import('./Components/AzanTiming/AzanTiming'));
const Sign = React.lazy(() => import('./Components/Sign/Sign'));
const ChangePassword = React.lazy(() => import('./Components/ChangePassword/ChangePassword'));
const ForgetPassword = React.lazy( () => import('./Components/ForgetPassword/ForgetPassword') )
const Program = React.lazy(() => import('./Components/Program/Program'));
const ProgramsLayout = React.lazy(() => import('./Components/ProgramsLayout/ProgramsLayout'));
const ProgramsHome = React.lazy(() => import('./Components/ProgramsHome/ProgramsHome'));
const Category = React.lazy(() => import('./Components/Category/Category'));
const ScrollToTop = React.lazy(() => import('./Components/ScrollToTop/ScrollToTop'));
const AddProgram = React.lazy(() => import('./Components/AddProgram/AddProgram'));
const UpdateProgram = React.lazy(() => import('./Components/UpdateProgram/UpdateProgram'));
const AllUsers = React.lazy(() => import('./Components/AllUsers/AllUsers'));
const ApproveUser = React.lazy(() => import('./Components/ApproveUser/ApproveUser'));
const UserRole = React.lazy(() => import('./Components/UserRole/UserRole'));
const User = React.lazy(() => import('./Components/User/User'));
const UserProfile = React.lazy(() => import('./Components/UserProfile/UserProfile'));
const SaveItems = React.lazy(() => import('./Components/SaveItems/SaveItems'));
const UserInbox = React.lazy(() => import('./Components/UserInbox/UserInbox'));
const ResetPassword = React.lazy(() => import('./Components/ResetPassword/ResetPassword'));
const Chat = React.lazy(() => import('./Components/Chat/Chat'));
const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));

function App() {

  // Function to set page direction based on the language
  const setPageDirection = () => {
    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.style.textAlign = 'right';
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.style.textAlign = 'left';
    }
  };

  useEffect(() => {
    // Initial direction setting
    setPageDirection();

    // Observe changes in the <html> lang attribute
    const observer = new MutationObserver(() => {
      setPageDirection();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => {
      observer.disconnect();
    };
    observer.observe(document.body, { childList: true, subtree: true });

  }, []);

  return (
      <div>

<Suspense fallback={       <div id="page">
        <div id="container">
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="h3">loading</div>
        </div>
      </div>}>
        <BrowserRouter>

          <ScrollToTop />

          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={ <>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <Home />
              </>} />
              <Route path='azanTiming' element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <AzanTiming />
              </>} />
              <Route path='quran' element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <QuranSurahs />
              </>} />
              <Route path='azkarCatagories/:category' element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <AzkarDetails />
              </>} />
              <Route path='azkarCatagories' element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <AzkarCatagories />
              </>} />
              <Route path='monotheism' element={<>
                {/* <Helmet>
                    <title>Monotheism in Islam - Learn Faith | YourSiteName</title>
                    <meta name="description" content="Discover core monotheistic concepts and teachings in Islam." />
                    <meta name="keywords" content="Monotheism, Allah, Faith, Islam, Surahs" />
                  </Helmet> */}
                <Monotheism />
              </>} />
              <Route path='pillars' element={<>
                {/* <Helmet>
                    <title>Pillars of Islam - YourSiteName</title>
                    <meta name="description" content="Learn about the five pillars of Islam and their significance." />
                    <meta name="keywords" content="Pillars, Islam, Faith, Worship, Allah" />
                  </Helmet> */}
                <Pillars />
              </>} />
              <Route path='islam' element={<>
                {/* <Helmet>
                    <title>Islamic Teachings - Learn Islam | YourSiteName</title>
                    <meta name="description" content="Explore the teachings and principles of Islam comprehensively." />
                    <meta name="keywords" content="Islam, Teachings, Surahs, Knowledge, Allah" />
                  </Helmet> */}
                <Islam />
              </>} />
              <Route path='faith' element={<>
                {/* <Helmet>
                    <title>Faith in Islam - Learn More | YourSiteName</title>
                    <meta name="description" content="Understand the concept of faith and belief in Islam." />
                    <meta name="keywords" content="Faith, Islam, Belief, Monotheism, Teachings" />
                  </Helmet> */}
                <Faith />
              </>} />
              <Route path='news' element={<>
                {/* <Helmet>
                    <title>Islamic News - Stay Updated | YourSiteName</title>
                    <meta name="description" content="Get the latest news and updates about Islam and community events." />
                    <meta name="keywords" content="News, Islam, Updates, Community, YourSiteName" />
                  </Helmet> */}
                <News />
              </>} />
              <Route path='sign' element={<>
                {/* <Helmet>
                    <title>Sign In - YourSiteName</title>
                    <meta name="description" content="Sign in to access your account and explore Islamic content." />
                    <meta name="keywords" content="Sign In, Login, Account, Islam, YourSiteName" />
                  </Helmet> */}
                <Sign />
              </>} />
              {/* <Route path='verify-account' element={<VerifyAccount />} /> */}
              <Route path='forget-password' element={<>{/* <Helmet>
                  <title>Change Password - YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}<ForgetPassword /></>} />
              <Route path='reset-password' element={<>
                {/* <Helmet>
                  <title>Change Password - YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <ChangePassword />
              </>} />
              {/* <Route path='program' element={<Program />} /> */}
            </Route>

            <Route path='programs' element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <ProgramsLayout />
              </>} >
            
              <Route index element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <ProgramsHome />
              </>} />
              <Route path='category/:category' element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <Category />
              </>} /> 
              <Route path=':category/:id' element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <Program />
              </>} />
              <Route path='user' element={<User />} >
              
                <Route index element={<UserProfile />} />
                <Route path='save-items' element={<SaveItems />} />
                <Route path='inbox' element={<UserInbox />} />
                <Route path='change-password' element={<ResetPassword />} />
              
              </Route>        
            </Route>

            <Route path='en' element={<Admin />}>

              <Route path='dashboard' element={<Dashboard />} />
        
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
            
              {/* <Route path='add-programs/categories/create' element={<AddCategory />} /> */}

              <Route path='add-programs/program/create' element={<AddProgram />} />

              <Route path='programs/:category/:id' element={<UpdateProgram />} />

            </Route>
            <Route path="*" element={<>
                {/* <Helmet>
                  <title>Monotheism Topics - Learn Islam | YourSiteName</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> */}
                <NotFound />
              </>} />
          </Routes>
        </BrowserRouter>
      </Suspense>  

      </div>
  );
}

export default App;
