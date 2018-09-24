import request from '@/utils/request'

export function addPlant(data) {
  return request({
    url: '/web/plant/add',
    method: 'post',
    data: data
  })
}

export function addPlantItem(data) {
  return request({
    url: '/web/plant/item/add',
    method: 'post',
    data: data
  })
}

export function getAllPlant(params) {
  return request({
    url: '/web/plant/list',
    method: 'get',
    params: params
  })
}

export function getAllPlantItem(params) {
  return request({
    url: '/web/plant/item/list',
    method: 'get',
    params: params
  })
}

export function getPlantActionTypeList() {
  return request({
    url: '/web/plant/getPlantActionTypeList',
    method: 'get'
  })
}

export function getPlantItemByPlant(plantId) {
  return request({
    url: '/web/plant/getPlantItemByPlant',
    method: 'get',
    params: { plantId }
  })
}

export function deletePlant(id) {
  return request({
    url: '/web/plant/delete',
    method: 'post',
    params: { id }
  })
}

export function deletePlantItem(id) {
  return request({
    url: '/web/plant/item/delete',
    method: 'post',
    params: { id }
  })
}
