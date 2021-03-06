import request from '@/utils/request'

export function getCurrentTenant(params) {
  return request({
    url: '/web/tenant/getCurrentTenant',
    method: 'get',
    params: params
  })
}

export function getTenantList(params) {
  return request({
    url: '/web/tenant/getTenantList',
    method: 'get',
    params: params
  })
}

