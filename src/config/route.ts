import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import UserGenderEdit from "../pages/UserGenderEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";
import UpdateTeam from "../pages/UpdateTeam.vue";
import AddTeam from "../pages/AddTeam.vue";


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
    {path: "/", name: "index", component: Index},
    {path: "/team", name: "team", component: Team},
    {path: "/team/add", name: "addTeam", component: AddTeam},
    {path: "/team/update", name: "updateTeam", component: UpdateTeam},
    {path: "/user", name: "user", component: User},
    {path: "/search", name: "search", component: Search},
    {path: "/user/edit", name: "userEdit", component: UserEdit},
    {path: "/user/genderEdit", name: "userGenderEdit", component: UserGenderEdit},
    {path: "/user/list", name: "userList", component: SearchResult},
    {path: "/user/login", name: "userLogin", component: UserLogin},
];

export default routes;
