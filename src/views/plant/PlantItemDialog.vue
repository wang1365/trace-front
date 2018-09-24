<template>
  <el-dialog :visible.sync="flag" :title="'新增种植条目 ('+title+')'" >
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="100px">
      <el-form-item label="时间" prop="actionDate">
        <el-date-picker v-model="ruleForm.actionDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="生产行为" prop="actionType">
        <el-select v-model="ruleForm.actionType" placeholder="请选择">
          <el-option v-for="item in plantActionTypeList" :key="item.value" :label="item.name" :value="item.value"/>
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
      <el-button size="small" @click="flag = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addPlantItem } from '@/api/plant'

export default {
  name: 'PlantItemForm',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    plant: {
      type: Object,
      default: null
    },
    personList: {
      type: Array,
      default: null
    },
    plantActionTypeList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      flag: this.dialogVisible,
      ruleForm: {
        plantId: null,
        actionType: null,
        actionFarmerId: this.plant.farmer.id,
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
      return this.plant.farmer.name + ':' + this.plant.goods.name + ':' + this.plant.plant.startDate
    }
  },
  // watch: {
  //   dialogVisible(newVal) {
  //     if (!newVal) {
  //       this.$refs['ruleForm'].resetFields()
  //     }
  //     this.flag = this.dialogVisible
  //   }
  // },
  created() {
  },
  mounted() {
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
        addPlantItem(this.ruleForm).then((response) => {
          this.$message({ message: `添加种植条目成功`, type: 'success' })
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
