<template>
  <div class="dashboard-editor-container">
    <div class="map-title">寿光蔬菜溯源平台用户地图</div>
    <div id="map"/>
    <!--<github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>-->

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import BMap from 'BMap'
import * as tenantApi from '@/api/tenant'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    BMap
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      tenantList: [],
      map: null,
      mapGeocoder: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    initMap() {
      this.map = new BMap.Map('map')
      this.map.enableScrollWheelZoom()
      var ctrlNav = new window.BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
      })
      this.map.addControl(ctrlNav)
      // 第5步：向地图中添加缩略图控件
      var ctrlOve = new window.BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: true
      })
      this.map.addControl(ctrlOve)

      this.map.addControl(new BMap.MapTypeControl())
      this.mapGeocoder = new BMap.Geocoder()
      const point = new BMap.Point(118.712077, 36.894101)
      this.map.centerAndZoom(point, 14)
      tenantApi.getTenantList().then(res => {
        this.tenantList = res.data.data
        this.updateTenantInMap()
      })
    },
    updateTenantInMap() {
      this.tenantList.forEach((tenant, index) => {
        console.log('add tenant:', tenant.shortName, tenant.lon, tenant.lat)
        const myIcon = new BMap.Icon('http://api.map.baidu.com/img/markers.png', new BMap.Size(23, 25), {
          offset: new BMap.Size(10, 25), // 指定定位位置
          imageOffset: new BMap.Size(0, 0 - (index) * 25) // 设置图片偏移
        })

        const marker = new BMap.Marker(new BMap.Point(tenant.lon, tenant.lat), { icon: myIcon })
        const label = new BMap.Label((index + 1) + ': ' + tenant.shortName, { 'offset': new BMap.Size(-30, -20) })
        label.setStyle({
          borderColor: '#808080',
          color: '#333',
          cursor: 'pointer'
        })
        marker.setLabel(label)
        this.map.addOverlay(marker)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  #map {
    width: 99%;
    height: 500px;
    margin: 0 auto;
    box-shadow:0px 0px 30px 10px #abcdef;
    &:hover {
      width: 100%;
      box-shadow:0px 0px 30px 10px #a0c8b3;
    }
  }
  .map-title {
    margin: 0 auto 20px;
    text-align: center;
    font-size: 30px;
    color: green;
  }
}
</style>
