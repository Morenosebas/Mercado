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
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthState } from './Redux/slice/user'
import { store } from './Redux/store.config';
import { ProtectedRoute } from './Components/privateComponents/privateSite';
import { Sell } from './Components/privateComponents/sellpage';
import { CreateStore } from './Components/privateComponents/createStore';
import { StoreList } from './Components/privateComponents/storeList';
function App() {

  const dispatch = useDispatch();
  const Authenticated = useSelector(state => state.session.isAuthenticated);
  useEffect(() => {
    setInterval(() => {
      dispatch(checkAuthState());
    }, 5000)
  }, [dispatch, Authenticated]);
  const { isAuthenticated, storeS } = store.getState().session;
  return (
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
          <Route exact path='/signup' element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectTo={"/profile"}
            >
              <motion.div
                key="signup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <SignUp />
              </motion.div>
            </ProtectedRoute>
          } />
          <Route exact path='/signin' element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectTo={"/profile"}
            >
              <motion.div
                key="signin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <Login />
              </motion.div>
            </ProtectedRoute>
          } />
          <Route exact path='/shopping' element={<motion.div
            key="shopping"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}><Index /></motion.div>} />
          <Route exact path='/profile' element={
            <ProtectedRoute
              isAllowed={isAuthenticated}
              redirectTo={"/"}
            >
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <Profile />
              </motion.div>
            </ProtectedRoute>
          } />
          <Route exact path='/sell' element={
            <ProtectedRoute
              isAllowed={isAuthenticated}
              redirectTo={"/"}
            >
              <motion.div
                key="Sell"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <Sell />
              </motion.div>
            </ProtectedRoute>
          } />
          <Route exact path='/user/newshop' element={
            <ProtectedRoute
              isAllowed={isAuthenticated}
              redirectTo={"/"}
            >
              <motion.div
                key="newStore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <CreateStore />
              </motion.div>
            </ProtectedRoute>
          } />
          <Route exact path='/user/stores' element={
            <ProtectedRoute
              isAllowed={storeS}
              redirectTo={"/"}
            >
              <motion.div
                key="newStore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <StoreList />
              </motion.div>
            </ProtectedRoute>
          } />
          <Route exact path='/products' element={<motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}><Index /></motion.div>} />
        </Routes>
      </AnimatePresence>
    </Router >
  );
}

export default App;

