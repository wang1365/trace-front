<template>
  <div class="main">
    <PlantItemDialog
      v-if="dialogVisible"
      ref="formDialog"
      :plant="selectedPlant"
      :dialog-visible="dialogVisible"
      :person-list="personList"
      :plant-action-type-list="plantActionTypeList"
      @add-success="_getPlantItemByPlant(selectedPlantId)" />
    <el-row>
      <el-select v-model="selectedPersonId" placeholder="请选择农户" width="100px" size="mini" @change="_getPlantByPerson(selectedPersonId)">
        <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="selectedPlantId" placeholder="请选择种植计划" width="200px" size="mini" @change="_getPlantItemByPlant(selectedPlantId)">
        <el-option v-for="item in plantList" :key="item.plant.id" :label="getPlantLabel(item)" :value="item.plant.id" />
      </el-select>
      <el-button :disabled="!selectedPlantId || selectedPlantId<=0" type="success" icon="el-icon-plus" size="small" @click="showModal">添加种植条目</el-button>
      <span style="color: rgba(0,0,0,0.2)"> 说明: 添加条目前请先选择农户和种植计划</span>

    </el-row>
    <el-row class="table">
      <el-table :data="plantItemList" size="small" border stripe highlight-current-row>
        <el-table-column prop="plantItem.id" label="ID" width="100" />
        <el-table-column prop="plantItem.plantId" label="种植计划ID" />
        <el-table-column prop="actionType.name" label="实施类型" />
        <el-table-column prop="plantItem.actionDate" label="开始时间" />
        <el-table-column prop="farmer.name" label="农户姓名" />
        <el-table-column prop="goods.name" label="农作物名称" />
        <el-table-column prop="plantItem.createTime" label="记录时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.plantItem.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAllPlant, getPlantItemByPlant, getPlantActionTypeList, deletePlantItem } from '@/api/plant'
import { getAllPerson } from '@/api/person'
import PlantItemDialog from './PlantItemDialog'

export default {
  name: 'PlantItem',
  components: {
    PlantItemDialog
  },
  data() {
    return {
      personList: [],
      plantList: [],
      plantItemList: [],
      plantActionTypeList: [],
      selectedPersonId: null,
      selectedPlantId: null,
      dialogVisible: false
    }
  },
  computed: {
    selectedPlant() {
      return this.plantList.find(plant => {
        return plant.plant.id === this.selectedPlantId
      })
    }

  },
  created() {
  },
  mounted() {
    this._getPersonList()
    this._getPlantActionTypeList()
  },
  methods: {
    handleView(index, row) {
    },
    showModal() {
      this.dialogVisible = true
      this.$refs['formDialog'].show()
    },
    getPlantLabel(plant) {
      return plant.goods.name + ' / ' + plant.plant.startDate + ' / ' + plant.plant.address
    },
    onCheckDetail(plantId) {

    },
    getActionTypeName(typeId) {
      console.log('############', this.plantActionTypeList)
      // return this.plantActionTypeList.find(v => {
      //   return v.id === typeId
      // }).name || ''
    },
    _getPersonList() {
      getAllPerson().then(res => {
        this.personList = res.data.data
      })
    },
    _getPlantByPerson(personId) {
      console.log('#### getPlantListByPerson')
      this.plantList = []
      this.selectedPlantId = null
      getAllPlant({ farmerId: personId }).then(res => {
        this.plantList = res.data.data
      })
    },
    _getPlantItemByPlant() {
      console.log('##### _getPlantItemByPlant')
      getPlantItemByPlant(this.selectedPlantId).then(response => {
        this.plantItemList = response.data.data
      })
    },
    _getPlantActionTypeList() {
      getPlantActionTypeList().then(res => {
        this.plantActionTypeList = res.data.data
      })
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlantItem(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this._getPlantItemByPlant()
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
