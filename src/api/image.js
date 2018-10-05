import request from '@/utils/request'

export function addImage(name, catId) {
  return request({
    url: '/web/addImage',
    method: 'post',
    param: { name, catId }
  })
}

export function getImageList(params) {
  return request({
    url: '/web/getImageList',
    method: 'get',
    params: params
  })
}

export function getImageByName(name) {
  return request({
    url: '/web/getImageByName',
    method: 'get',
    params: { name }
  })
}

export function getImageCategoryList(params) {
  return request({
    url: '/web/getImageCategoryList',
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
