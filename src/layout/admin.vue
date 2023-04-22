<template>
    <div className='flex w-[calc(100vw-14px)] relative z-0'>
        <Sidebar v-bind:hiddenSideBar="hiddenSideBar" />
        <div className='bg-[#F7F8FE] grow  w-full overflow-auto'>
            <!-- menu bar -->
            <nav className='w-full bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center'>
                <div
                    className='w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 h-[90px] px-24 py-6 bg-white'>
                    <div class="me-1">
                        <button @click="hiddenSideBar = !hiddenSideBar" id="sidebarCollapse" type="button"
                            class="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4">
                            <i class="fa fa-bars mr-2"></i><small class="text-uppercase font-weight-bold"></small>
                        </button>
                    </div>
                </div>
            </nav>

            <div className='bg-white rounded-lg m-9 px-8 py-5' style="box-shadow: 0px 5px 10px 0px #F1F2FA;">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
const hiddenSideBar = ref(true)
</script>