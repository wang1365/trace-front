<template>
  <el-dialog :visible.sync="flag" title="新增种植计划" center>
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="100px">
      <el-form-item label="商品" prop="goodsId">
        <el-select v-model="ruleForm.goodsId" placeholder="请选择">
          <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item
        :rules="[ {required: true, message:'请输入数量', trigger:'blur'}]"
        label="采购数量"
        prop="quantity">
        <el-input v-model.number="ruleForm.quantity" placeholder="填写商品数量"/>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-select v-model="ruleForm.unit" placeholder="请选择">
          <el-option v-for="item in units" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="采购时间" prop="orderTime">
        <el-date-picker v-model="ruleForm.orderTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="采购地点" prop="address">
        <el-input v-model="ruleForm.address" placeholder="填写采购地点"/>
      </el-form-item>
      <el-form-item label="采购人" prop="buyerId">
        <el-input v-model="ruleForm.buyerId" placeholder="填写采购人"/>
      </el-form-item>
      <el-form-item label="菜农" prop="sellerId">
        <el-input v-model="ruleForm.sellerId" placeholder="填写菜农"/>
      </el-form-item>
      <el-form-item label="相关质检报告" prop="reportId">
        <el-select v-model="ruleForm.reportId" placeholder="请选择">
          <el-option v-for="item in reportList" :key="item.id" :label="item.title" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">添加</el-button>
      <el-button size="small" @click="flag = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllGoods } from '@/api/goods'
import { getAllQualityReport } from '@/api/qualityReport'
import { addOrder } from '@/api/order'

export default {
  name: 'ReportForm',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: this.dialogVisible,
      goodsList: [],
      reportList: [],
      units: ['kg', '个'],
      ruleForm: {
        goodsId: null,
        quantity: null,
        unit: null,
        orderTime: null,
        reportId: null,
        address: null,
        buyerId: null,
        sellerId: null,
        dealDate: null,
        createTime: null
      },
      formRules: {
        goodsId: [
          { required: true, message: '请选择一个商品', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入种植计划名称', trigger: 'blur' }
        ],
        orderTime: [
          { required: true, message: '请选择采购时间', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dialogVisible(newVal) {
      if (!newVal) {
        this.$refs['ruleForm'].resetFields()
      }
      this.flag = this.dialogVisible
    }
  },
  created() {
  },
  mounted() {
    this.getGoodsList()
    this.getReportList()
  },
  methods: {
    show() {
      this.flag = true
    },
    hide() {
      this.flag = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        addOrder(this.ruleForm).then((response) => {
          this.$message({ message: `添加种植计划成功`, type: 'success' })
          this.$emit('add-success')
          this.hide()
        }).catch(err => {
          this.$message({ message: `添加失败：${err}`, type: 'error' })
        })
      })
    },
    getGoodsList() {
      getAllGoods().then(res => {
        this.goodsList = res.data
      }).catch(err => {
        this.$message({ message: `获取商品列表失败, ${err}`, type: 'error' })
      })
    },
    getReportList() {
      getAllQualityReport().then(res => {
        this.reportList = res.data.data
      }).catch(err => {
        this.$message({ message: `获取列表失败, ${err}`, type: 'error' })
      })
    }
  }
}
</script>

<style scoped>
</style>
