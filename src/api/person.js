import request from '@/utils/request'

export function addPerson(data) {
  return request({
    url: '/web/person/addPerson',
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
    url: '/web/person/getPersonList',
    method: 'get',
    params: params
  })
}

export function deletePerson(id) {
  return request({
    url: '/web/person/deletePerson',
    method: 'post',
    params: { id }
  })
}
