import './App.css';
import { NavBar } from './Components/publicComponents/navbar';
import { SocialNet } from './Components/publicComponents/Socialnet';
import { Index } from './Components/publicComponents/Index';
import { About } from './Components/publicComponents/about';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Login } from './Components/privateComponents/login';
import { SignUp } from './Components/privateComponents/signup';
import { Profile } from './Components/privateComponents/profile';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store.config';
function App() {




  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <SocialNet />
        <AnimatePresence mode="wait">
          <Routes>
            <Route exact path='/' element={<motion.div
              key="index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0 }}>
              <Index /></motion.div>} />
            <Route exact path='/about' element={<motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0 }}>
              <About /></motion.div>} />
            <Route exact path='/signup' element={<motion.div
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}><SignUp /></motion.div>} />
            <Route exact path='/signin' element={<motion.div
              key="signin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}><Login /></motion.div>} />
            <Route exact path='/shopping' element={<motion.div
              key="shopping"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}><Index /></motion.div>} />
            <Route exact path='/profile' element={<motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}><Profile /></motion.div>} />
            <Route exact path='/products' element={<motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}><Index /></motion.div>} />
          </Routes>
        </AnimatePresence>
      </Router >
    </Provider>
  );
}

export default App;

