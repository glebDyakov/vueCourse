<template>
<div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>
  <Loader v-if="loading"/>
  <p class="center" v-else-if="!records.length">Записей пока нет<router-link to="/record">Добавьте первую<router-link></p>
  <section v-else>
    <HistoryTable : :records="items"/>
    <paginate
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперёд'"
      :container-class="'pagination'"
      :page-class="waves-effect"
      />

    />
  </section>
</div>
    
</template>
<script>
import HistoryTable from '@/components/HistoryTable.vue'
import paginationMixin from '@/mixins/pagination.mixin.js'
import {Pie} from 'vue-chart.js'
export default {
  name:'history',
  extends:Pie,
  mixins:[paginationMixin],
  data:() => ({
    loading:true,
    records:[],
    
  }),
  
  async mounted(){
    this.records = await this.$store.dispatch('fetchRecords')
    
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)
    this.loading=false
  },
  metaInfo(){
    return {
      title:this.$title('Menu_History')
    }
  },
  methods:{
    setup(categories){
      this.setupPagination(records.map(record=>{
      return{
        ...record,
        categoryName:this.categories.find(c => c.id===record.categoryId),
        typeClass:record.type==='income' ? 'green' : 'red',
        typeText:record.type==='income' ? 'доход' : 'расход',
      }
    }))
    this.renderChart({
    chartdata: {
      labels: categories.map(c=>c.title),
      datasets: [
        {
          label: 'Расходы по категориям',
          backgroundColor: '#f87979',
          data: categories.map(c=>{
            return this.records.reduce((total,r)=> {
              if(r.categoryId ===c.id && r.type === 'outcome'){
                total+= +r.amount
              }
              return total
            },0)
          })
        }
      ]
    })
    }
  },
  components:{
    HistoryTable
  }
}
</script>