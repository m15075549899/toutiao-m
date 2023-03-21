// 用户相关请求模块

import requset from '@/utils/requset.js'

export const login = data => {
    return requset({
        method: 'post',
        url:'app/v1_0/authorizations',
        data
    })
}  

export const sendSms = mobile => {
    return requset({
        method: 'get',
        url: `app/v1_0/sms/codes/${mobile}`
    })
}  