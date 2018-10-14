<template>
  <div class="main">
    <OrderDialog ref="formDialog" @add-success="updateOrderList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModal">录入订单</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" sortable width="60" />
        <el-table-column prop="goodsName" label="商品名称" sortable width="95"/>
        <el-table-column label="收购时间" sortable width="95">
          <template slot-scope="scope">{{ scope.row.orderTime|formatDate }}</template>
        </el-table-column>
        <el-table-column prop="address" label="收购地点" />
        <el-table-column label="收购数量" width="100" >
          <template slot-scope="scope">{{ scope.row.quantity + ' ' + scope.row.unit }}</template>
        </el-table-column>
        <el-table-column label="价格" sortable width="110" >
          <template slot-scope="scope">{{ scope.row.price ? scope.row.price/100 + ' 元/' + scope.row.unit: '' }}</template>
        </el-table-column>
        <el-table-column label="总价" sortable width="110" >
          <template slot-scope="scope">{{ getTotalPrice(scope.row) }}</template>
        </el-table-column>
        <el-table-column prop="buyerName" label="收购人" sortable width="90" />
        <el-table-column prop="sellerName" label="卖家(农户)" sortable width="105" />
        <el-table-column prop="plantDTO.summary" label="种植计划" />
        <el-table-column prop="pickDTO.summary" label="采摘条目" />
        <el-table-column prop="reportTitle" label="质检报告" />
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="goOrderDetail(scope.row.id)">溯源码</el-button>
            <el-button size="mini" type="success" @click="showModal('modify', scope.row)">修改</el-button>
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
import { getAllOrder, deleteOrder } from '@/api/order'
import OrderDialog from './OrderDialog'

export default {
  name: 'Order',
  components: {
    OrderDialog
  },
  data() {
    return {
      items: [],
      dialogVisible: false,
      imageDialogVisible: false,
      selectedImage: null
    }
  },
  computed: {

  },
  created() {
    this.updateOrderList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal(action, data) {
      this.$refs['formDialog'].show(action, data)
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
    goOrderDetail(orderId) {
      this.$router.push('/qrcode/index')
      // this.$router.push(`/order/detail/${orderId}`)
    },
    getTotalPrice(item) {
      if (item.price === null || item.quantity === null) {
        return ''
      }
      return (item.price / 100) * item.quantity
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
