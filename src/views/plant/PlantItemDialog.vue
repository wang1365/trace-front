<template>
  <el-dialog :visible.sync="visible" :title="'新增种植条目 (农户：' + plant.farmerName+')'" width="30%" >
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="100px">
      <el-form-item label="时间" prop="actionDate">
        <el-date-picker v-model="ruleForm.actionDate" :picker-options="{disabledDate:disabledDate}" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="生产行为" prop="actionType">
        <el-select v-model="ruleForm.actionType" filterable placeholder="请选择">
          <el-option v-for="item in plantActionTypeList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="actionContent">
        <el-input v-model="ruleForm.actionContent" type="textarea" placeholder="填写内容"/>
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
      plant: null,
      personList: [],
      // ruleForm: {
      //   plantId: this.plant.id,
      //   actionType: null,
      //   actionPersonId: this.plant.farmerId,
      //   actionDate: null,
      //   actionContent: null
      // },
      ruleForm: {
        plantId: null,
        actionType: null,
        actionPersonId: null,
        actionDate: null,
        actionContent: null
      },
      formRules: {
        actionType: [
          { required: true, message: '请选择一个生产行为', trigger: 'blur' }
        ],
        actionPersonId: [
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
    show(plant, personId, personList, plantActionTypeList) {
      this.plant = plant
      this.ruleForm.plantId = plant.id
      this.ruleForm.actionPersonId = plant.farmerId
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
    },
    disabledDate(time) {
      return time.getTime() > new Date()
    }
  }
}
</script>

<style scoped>
</style>
