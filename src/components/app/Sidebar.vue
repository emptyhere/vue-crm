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
import localizeFilter from '@/filters/localize.filter'

export default {
    props: ['value'],
    data: () => ({
        links:[
            {
            title: localizeFilter('SideBar_Bill'),
            url: '/',
            exact: true
            },
            {
            title: localizeFilter('SideBar_History'),
            url: '/history'
            },
            {
            title: localizeFilter('SideBar_Planning'),
            url: '/planning'
            },
            {
            title: localizeFilter('SideBar_Record'),
            url: '/record'
            },
            {
            title: localizeFilter('SideBar_Categories'),
            url: '/categories'
            }
        ]
    })
}
</script>


