<template>
  <div class="main">
    <CompanyDialog ref="formDialog" @upload-success="updateCompanyList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModal">添加公司</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="owner" label="法人" />
        <el-table-column prop="telephone" label="联系方式" />
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="showModal('modify', scope.row)">修改</el-button>
            <el-button size="small" type="warning" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
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
import { getAllCompany, deleteCompany } from '@/api/company'
import CompanyDialog from './CompanyDialog'

export default {
  name: 'Company',
  components: {
    CompanyDialog
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
    this.updateCompanyList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal(action, company) {
      this.$refs['formDialog'].show(action, company)
    },
    updateCompanyList() {
      getAllCompany().then(response => {
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCompany(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.updateCompanyList()
          })
          .catch(err => {
            this.$message({ type: 'error', message: '删除失败：' + err })
          })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    }
  }
}
</script>

<style scoped>
  .main {
    padding: 20px
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>
