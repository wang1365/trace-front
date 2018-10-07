<template>
  <div class="main">
    <PersonDialog ref="formDialog" @add-success="updatePersonList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">录入人员</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" sortable width="80" />
        <el-table-column prop="name" label="姓名" sortable width="100" />
        <el-table-column prop="gender" label="性别" width="50" />
        <el-table-column label="出生日期" sortable width="120">
          <template slot-scope="scope">{{ scope.row.birthday| formatDate }}</template>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="150"/>
        <el-table-column prop="familyAddress" label="家庭地址" />
        <el-table-column prop="mobileNo" label="联系方式" width="120"/>
        <el-table-column prop="company" label="单位" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showModal('modify', scope.row)">修改</el-button>
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAllPerson, deletePerson } from '@/api/person'
import PersonDialog from './PersonDialog'

export default {
  name: 'Person',
  components: {
    PersonDialog
  },
  data() {
    return {
      items: [],
      dialogVisible: false,
      selectedPerson: null,
      showAddDialog: false
    }
  },
  created() {
    this.updatePersonList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal(action, person) {
      this.$refs['formDialog'].show(action, person)
    },
    updatePersonList() {
      getAllPerson().then(response => {
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除该人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePerson(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.updatePersonList()
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
  }
  .el-col {
    border-radius: 4px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .card {
    width: 300px;
    height: 370px;
    margin-bottom: 10px;
    background-color: #d3dce6;
  }
  .card:hover {
    width: 330px;
  }
  .bottom {
    bottom: 15px;
    line-height: 12px;
  }
  .button {
    /*padding: 0;*/
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
