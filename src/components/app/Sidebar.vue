<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
        <router-link
        v-for="(item, index) in links"
        :key="index"
        tag="li"
        active-class="active"
        :to="item.url"
        :exact="item.exact">
            <a href="" class="waves-effect waves-orange pointer">{{item.title}}</a>
        </router-link>
        
    </ul>
</template>

<script>
export default {
    props: ['value'],
    data: () => ({
        links:[
            {
            title: 'Account',
            url: '/',
            exact: true
            },
            {
            title: 'History',
            url: '/history'
            },
            {
            title: 'Planning',
            url: '/planning'
            },
            {
            title: 'New record',
            url: '/record'
            },
            {
            title: 'Categories',
            url: '/categories'
            }
        ]
    })
}
</script>


