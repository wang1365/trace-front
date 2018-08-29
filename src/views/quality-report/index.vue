<template>
  <div class="main">
    <el-row>
      <ReportDialog ref="formDialog" @upload-success="updateReportList" />
    </el-row>
    <el-row :gutter="20">
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">添加报告</el-button>
    </el-row>
    <el-row :gutter="20" class="table">
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
            <img :src="scope.row.path" width="300" height="150" @click="onImageClick(scope.row.path)">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onImageClick(scope.row.path)">查看
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="onDeleteBtnClick(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog :visible.sync="imageDialogVisible" center>
      <img :src="selectedImage" width="100%" height="100%">
    </el-dialog>
  </div>
</template>

<script>
import { getAllQualityReport, deleteQualityReport } from '@/api/qualityReport'
import ReportDialog from './ReportDialog'

export default {
  name: 'QualityReport',
  components: {
    ReportDialog
  },
  data() {
    return {
      items: [],
      dialogVisible: false,
      imageDialogVisible: false,
      selectedImage: null
    }
  },
  created() {
    this.updateReportList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updateReportList() {
      getAllQualityReport().then(response => {
        console.log('########## updateReportList')
        console.log(response)
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    onDeleteBtnClick(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQualityReport({ id: id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.updateReportList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
  .main {
    padding: 20px
  }
</style>
