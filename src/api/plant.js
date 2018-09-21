import request from '@/utils/request'

export function addPlant(name, imageUrl) {
  return request({
    url: '/web/plant/add',
    method: 'post',
    data: { name, imageUrl }
  })
}

export function getAllPlant(params) {
  return request({
    url: '/web/plant/list',
    method: 'get',
    params: params
  })
}

export function deletePlant(id) {
  return request({
    url: '/web/plant/delete',
    method: 'post',
    params: { id }
  })
}
