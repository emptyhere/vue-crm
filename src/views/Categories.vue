<template>
    <div>
        <div class="page-title">
            <h3>Categories</h3>
        </div>
        <section>
            <Loader v-if="loading" />
            <div class="row" v-else>
                <CategoryCreate
                @created="addNewCategory"/>

                <CategoryEdit 
                v-if="categories.length"
                :categories="categories"
                :key="categories.length + updateCount"
                @updated="updateCategory" />
                <span v-else class="center">Categories not found</span>
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
    data: () => ({
        categories: [],
        loading: true,
        updateCount: 0
    }),
    components: {
        CategoryCreate,
        CategoryEdit
    },
    async mounted() {
       this.categories = await this.$store.dispatch('fetchCategories')
       this.loading = false
    },
    methods: {
        addNewCategory(category) {
            this.categories.push(category)
        },
        updateCategory(category) {
            const index = this.categories.findIndex(item => item.id === category.id)
            this.categories[index].title = category.title
            this.categories[index].limit = category.limit
            this.updateCount++
        }
    }
}
</script>
