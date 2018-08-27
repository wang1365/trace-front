<template>
  <el-table
    :data="items"
    border
    stripe>
    <el-table-column prop="id" label="ID" width="100"/>
    <el-table-column prop="createTime" label="创建日期"/>
    <el-table-column prop="reportDate" label="报告日期"/>
    <el-table-column prop="reportDate" label="查看报告"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleView(scope, $index, scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getAllQualityReport } from '@/api/qualityReport'
export default {
  name: 'QualityReport',
  data() {
    return {
      items: []
    }
  },
  created() {
    console.log('quality report created')
    getAllQualityReport().then(response => { this.items = response.data.items })
    console.log(this.items)
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>

</style>
