<template>
    <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <Loader v-if="loading"/>
    <div class="row" v-else>
      <CategoryCreate @created="addNewCategory"/>
      <CategoryEdit v-if="categories.length" :key ="categories.length + updateCount" @updated="updateCategories" :categories="categories"/>
      <p v-else class="center">
        Категорий пока нет
      </p>
    </div>
  </section>
</div>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  name:'categories',
  data: () => ({
    categories:[],
    loading:true,
    updateCount:0
  }),
  metaInfo(){
    return {
      title:this.$title('Menu_Categories')
    }
  },
  async mounted(){
    this.categories=await this.$store.dispatch("fetchCategories")
    this.loading=false
  },
  methods:{
    updateCategories(category){
      const idx=this.categories.findIndex(c => c.id===category.id)
      this.categories[idx].title=category.title
      this.categories[idx].limit=category.limit
      this.updateCount++
    },
    addNewCategory(category){
      this.categories.push(category)
    }
  },
  components:{
    CategoryCreate,CategoryEdit
  }
}
</script>