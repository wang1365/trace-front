<template>
  <el-dialog :visible.sync="visible" title="新增种植条目" >
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="100px">
      <el-form-item label="时间" prop="actionDate">
        <el-date-picker v-model="ruleForm.actionDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="生产行为" prop="actionType">
        <el-select v-model="ruleForm.actionType" placeholder="请选择">
          <el-option v-for="item in plantActionTypeList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="实施人" prop="actionFarmerId">
        <el-select v-model="ruleForm.actionFarmerId" placeholder="请选择">
          <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="actionContent">
        <el-input v-model="ruleForm.actionContent" placeholder="填写内容"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">添加</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addPlantItem } from '@/api/plant'

export default {
  name: 'PlantItemForm',
  props: {

  },
  data() {
    return {
      visible: false,
      personId: null,
      plantActionTypeList: [],
      personList: [],
      // ruleForm: {
      //   plantId: this.plant.id,
      //   actionType: null,
      //   actionFarmerId: this.plant.farmerId,
      //   actionDate: null,
      //   actionContent: null
      // },
      ruleForm: {
        plantId: null,
        actionType: null,
        actionFarmerId: null,
        actionDate: null,
        actionContent: null
      },
      formRules: {
        actionType: [
          { required: true, message: '请选择一个生产行为', trigger: 'blur' }
        ],
        actionFarmerId: [
          { required: true, message: '请选择种植户', trigger: 'blur' }
        ],
        actionDate: [
          { required: true, message: '请选择种植开始时间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.plant.farmerName + ':' + this.plant.goodsName + ':' + this.plant.startDate
    },
    plantId() {
      return this.plant.id
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    show(plantId, personId, personList, plantActionTypeList) {
      this.ruleForm.plantId = plantId
      this.personId = personId
      this.personList = personList
      this.plantActionTypeList = plantActionTypeList
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
        addPlantItem(this.ruleForm).then((response) => {
          this.$message({ message: `添加种植条目成功`, type: 'success' })
          this.$refs['ruleForm'].resetFields()
          this.$emit('add-success')
          this.hide()
        }).catch(err => {
          this.$message({ message: `添加失败：${err}`, type: 'error' })
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
