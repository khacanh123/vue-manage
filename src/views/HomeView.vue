

<template>
  <main className='h-screen'>
    <section className='w-full h-full min-h-screen'>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='h-full w-full flex bg-[#F8F9FF]'>
          <div className='w-2/5 bg-ct-primary'>
            <div className='h-full flex justify-center flex-col'>
              <img className='mx-auto w-60' src='@/assets/logo.svg' alt='' />
            </div>
          </div>
          <div className='flex  w-full h-full justify-center items-center'>

            <form @submit.prevent="submit">
              <p className='text-2xl uppercase font-bold mb-4'>Đăng Nhập</p>


              <v-text-field v-model="email.value.value" class="w-[400px]" :error-messages="email.errorMessage.value"
                label="E-mail"></v-text-field>
              <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value"
                label="Mật khẩu"></v-text-field>

              <p>%VITE_API_URL_ADMIN%</p>

              <v-btn class="me-4" type="submit">
                Go
              </v-btn>


            </form>

          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { RequestAPI } from '@/api/requestAPI'
const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 1) return true

      return 'Vui lòng nhập mật khẩu.'
    },
    // phone(value) {
    //   if (value?.length > 9 && /[0-9-]+/.test(value)) return true

    //   return 'Phone number needs to be at least 9 digits.'
    // },
    email(value) {
      if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )) return true

      return 'Vui lòng nhập email.'
    },
    // select(value) {
    //   if (value) return true

    //   return 'Select an item.'
    // },
    // checkbox(value) {
    //   if (value === '1') return true

    //   return 'Must be checked.'
    // },
  },
})
const name = useField('name')
const email = useField('email')



const submit = handleSubmit(values => {
  RequestAPI({
    url: 'admin/user/login',
    method: 'POST',
    payload: {
      email: values.email,
      password: values.name
    }
  }).then((res) => {
    console.log('====================================');
    console.log(res);
    console.log('====================================');
  })
  console.log('====================================');
  console.log(values);
  console.log('====================================');
})


</script>
