import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import UserGenderEdit from "../pages/UserGenderEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";
import TeamUpdate from "../pages/TeamUpdate.vue";
import TeamAdd from "../pages/TeamAdd.vue";
import UserUpdate from "../pages/UserUpdate.vue";
import UserTeamJoin from "../pages/UserTeamJoin.vue";
import UserTeamCreate from "../pages/UserTeamCreate.vue";


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
    {path: "/", name: "index", title: "主页", component: Index},
    {path: "/team", name: "team", title: "队伍", component: Team},
    {path: "/team/add", name: "teamAdd", title: "创建队伍", component: TeamAdd},
    {path: "/team/update", name: "teamUpdate", title: "更新队伍", component: TeamUpdate},
    {path: "/search", name: "search", title: "标签搜索", component: Search},
    {path: "/user", name: "user", title: "个人主页", component: User},
    {path: "/user/edit", name: "userEdit", title: "编辑信息", component: UserEdit},
    {path: "/user/update", name: "userUpdate", title: "个人信息", component: UserUpdate},
    {path: "/user/team/join", name: "userTeamJoin", title: "我加入的队伍", component: UserTeamJoin},
    {path: "/user/team/create", name: "userTeamCreate", title: "我管理的队伍", component: UserTeamCreate},
    {path: "/user/genderEdit", name: "userGenderEdit", title: "编辑性别", component: UserGenderEdit},
    {path: "/user/list", name: "userList", title: "标签搜索", component: SearchResult},
    {path: "/user/login", name: "userLogin", title: "登录页面", component: UserLogin},
];

export default routes;
