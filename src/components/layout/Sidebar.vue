<template>
    <nav className="z-40 font-['Be Vietnam Pro'] overflow-x-hidden shadow-xl bg-ct-primary flex flex-wrap items-center justify-between min-w-[260px] min-h-screen transition-all duration-200 ease-in-out"
        v-bind:style="props.hiddenSideBar ? 'width: 260px' : 'min-width: 0px; width: 0px; padding: 20px'">

        <div
            className='flex-col items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap justify-between w-full mx-auto'>
            <RouterLink to='/dashboard' className='flex justify-center mx-4 my-4'>
                <img className='w-[150px]'
                    src='https://img.freepik.com/premium-vector/education-icon-vector-illustartion-college-cap-graduate-hat-symbol-student-degree-sign_87543-11096.jpg'
                    alt='' />
            </RouterLink>

            <div
                className='md:flex md:flex-col md:items-stretch md:opacity-100 relative md:mt-4 md:shadow-none shadow left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded '>
                <p className='md:min-w-full text-ct-blue-300 text-xs uppercase block pb-2 mx-[30px] no-underline'>
                    main menu
                </p>

                <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
                    <li className='items-center w-full hover:bg-[#1B2B65] '>
                        <RouterLink to='/dashboard'
                            className='text-[14px] text-white py-[6px] leading-5 flex items-center w-full'>
                            <i class="fa fa-area-chart m-[10px] ml-8" style="font-size:24px"></i>
                            Dashboard
                        </RouterLink>
                    </li>
                    <li className='items-center w-full hover:bg-[#1B2B65] '>
                        <RouterLink to='/dashboard'
                            className='text-[14px] text-white py-[6px] leading-5 flex items-center w-full'>
                            <i class="fa fa-area-chart m-[10px] ml-8" style="font-size:24px"></i>
                            Lớp học
                        </RouterLink>
                    </li>
                </ul>
                <div className='text-xs text-white py-[6px] leading-5 w-full'>

                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { watch } from 'vue';
const props = defineProps({
    hiddenSideBar: {
        type: Boolean,
        default: true
    }
})
</script>