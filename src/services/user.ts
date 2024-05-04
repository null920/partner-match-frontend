import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../states/user";
import {showNotify} from "vant";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res?.code === 20000) {
        setCurrentUserState(res.data);
        return res.data;
    } else {
        //showNotify({type: 'danger', duration: 12300, message: '获取用户信息失败'});
    }
    return null;
}
