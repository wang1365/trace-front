import request from '@/utils/request'

export function addPlant(data) {
  return request({
    url: '/web/plant/addPlant',
    method: 'post',
    data: data
  })
}

export function updatePlant(data) {
  return request({
    url: '/web/plant/updatePlant',
    method: 'post',
    data: data
  })
}
export function addPlantItem(data) {
  return request({
    url: '/web/plant/addPlantItem',
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

export function getPickListByPerson(personId) {
  return request({
    url: '/web/plant/getPickListByPerson',
    method: 'get',
    params: { personId }
  })
}

export function getPlantListByPerson(personId) {
  return request({
    url: '/web/plant/getPlantListByPerson',
    method: 'get',
    params: { personId }
  })
}

export function getPickListByPlant(plantId) {
  return request({
    url: '/web/plant/getPickListByPlant',
    method: 'get',
    params: { plantId }
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
    url: '/web/plant/deletePlant',
    method: 'post',
    params: { id }
  })
}

export function deletePlantItem(id) {
  return request({
    url: '/web/plant/deletePlantItemById',
    method: 'post',
    params: { id }
  })
}
