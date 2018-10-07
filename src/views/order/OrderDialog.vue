<template>
  <el-dialog :visible.sync="flag" title="新增种植计划" center>
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="100px">
      <el-form-item label="商品" prop="goodsId">
        <el-select v-model="ruleForm.goodsId" placeholder="请选择">
          <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="采购数量"
        prop="quantity">
        <el-input v-model.number="ruleForm.quantity" type="number" placeholder="填写商品数量"/>
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
        <el-input v-model.trim="ruleForm.buyerId" placeholder="填写采购人"/>
      </el-form-item>
      <el-form-item label="菜农" prop="sellerId">
        <el-select v-model="ruleForm.sellerId" placeholder="请选择">
          <el-option v-for="item in personList" :key="item.id" :label="item.id + '.' + item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="种植计划" prop="plantId">
        <el-select v-model="ruleForm.plantId" placeholder="关联种植计划">
          <el-option v-for="item in plantList" :key="item.id" :label="item" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="采摘条目" prop="pickId">
        <el-select v-model="ruleForm.pickId" placeholder="关联种植计划中的采摘">
          <el-option v-for="item in pickList" :key="item.id" :label="item" :value="item.id"/>
        </el-select>
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
import { getAllPerson } from '@/api/person'
import { getPlantListByPerson, getPickListByPlant } from '@/api/plant'

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
      plantList: [],
      pickList: [],
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
    }
  },
  watch: {
    dialogVisible(newVal) {
      if (!newVal) {
        this.$refs['ruleForm'].resetFields()
      }
      this.flag = this.dialogVisible
    },
    sellerId() {
      this.updatePlantListByPerson(this.ruleForm.sellerId)
      this.ruleForm.plantId = null
    },
    plantId() {
      this.updatePickListByPlant(this.ruleForm.plantId)
      this.ruleForm.pickId = null
    }
    // ,
    // ruleForm: {
    //   handler(newV, oldV) {
    //     console.log('select seller changes, ', newV.sellerId, oldV.sellerId)
    //     if (newV.sellerId !== oldV.sellerId) {
    //       this.updatePlantListByPerson()
    //       this.ruleForm.plantId = null
    //     }
    //     if (newV.plantId !== oldV.plantId) {
    //       this.updatePickListByPlant()
    //       this.ruleForm.pickId = null
    //     }
    //   },
    //   deep: true
    // }
  },
  created() {
  },
  mounted() {
    this.getGoodsList()
    this.getReportList()
    this.getPersonList()
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
        this.goodsList = res.data.data
      }).catch(err => {
        this.$message({ message: `获取商品列表失败, ${err}`, type: 'error' })
      })
    },
    getPersonList() {
      getAllPerson().then(res => {
        this.personList = res.data.data
      }).catch(err => {
        this.$message({ message: `获取人员列表失败, ${err}`, type: 'error' })
      })
    },
    getReportList() {
      getAllQualityReport().then(res => {
        this.reportList = res.data.data
      }).catch(err => {
        this.$message({ message: `获取列表失败, ${err}`, type: 'error' })
      })
    },
    updatePlantListByPerson(personId) {
      getPlantListByPerson(personId).then(res => {
        this.plantList = res.data.data
      })
    },
    updatePickListByPlant(plantId) {
      getPickListByPlant(plantId).then(res => {
        this.pickList = res.data.data
      })
    }
  }
}
</script>

<style scoped>
</style>
