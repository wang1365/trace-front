<template>
  <el-dialog :visible.sync="visible" :title="title" center>
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="100px">
      <el-form-item label="农作物名称" prop="goodsId">
        <el-select v-model="ruleForm.goodsId" placeholder="请选择">
          <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="农户" prop="farmerId">
        <el-select v-model="ruleForm.farmerId" placeholder="请选择">
          <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="种植年度" prop="year">
        <el-date-picker v-model="ruleForm.year" value-format="yyyy" type="year" placeholder="选择年"/>
      </el-form-item>
      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker v-model="ruleForm.startDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="地点" prop="address">
        <el-input v-model="ruleForm.address" placeholder="填写种植地点"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">保存</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllGoods } from '@/api/goods'
import { getAllPerson } from '@/api/person'
import { addPlant, updatePlant } from '@/api/plant'

export default {
  name: 'PlantForm',
  props: {
    plantList: {
      type: Array,
      default: null
    }
  },
  data() {
    const validateDup = (rule, value, callback) => {
      const dup = this.plantList.find((v) => {
        return this.ruleForm.goodsId === v.goodsId &&
        this.ruleForm.farmerId === v.farmerId &&
        Number(this.ruleForm.year) === v.year
      })
      if (dup) {
        callback(new Error('每年每个农户每个商品只能添加一个种植计划'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      action: 'add',
      goodsList: [],
      reportList: [],
      personList: [],
      ruleForm: {
        goodsId: null,
        farmerId: null,
        startDate: null,
        address: null,
        year: new Date()
      },
      formRules: {
        goodsId: [
          { required: true, message: '请选择一个农作物名称', trigger: 'blur' },
          { validator: validateDup, trigger: 'blur' }
        ],
        farmerId: [
          { required: true, message: '请选择种植户', trigger: 'blur' },
          { validator: validateDup, trigger: 'blur' }
        ],
        year: [
          { required: true, message: '年度不能为空', trigger: 'blur' },
          { validator: validateDup, trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择种植开始时间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.action === 'modify' ? '修改种植计划' : '新增种植计划'
    }
  },
  created() {
  },
  mounted() {
    this.getGoodsList()
    this._getPersonList()
  },
  methods: {
    show(action, form) {
      this.action = action
      if (action === 'modify') {
        this.ruleForm = Object.assign({}, form)
        this.ruleForm.year = new Date(form.year + '-01-01')
        this.ruleForm.startDate = new Date(form.startDate)
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
        const restInvoke = this.action === 'modify' ? updatePlant : addPlant
        restInvoke(this.ruleForm).then((response) => {
          this.$message({ message: `保存成功`, type: 'success' })
          this.$refs['ruleForm'].resetFields()
          this.$emit('add-success')
          this.hide()
        }).catch(err => {
          this.$message({ message: `保存失败：${err}`, type: 'error' })
        })
      })
    },
    getGoodsList() {
      getAllGoods().then(res => {
        this.goodsList = res.data.data
      }).catch(err => {
        this.$message({ message: `获取农作物名称列表失败, ${err}`, type: 'error' })
      })
    },
    _getPersonList() {
      getAllPerson().then(res => {
        this.personList = res.data.data
      }).catch(err => {
        this.$message({ message: `获取人员列表失败, ${err}`, type: 'error' })
      })
    }

  }
}
</script>

<style scoped>
</style>
