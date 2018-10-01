<template>
  <div class="main">
    <OrderDialog ref="formDialog" @add-success="updateOrderList" />
    <div><a :href="h5Url">{{ h5Url }}</a></div>
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">录入订单</el-button>
    </el-row>
    <el-row class="table"/>
    <el-dialog :visible.sync="imageDialogVisible" center>
      <img :src="selectedImage" width="100%" height="100%">
    </el-dialog>
  </div>
</template>

<script>
import { getAllOrder, deleteOrder } from '@/api/order'
import OrderDialog from './OrderDialog'

export default {
  name: 'OrderDetail',
  components: {
    OrderDialog
  },
  data() {
    return {
      orderId: null,
      h5Url: null,
      items: [],
      dialogVisible: false,
      imageDialogVisible: false,
      selectedImage: null
    }
  },
  watch: {
    orderId() {
      this.h5Url = 'http://www.tiaocaishi.com:9527/#/goods/' + this.orderId
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId
    this.updateOrderList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updateOrderList() {
      getAllOrder().then(response => {
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrder(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.updateOrderList()
          })
          .catch(err => {
            this.$message({ type: 'error', message: '删除失败：' + err })
          })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    delivery(id) {
      /** TODO */
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
