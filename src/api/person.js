import request from '@/utils/request'

export function addPerson(data) {
  return request({
    url: '/web/person/add',
    method: 'post',
    data: data
  })
}

export function updatePerson(data) {
  return request({
    url: '/web/person/updatePerson',
    method: 'post',
    data: data
  })
}

export function getAllPerson(params) {
  return request({
    url: '/web/person/list',
    method: 'get',
    params: params
  })
}

export function deletePerson(id) {
  return request({
    url: '/web/person/delete',
    method: 'post',
    params: { id }
  })
}
