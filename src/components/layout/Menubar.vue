<template>
    <nav className='menu-bar'>
        <div
            className='w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 h-[90px] px-24 py-6 bg-white'>
            <div class="me-1">
                <button @click="emits('toggleSideBar')" id="sidebarCollapse" type="button"
                    class="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4">
                    <i class="fa fa-bars mr-2"></i><small class="text-uppercase font-weight-bold"></small>
                </button>
            </div>
            <div>
                <Button label="Create issue" @click="visible = true" />
            </div>
        </div>
    </nav>
    <CreateTask v-if="visible" v-on:closeDialog="visible = !visible" v-bind:visible="visible" />
</template>
<script setup>
import { ref } from 'vue'
import CreateTask from '@/components/CreateTask/Index.vue'
const visible = ref(false)
const emits = defineEmits(['toggleSideBar'])

</script>