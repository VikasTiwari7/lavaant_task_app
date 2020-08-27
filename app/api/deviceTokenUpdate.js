import * as Service from '../api/services'
import * as Url from '../constants/urls'
import * as Utility from '../utility/index';

export const updateDeviceToken = async (deviceToken) => {
    let body = {
        deviceToken: deviceToken
    }
    let token = await Utility.getFromLocalStorge('token')
    id = await Utility.getFromLocalStorge('userId')
    const res = await Service.put(Url.UPDATE_USER_DEVICE_TOKEN + `${id}`, token, body)
    if (res.statusCode === 200) {
        console.log('updateDeviceToken res', res)
        return
    }
    else {
        console.log('error ', res.error)
        return
    }
}
