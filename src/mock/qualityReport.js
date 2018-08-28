import Mock from 'mockjs'

const data = Mock.mock({
  'items|10': [{
    'id|+1': 1,
    'createTime': '@datetime("yyyy-MM-dd A HH:mm:ss")',
    'reportDate': '@date(yyyy-MM-dd)',
    'url': '@image'
  }]
})

export default {
  getAllQualityReport: () => {
    return data
  }
}
