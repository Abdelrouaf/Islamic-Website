import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { Helmet } from "react-helmet";
import loadingImg from './images/loading.png'
import './App.css';
import style from './Components/Style/Base/Base.scss';

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

<Suspense fallback={       <div id='page'>
    
    <div>
    
        <div className='d-flex align-items-center justify-content-center'>
        
            <div className={style.fImage}>
            
                <img src={loadingImg} width={100} alt="image-loading" />
            
            </div>
        
            <div className={style.sImage}>
            
            <div className={style.hourglassBackground}>
                <div className={style.hourglassContainer}>
                <div className={style.hourglassCurves} />
                <div className={style.hourglassCapTop} />
                <div className={style.hourglassGlassTop} />
                <div className={style.hourglassSand} />
                <div className={style.hourglassSandStream} />
                <div className={style.hourglassCapBottom} />
                <div className={style.hourglassGlass} />
                </div>
            </div>
            
            </div>
        
        </div>
    
        <h4 style={{display: 'block !important', margin: '0'}}>استثمر دقائق الانتظار في الاستغفار</h4>
    
    </div>

</div>}>
        <BrowserRouter>

          <ScrollToTop />

          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={ <>
                <Helmet>
                  <title>Home | Purpose of Life</title>
                  <meta name="description" content="Discover the core beliefs of Islam, including monotheism, faith, the five pillars, and the purpose of life. Learn how Islam guides us to live with purpose and devotion." />
                  <meta name="keywords" content="Islam, Monotheism, Faith, Five Pillars, Purpose of Life, Allah, Islamic Beliefs, Tawhid, Life After Death" />
                </Helmet>
                <Home />
              </>} />
              <Route path='azanTiming' element={<>
                <Helmet>
                  <title>Azan Timing - Islamic Prayer Times | Purpose of Life</title>
                  <meta name="description" content="Get accurate Azan timings for your daily prayers and stay connected with Allah." />
                  <meta name="keywords" content="Azan, Prayer Times, Salah, Islamic Prayer, Timings" />
                </Helmet> 
                <AzanTiming />
              </>} />
              <Route path='quran' element={<>
                <Helmet>
                  <title>Quran Surahs - Learn the Quran | Purpose of Life</title>
                  <meta name="description" content="Explore the divine wisdom and teachings of the Quran through its Surahs." />
                  <meta name="keywords" content="Quran, Surahs, Islam, Teachings, Divine Wisdom" />
                </Helmet>
                <QuranSurahs />
              </>} />
              <Route path='azkarCatagories/:category' element={<>
                <Helmet>
                  <title>Azkar Categories - Islamic Remembrance | Purpose of Life</title>
                  <meta name="description" content="Learn about the different categories of Azkar and their significance in Islam." />
                  <meta name="keywords" content="Azkar, Remembrance, Islam, Supplications, Dhikr" />
                </Helmet>
                <AzkarDetails />
              </>} />
              <Route path='azkarCatagories' element={<>
                <Helmet>
                  <title>Azkar Categories - Explore Islamic Supplications | Purpose of Life</title>
                  <meta name="description" content="Browse through various Azkar categories to enhance your spiritual journey in Islam." />
                  <meta name="keywords" content="Azkar, Supplications, Dhikr, Islamic Remembrance" />
                </Helmet>
                <AzkarCatagories />
              </>} />
              <Route path='monotheism' element={<>
                  <Helmet>
                    <title>Monotheism in Islam | Purpose of Life</title>
                    <meta name="description" content="The concept of monotheism (known as tawhîd in Arabic) is the single most important concept in Islam.  Everything in Islam is built upon it.  Islam calls to the absolute oneness of God.  No act of worship or devotion has any meaning or value if this concept is in any way compromised.

                      Monotheism can be looked at from the following three angles:

                      1. The Oneness of God in His Lordship

                      2. Devotion of All Worship to God Alone

                      3. The Oneness of God in His Names and Attributes" />
                    <meta name="keywords" content="Monotheism, Allah, Faith, Islam, Surahs" />
                  </Helmet> 
                <Monotheism />
              </>} />
              <Route path='pillars' element={<>
                  <Helmet>
                    <title>Pillars of Islam | Purpose of Life</title>
                    <meta name="description" content="The five pillars of Islam 

The declaration of faith (shahada).

Prayer (salah)

Alms-giving (zakat).

Fasting (sawm)

Pilgrimage (hajj)


Constitute the basic norms of Islamic practice" />
                    <meta name="keywords" content="Pillars, Islam, Faith, Worship, Allah" />
                  </Helmet>
                <Pillars />
              </>} />
              <Route path='islam' element={<>
                  <Helmet>
                    <title>Purpose of Live - Islamic Teachings - Learn Islam | Purpose of Life</title>
                    <meta name="description" content="One's life can only be fulfilled when man reaches his spiritual peak and is in divine communion with God. This very goal forms the foundation of Islam. Believers are encouraged to present themselves before God in the utmost humility and desperately seek His Mercy in order to create an intimate bond with their Master." />
                    <meta name="keywords" content="Islam, Teachings, Surahs, Knowledge, Allah" />
                  </Helmet>
                <Islam />
              </>} />
              <Route path='faith' element={<>
                <Helmet>
                    <title>Faith in Islam - Learn More | Purpose of Life</title>
                    <meta name="description" content="Understand the concept of faith and belief in Islam." />
                    <meta name="keywords" content="Faith, Islam, Belief, Monotheism, Teachings" />
                  </Helmet>
                <Faith />
              </>} />
              <Route path='news' element={<>
                <Helmet>
                    <title>Islamic News - Stay Updated | Purpose of Life</title>
                    <meta name="description" content="Get the latest news and updates about Islam and community events." />
                    <meta name="keywords" content="News, Islam, Updates, Community, Purpose of Life" />
                  </Helmet>
                <News />
              </>} />
              <Route path='sign' element={<>
                <Helmet>
                    <title>Sign In - Purpose of Life</title>
                    <meta name="description" content="Sign in to access your account and explore Islamic content." />
                    <meta name="keywords" content="Sign In, Login, Account, Islam, Purpose of Life" />
                  </Helmet>
                <Sign />
              </>} />
              {/* <Route path='verify-account' element={<VerifyAccount />} /> */}
              <Route path='forget-password' element={<>
                <Helmet>
                  <title>Change Password - Purpose of Life</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet> 
                <ForgetPassword />
                </>} />
              <Route path='reset-password' element={<>
                <Helmet>
                  <title>Change Password - Purpose of Life</title>
                  <meta name="description" content="Explore core monotheistic topics about faith in Islam." />
                  <meta name="keywords" content="Monotheism, Faith, Islam, Surahs, Allah" />
                </Helmet>
                <ChangePassword />
              </>} />
              {/* <Route path='program' element={<Program />} /> */}
            </Route>

            <Route path='programs' element={<>
              <Helmet>
                <title>Educational Programs - Learn and Grow | Purpose of Life</title>
                <meta name="description" content="Explore various educational programs across different fields like Software, Dental, Architecture, English, and Islamic studies." />
                <meta name="keywords" content="Educational Programs, Software, Dental, Architecture, English, Islamic Studies, Faith, Learning" />
              </Helmet>
                <ProgramsLayout />
              </>} >
            
              <Route index element={<>
                <Helmet>
                  <title>Educational Programs | Purpose of Life</title>
                  <meta name="description" content="Browse a wide variety of educational programs in Software, Dental, Architecture, English, and Islamic studies to enrich your learning." />
                  <meta name="keywords" content="Educational Programs, Learning, Software, Dental, Architecture, English, Islamic Studies" />
                </Helmet>
                <ProgramsHome />
              </>} />
              <Route path='category/:category' element={<>
                <Helmet>
                  <title>Programs Categories | Purpose of Life</title>
                  <meta name="description" content="Explore a wide range of educational programs designed to enhance personal growth and knowledge" />
                  <meta name="keywords" content="Educational Programs, Learning, Software, Dental, Architecture, English, Islamic Studies" />
                </Helmet>
                <Category />
              </>} /> 
              <Route path=':category/:id' element={<>
                <Helmet>
                  <title>Program | Purpose of Life</title>
                  <meta name="description" content="Get detailed information about our educational programs designed for personal growth and learning." />
                  <meta name="keywords" content="Educational Programs, Learning, Software, Dental, Architecture, English, Islamic Studies" />
                </Helmet>
                <Program />
              </>} />
              <Route path='user' element={<User />} >
              
                <Route index element={<UserProfile />} />
                <Route path='save-items' element={<SaveItems />} />
                <Route path='inbox' element={<UserInbox />} />
                <Route path='change-password' element={<ResetPassword />} />
              
              </Route>        
            </Route>

            <Route path='en/dashboard' element={<Admin />}>

              <Route index element={ 
              
                <> 
                
                  <Helmet>
                    <title>Dashboard</title>
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                
                  <Dashboard /> 
                
                </>
              
              } />
        
              <Route path='user/all-users' element={
              
                <>
                
                  <Helmet>
                    <title>All Users</title>
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                
                  <AllUsers />
                
                </>
              
              } />

              <Route path='user/approve-user' element={
              
                <>
                
                  <Helmet>
                    <title>Approve Users</title>
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                
                  <ApproveUser />
                
                </>
              
              } />

              <Route path='user/user-role' element={
              
              <>
              
                <Helmet>
                  <title>User Role</title>
                  <meta name="robots" content="noindex, nofollow" />
                </Helmet>
              
                <UserRole />
              
              </>
              
              } />

              <Route path='chat' element={
              
                <>
                
                  <Helmet>
                    <title>Chat</title>
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                
                  <Chat />
                
                </>
              
              } />

              <Route path='islamic/monotheism' element={<EditMonotheism />}>
                <Route path='create/topic' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create topic in Monotheism</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInMonotheism />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Monotheism Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <MonotheismTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/pillars/shahadah' element={<EditShahadah />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in Shahadah</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInShahadah />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Shahadah Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <ShahadahTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/pillars/prayer' element={<EditPrayer />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in Prayer</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInPrayer />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Prayer Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <PrayerTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/pillars/sawm' element={<EditSawm />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in Sawm</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInSawm />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Sawm Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <SawmTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/pillars/zakat' element={<EditZakat />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in Zakat</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInZakat />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Zakat Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <ZakatTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/pillars/haij' element={<EditHaij />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in Haij</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInHaij />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Haij Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <HaijTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/faith/book' element={<EditFaithBook />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in Faith Book</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet> 
                  
                    <CreateTopicInFaithBook />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Faith Book Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <FaithBookTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/faith/blog' element={<EditFaithBlog />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in Faith Blog</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInFaithBlog />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Faith Blog Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <FaithBlogTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/islam' element={<EditIslam />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in Islam</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInIslam />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>Islam Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <IslamTopic />
                  
                  </>
                
                } />
              </Route>

              <Route path='islamic/news' element={<EditNews />}>
                <Route path='create' index element={
                
                  <>
                  
                    <Helmet>
                      <title>Create Topic in News</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <CreateTopicInNews />
                  
                  </>
                
                } />
                <Route path='topic/:id' element={
                
                  <>
                  
                    <Helmet>
                      <title>News Topic</title>
                      <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                  
                    <NewsTopic />
                  
                  </>
                
                } />
              </Route>
            
              {/* <Route path='add-programs/categories/create' element={<AddCategory />} /> */}

              <Route path='add-programs/program/create' element={
              
                <>
                
                  <Helmet>
                    <title>Add Program</title>
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                
                  <AddProgram />
                
                </>
              
              } />

              <Route path='programs/:category/:id' element={
              
                <>
                
                  <Helmet>
                    <title>Update Program</title>
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                
                  <UpdateProgram />
                
                </>
              
              } />

            </Route>
            <Route path="*" element={<>
                <Helmet>
                  <title>Not Found Page | Purpose of Life</title>
                  <meta name="description" content="Sorry, the page you are looking for doesn't exist. You can return to the homepage or explore other sections of our website." />
                  <meta name="keywords" content="404 error, page not found, Purpose of Life, explore topics, home" />
                </Helmet>
                <NotFound />
              </>} />
          </Routes>
        </BrowserRouter>
      </Suspense>  

      </div>
  );
}

export default App;
