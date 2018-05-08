import { get } from '../get'

export function getOrderListData(username) {
    const result = get('/api/orderlist/' + username)
    return result
}