<template>
  <div>
    <el-row :gutter="24">
      <el-col>
        <el-card style="margin: 10px 10px 10px 10px;">
          <span>名称：</span>
          <el-input style="width: 200px;" size="mini" placeholder="请输入内容" />
          <el-button style="margin-left: 10px;" size="mini" type="primary">查询</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col>
        <el-card style="margin: 0 10px 10px 10px;">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" style="margin-bottom: 10px;"
            @click="handleAdd()">添加</el-button>
          <el-table :data="tableData" height="620" border size="mini" style="width: 100%">
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="isDelete" label="是否启用"></el-table-column>
            <el-table-column prop="remark" label="附记"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handleClick(scope.row)">重置密码</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card style="margin: 0 10px 10px 10px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="page.pageIndex" :page-sizes="[1, 10, 20, 30, 40, 50]" :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="page.total" style="margin-top:10px;">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="编号" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="账号"></el-table-column>
        <el-table-column property="address" label="账号"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getUserByPageAsync } from '@/api/user'
export default {
  data() {
    return {
      dialogTableVisible: false,
      page: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  created: function () {
    this.load()
  },
  methods: {
    load() {
      getUserByPageAsync(this.page.pageIndex, this.page.pageSize).then(res => {
        this.tableData = res.data.data
        this.page.total = res.data.total
      })
    },
    handleAdd() { },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.load()
    },
    handleCurrentChange(val) {
      this.page.pageIndex = val
      this.load()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>
