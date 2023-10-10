<template>
    <div className='wrapper'>
        <!-- <Sidebar v-bind:hiddenSideBar="openSideBar" /> -->
        <!-- <div className='bg-[#F7F8FE] main-content'> -->
        <!-- menu bar -->
        <div className='bg-white main-content' style="box-shadow: 0px 5px 10px 0px #F1F2FA;">
            <!-- <MenuBar v-on:toggleSideBar="toggleSideBar()" /> -->

            <slot />
        </div>
        <!-- </div> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
// import Sidebar from '../components/layout/Sidebar.vue'
// import MenuBar from '../components/layout/MenuBar.vue'
import { storeToRefs } from 'pinia';
import { useManageStatus } from '../stores/manageStatus';

const { openSideBar } = storeToRefs(useManageStatus())
const { toggleSideBar } = useManageStatus()
</script>