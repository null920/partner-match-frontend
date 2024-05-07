import {setCurrentUserState} from "../states/user";
import userAxios from "../plugins/userAxios.ts";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    // 不存在则从远程获取
    const res = await userAxios.get('/user/current');
    if (res?.code === 20000) {
        setCurrentUserState(res.data);
        return res.data;
    } else {
        //showNotify({type: 'danger', duration: 12300, message: '获取用户信息失败'});
    }
    return null;
}
