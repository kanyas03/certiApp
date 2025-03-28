import React from 'react'
import IssueCertificate from './Issuecertificate'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ViewCertificate from './Viewcertificate'
import SignupPage from './Signup'
import LoginPage from './Login'
import CertificatePage from './Certificate'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = '/' element={<SignupPage/>}/>
        <Route path ='/login' element={<LoginPage/>}/>
         <Route path ='/ViewCertificate' element={<ViewCertificate/>} /> 
         <Route path = '/certificate'element={<CertificatePage/>}/>
        <Route path ='/IssueCertificate' element={<IssueCertificate/>} />
      </Routes>
      </BrowserRouter>
    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  )
}



export default App