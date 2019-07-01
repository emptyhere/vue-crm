<template>
    <div class="preloader-wrapper active">
        <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
            <div class="circle"></div>
        </div><div class="gap-patch">
            <div class="circle"></div>
        </div><div class="circle-clipper right">
            <div class="circle"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    computed: {
        color() {
            const colors = ['spinner-yellow-only', 'spinner-green-only', 'spinner-red-only', 'spinner-blue-only']
            return colors[Math.round(Math.random()*3)]
        }
    }
}
</script>