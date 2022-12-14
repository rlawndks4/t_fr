import Login from "../pages/Auth/Login.js";
import Register from "../pages/Auth/Register";
import FindMyInfo from "../pages/Auth/FindMyInfo.js";
import Dashboard from "../pages/Dashboard";
import Setting from "../pages/Setting";
import Calendar from "../pages/Calendar";
import Chart from "../pages/Chart";
import SettingDisplay from "../pages/Setting/SettingDisplay.js";
const zRoute = [
    { link: '/', element: <Login />, title: "로그인" },
    { link: '/login', element: <Login />, title: "로그인" },
    { link: '/register', element: <Register />, title: "회원가입" },
    { link: '/findmyinfo', element: <FindMyInfo />, title: "회원정보 찾기" },
    { link: '/dashboard', element: <Dashboard />, title: "대시보드" },
    { link: '/setting', element: <Setting />, title: "환경설정" },
    { link: '/calendar', element: <Calendar />, title: "캘린더" },
    { link: '/chart', element: <Chart />, title: "달성률" },
    { link: '/settingdisplay', element: <SettingDisplay />, title: "화면 수정" },
]
export { zRoute }