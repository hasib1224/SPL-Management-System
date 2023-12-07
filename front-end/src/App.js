
import { BrowserRouter, Routes, Route, createBrowserRouter,useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import Homepage from './components/Homepage.js';
import ComProfile from './components/ComMember.js';
import LogIn from './components/LogIn.js';
import SplOne from './components/SplOne.js';
import SplTwo from './components/SplTwo.js';
import SplThree from './components/SplThree.js'

import Footer from './components/Footer';
import StuProfile from './components/StuProfile.js';
import TeachProfList from './components/TeachProfList.js';
import StuEditInfo from './components/StuEditInfo.js';
import TeachEditInfo from './components/TeachEditInfo.js';
import AddManagerMark from './components/AddManagerMark.js';
import ManagerProfile from './components/ManagerProfile.js'
import AdminProfile from './components/AdminProfile.js'
import CreateSPLCOmmittee from './components/CreateSPLCOmmittee.js'
import AddStudent from './components/AddStudent.js'
import AddTeacher from './components/AddTeacher.js'
import PreviousMark from './components/ManagerPreviousMark.js'
import SupervisorStu from './components/SupervisorStu.js'
import CreateTeam from './components/CreateTeam.js'
import CreateSPL from './components/CreateSPL.js'
import TeamInfo from './components/TeamInfo.js'
import ManualSupAlloc from './components/ManualSupAlloc.js'




function App() {
  // const navi=useNavigate();
  return (
   
    <div className="App">
      <header className="App-header">
        
        <BrowserRouter>
            {/* <Routes> */}
              <switch>
                <Routes>

                

              
              <Route path="/" element={<Homepage/>}/>
              <Route exact path="/login" element={<LogIn/>}/>
              <Route path="/ComProfile" element={<ComProfile/>}/>
              {/* <Route path="/SplOne" element={<Info/>}/> */}
              <Route path="/SplOne" element={<SplOne/>}/>
              <Route path="/SplTwo" element={<SplTwo/>}/>
              <Route path="/SplThree" element={<SplThree/>}/>
              <Route path="/stuProfile" element={<StuProfile/>}/>

              {/* <Route path="/teachProfile" element={<Teachprofile/>}/> */}

              <Route path="/TeachProfList" element={<TeachProfList/>}/>
              <Route path="/StuEditInfo" element={<StuEditInfo/>}/>
              <Route path="/TeachEditInfo" element={<TeachEditInfo/>}/>
              <Route path="/AddManagerMark" element={<AddManagerMark/>}/>

              <Route path="/PreviousMark" element={<PreviousMark/>}/>
              <Route path="/ManagerProfile" element={<ManagerProfile/>}/>
              <Route path="/AdminProfile" element={<AdminProfile/>}/>
              <Route path="/CreateSPLCOmmittee" element={<CreateSPLCOmmittee/>}/>
              <Route path="/AddStudent" element={<AddStudent/>}/>
              <Route path="/AddTeacher" element={<AddTeacher/>}/>
              <Route path="/SupervisorStu" element={<SupervisorStu/>}/>
              <Route path="/CreateTeam" element={<CreateTeam/>}/>
              <Route path="/CreateSPL" element={<CreateSPL/>}/>
              <Route path="/TeamInfo" element={<TeamInfo/>}/>
              <Route path="/ManualSupAlloc" element={<ManualSupAlloc/>}/>

              
              </Routes>

              </switch>
            {/* </Routes> */}
        </BrowserRouter>
        {/* <Footer/> */}
      </header>
    </div>
  );
}

export default App;



