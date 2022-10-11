import Login from "../pages/Auth/Login.js";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard";
import Setting from "../pages/Setting";
import Calendar from "../pages/Calendar";

const zRoute = [
    { link: '/', element: <Login />, title: "로그인" },
    { link: '/login', element: <Login />, title: "로그인" },
    { link: '/register', element: <Register />, title: "회원가입" },
    { link: '/dashboard', element: <Dashboard />, title: "대시보드" },
    { link: '/setting', element: <Setting />, title: "환경설정" },
    { link: '/calendar', element: <Calendar />, title: "캘린더" },
]
export { zRoute }