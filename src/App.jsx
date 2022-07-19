import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { fetchLoginUser, selectSession } from "./features/sessionSlice";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Propiedad from "./pages/Propiedad";
import Register from "./pages/Register";
import Member from "./pages/Member";
// admin middleware
import AuthRoutes from "./middlewares/AuthRoutes";
// admin routes
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminPropiedades from "./pages/Admin/AdminPropiedades";
import AdminAgenda from "./pages/Admin/AdminAgenda";
import AdminPropiedad from "./pages/Admin/AdminPropiedad";
import { getAccessToken } from "./utils/localStorage";

function App() {
  const session = useSelector(selectSession);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, [dispatch]);

  if (session?.isLoggedIn && getAccessToken()) {
    return <h1>cargando...</h1>;
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/propiedad/:id" element={<Propiedad />} />
            {/* rutas bloqueadas si el usuario esta logeado */}
            <Route element={<AuthRoutes session={session} />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>
          {/* member */}
          <Route element={<AuthRoutes session={session} />}>
            <Route path="/member" element={<Member />} />
          </Route>
          {/* admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="propiedades" element={<AdminPropiedades />} />
            <Route path="propiedades/:id" element={<AdminPropiedad />} />
            <Route path="agenda" element={<AdminAgenda />} />
          </Route>
        </Routes>
      </Router>
    </AnimatePresence>
  );
}

export default App;
