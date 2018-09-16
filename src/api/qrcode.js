import request from '@/utils/request'

export function getAllQrcode(params) {
  return request({
    url: '/web/qrcode/list',
    method: 'get',
    params: params
  })
}
