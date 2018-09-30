import * as actionTypes from '../constants/userinfo'

const initialState = {}

export default function userinfo(state = initialState, action) {
    switch (action.type) {
        // 登录
        case actionTypes.USERINFO_LOGIN:
            return action.data

        // 修改城市
        case actionTypes.UPDATE_CITYNAME:
            return action.data

        default:
            return state
    }
}