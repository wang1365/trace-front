<template>
  <div class="main">
    <ReportDialog ref="formDialog" @upload-success="updateReportList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModal">添加报告</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column align="center" prop="id" label="ID" sortable width="80" />
        <el-table-column align="center" prop="title" label="标题" />
        <el-table-column align="center" prop="goodsName" label="商品名称" sortable width="100" />
        <el-table-column align="center" prop="origin" label="商品产地" width="150" />
        <el-table-column align="center" prop="url" label="报告" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.url" width="100%" @click="showReport(scope.row.url)">
          </template>
        </el-table-column>
        <el-table-column align="center" sortable label="报告日期" >
          <template slot-scope="scope">{{ scope.row.reportDate|formatDate }}</template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="说明" />
        <el-table-column align="center" prop="createTime" sortable label="创建日期"/>
        <el-table-column align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
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
import { getAllGoods } from '@/api/goods'
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
      selectedImage: null,

      goodsList: []
    }
  },
  created() {
    this.updateReportList()
    getAllGoods().then(response => { this.goodsList = response.data })
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
        this.items = response.data.data
      })
    },
    showReport(path) {
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
