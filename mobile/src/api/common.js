/**
 *Created by zhangbin on 2018/12/21
 */
import request,{downloadRequest} from '@/libs/request';

/**
 * 首页轮播图
 * @param data
 */
export function swiperApi(params) {
    return request({
        url: 'restApi/getListShow',
        method: 'get',
        params
    });
}
