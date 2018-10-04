import request from '@/utils/request'

export function addImage(data) {
  return request({
    url: '/web/addImage',
    method: 'post',
    data: data
  })
}

export function getImageList(params) {
  return request({
    url: '/web/getImageList',
    method: 'get',
    params: params
  })
}

export function deleteImage(id) {
  return request({
    url: '/web/deleteImage',
    method: 'post',
    params: { id }
  })
}
