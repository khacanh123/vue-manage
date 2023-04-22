<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div className='h-full w-full flex bg-[#F8F9FF]'>
    <div className='w-2/5 bg-ct-primary'>
      <div className='h-full flex justify-center flex-col'>
        <img className='mx-auto w-60' src='@/assets/logo.svg' alt='' />
      </div>
    </div>
    <div className='flex  w-full h-full justify-center items-center'>
      <form className='bg-white w-fit h-fit p-20'>
        <p className='text-2xl uppercase font-bold mb-4'>Đăng Nhập</p>
        <div className='relative w-full mb-3'>
          <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2' htmlFor='grid-password'>
            Tài khoản
          </label>
          <TextInput className='w-[400px]' type='email' placeholder='your@hocmai.com' />
        </div>

        <div className='relative w-full mb-3'>
          <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2' htmlFor='grid-password'>
            Mật khẩu
          </label>
          <TextInput type='password' placeholder='Mật khẩu' />
        </div>
        <div className='text-center mt-6'>
          <button
            className='bg-ct-secondary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-10 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150'
            type='submit'>
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
