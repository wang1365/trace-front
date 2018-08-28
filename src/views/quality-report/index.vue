<template>
  <div class="main">
    <el-row/>
    <el-row>
      <ReportForm/>
    </el-row>
    <el-row class="table">
      <el-table
        :data="items"
        border
        stripe>
        <el-table-column prop="id" label="ID" width="100"/>
        <el-table-column prop="createTime" label="创建日期"/>
        <el-table-column prop="reportDate" label="报告日期"/>
        <el-table-column prop="reportDate" label="查看报告"/>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.url">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleView(scope, $index, scope.row)">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAllQualityReport } from '@/api/qualityReport'
import ReportForm from './ReportForm'

export default {
  name: 'QualityReport',
  components: {
    ReportForm
  },
  data() {
    return {
      items: []
    }
  },
  created() {
    console.log('quality report created')
    getAllQualityReport().then(response => {
      this.items = response.data.items
    })
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
  .main {
    padding: 20px
  }
</style>
