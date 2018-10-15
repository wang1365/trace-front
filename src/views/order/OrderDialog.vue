<template>
  <el-dialog :visible.sync="visible" :title="title" center>
    <el-form v-loading="loading" ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="120px">
      <el-form-item label="商品" prop="goodsId">
        <el-select v-model="ruleForm.goodsId" placeholder="请选择">
          <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-row >
        <el-col :span="10">
          <el-form-item
            label="采购数量(kg)"
            prop="quantity">
            <el-input v-model.number="ruleForm.quantity" type="number" placeholder="填写商品数量"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位" prop="unit">
            <el-select v-model="ruleForm.unit" placeholder="请选择">
              <el-option v-for="item in ['kg','个']" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row >
        <el-col :span="10">
          <el-form-item :label="priceLabel" prop="price">
            <el-input-number v-model="ruleForm.price" :precision="2" :step="0.1" size="small" placeholder="输入价格"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-input v-model="totalPrice" placeholder="总价格" size="small" readonly>
            <template slot="prepend">总价:</template>
          </el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="采购时间" prop="orderTime">
            <el-date-picker v-model="ruleForm.orderTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购地点" prop="address">
            <el-input v-model="ruleForm.address" placeholder="填写采购地点"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="采购人" prop="buyerId">
            <el-select v-model="ruleForm.buyerId" placeholder="填写采购人">
              <el-option v-for="item in personList" :key="item.id" :label="item.id + '.' + item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="菜农" prop="sellerId">
            <el-select v-model="ruleForm.sellerId" placeholder="请选择">
              <el-option v-for="item in personList" :key="item.id" :label="item.id + '.' + item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="种植计划" prop="plantId">
            <el-select v-model="ruleForm.plantId" placeholder="关联种植计划" no-data-text="无数据，请先添加该农户的种植计划">
              <el-option v-for="item in plantList" :key="item.id" :label="formatPlantInfo(item)" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采摘条目" prop="pickId">
            <el-select v-model="ruleForm.pickId" placeholder="关联种植计划中的采摘" no-data-text="无数据，请先添加该农户种植计划的采摘条目">
              <el-option v-for="item in pickList" :key="item.id" :label="formatPlantItemInfo(item)" :value="item.id"/>
            </el-select>
        </el-form-item></el-col>
      </el-row>
      <el-form-item label="相关质检报告" prop="reportId">
        <el-select v-model="ruleForm.reportId" placeholder="请选择">
          <el-option v-for="item in reportList" :key="item.id" :label="item.title" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">保 存</el-button>
      <el-button size="small" @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllGoods } from '@/api/goods'
import { getAllQualityReport } from '@/api/qualityReport'
import { addOrder, updateOrder } from '@/api/order'
import { getAllPerson } from '@/api/person'
import { getPlantListByPerson, getPickListByPlant } from '@/api/plant'

export default {
  name: 'ReportForm',
  props: {
  },
  data() {
    return {
      visible: false,
      loading: false,
      action: 'add',
      goodsList: [],
      reportList: [],
      units: ['kg', '个'],
      plantList: [],
      pickList: [],
      personList: [],
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
        createTime: null,
        plantId: null,
        pickId: null
      },
      formRules: {
        goodsId: [
          { required: true, message: '商品不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入种植计划名称', trigger: 'blur' }
        ],
        orderTime: [
          { required: true, message: '请选择采购时间', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '采购数量不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '采购单位不能为空', trigger: 'blur' }
        ],
        buyerId: [
          { required: true, message: '采购人不能为空', trigger: 'blur' }
        ],
        sellerId: [
          { required: true, message: '卖方不能为空', trigger: 'blur' }
        ],
        plantId: [
          { required: true, message: '卖方关联的种植计划不能为空', trigger: 'blur' }
        ],
        pickId: [
          { required: true, message: '关联的卖方采购条目不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    sellerId() {
      return this.ruleForm.sellerId
    },
    plantId() {
      return this.ruleForm.plantId
    },
    priceLabel() {
      return this.ruleForm.unit === null ? '价格' : `价格(元/${this.ruleForm.unit})`
    },
    totalPrice() {
      return (this.ruleForm.price !== null && this.ruleForm.quantity !== null) ? (this.ruleForm.price * this.ruleForm.quantity) : ''
    },
    title() {
      return this.action === 'modify' ? '修改订单' : '新增订单'
    }
  },
  watch: {
    sellerId(newV, oldV) {
      if (newV) {
        console.log('watch sellerId:', newV)
        this.updatePlantListByPerson(newV)
        if (oldV) {
          this.ruleForm.plantId = null
        }
      }
    },
    plantId(newV, oldV) {
      if (newV) {
        console.log('watch plantId:', newV)
        this.updatePickListByPlant(newV)
      }
      if (oldV) {
        this.ruleForm.pickId = null
      }
    }
  },
  created() {
  },
  mounted() {
    this.getGoodsList()
    this.getReportList()
    this.getPersonList()

    if (this.ruleForm.farmerId) {
      this.updatePlantListByPerson(this.ruleForm.farmerId)
    }

    if (this.ruleForm.plantId) {
      this.updatePickListByPlant(this.ruleForm.plantId)
    }
  },
  methods: {
    show(action, data) {
      this.action = action
      if (action === 'modify') {
        this.action = action
        const form = Object.assign({}, data)
        form.orderTime = new Date(data.orderTime)
        form.price /= 100
        this.ruleForm = form
      } else {
        this.action = 'add'
      }
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }

        const copyForm = Object.assign({}, this.ruleForm)
        copyForm.price *= 100

        const restInvoke = this.action === 'modify' ? updateOrder : addOrder
        this.loading = true
        restInvoke(copyForm).then((response) => {
          this.loading = false
          this.$refs[form].resetFields()
          this.$message({ message: `保存成功`, type: 'success' })
          this.$emit('add-success')
          this.hide()
        }).catch(err => {
          this.loading = false
          this.$message({ message: `保存失败：${err}`, type: 'error' })
        })
      })
    },
    formatPlantInfo(plant) {
      return plant.id + '/' + plant.farmerName + '/' + plant.goodsName + '/' + plant.year
    },
    formatPlantItemInfo(item) {
      return item.id + '/' + item.farmerName + '/' + item.actionName + '/' + new Date(item.actionDate).toLocaleDateString()
    },
    getGoodsList() {
      this.loading = true
      getAllGoods().then(res => {
        this.loading = false
        this.goodsList = res.data.data
      }).catch(err => {
        this.loading = false
        this.$message({ message: `获取商品列表失败, ${err}`, type: 'error' })
      })
    },
    getPersonList() {
      this.loading = true
      getAllPerson().then(res => {
        this.loading = false
        this.personList = res.data.data
      }).catch(err => {
        this.loading = false
        this.$message({ message: `获取人员列表失败, ${err}`, type: 'error' })
      })
    },
    getReportList() {
      this.loading = true
      getAllQualityReport().then(res => {
        this.loading = false
        this.reportList = res.data.data
      }).catch(err => {
        this.loading = false
        this.$message({ message: `获取列表失败, ${err}`, type: 'error' })
      })
    },
    updatePlantListByPerson(personId) {
      console.log('updatePlantListByPerson:', personId)
      this.loading = true
      getPlantListByPerson(personId).then(res => {
        this.loading = false
        this.plantList = res.data.data
      }).catch(err => {
        this.loading = false
        this.$message({ message: `获取列表失败, ${err}`, type: 'error' })
      })
    },
    updatePickListByPlant(plantId) {
      this.loading = true
      getPickListByPlant(plantId).then(res => {
        this.loading = false
        this.pickList = res.data.data
      }).catch(err => {
        this.loading = false
        this.$message({ message: `获取列表失败, ${err}`, type: 'error' })
      })
    }
  }
}
</script>

<style scoped>
</style>
