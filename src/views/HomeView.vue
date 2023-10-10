<script setup>
import { ref, reactive, watch } from "vue";
import Editor from 'primevue/editor';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup'
import { useToast } from "primevue/usetoast";
import firebase from '@/utils/firebase';

const toast = useToast();
const dataQuestion = reactive({
  quizType: 0,
  name: '',
  tags: '',
  typeQues: '',
  level: '',
  text: '',
  solution: '',
  dataAnswer: null
})
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Title is required'),
  tags: Yup.string()
    .required('First Name is required'),
  typeQues: Yup.string()
    .required('Last name is required'),
  level: Yup.string()
    .required('Last name is required'),
  quizType: Yup.string()
    .required('Last name is required'),
});
const updateAnswer = (data) => {
  dataQuestion.dataAnswer = JSON.parse(JSON.stringify(data))
}

function onSubmit(values) {
  let sendRequest = true;
  if (dataQuestion.text == '') {
    sendRequest = false;
    return toast.add({ severity: 'error', summary: 'Error', detail: 'Vui lòng nhập nội dung câu hỏi', life: 3000 });
  }
  if (dataQuestion.quizType == 1) {
    // check dien thong tin cau tra loi
    if (dataQuestion.dataAnswer == null) {
      sendRequest = false;
      return toast.add({ severity: 'error', summary: 'error', detail: 'Vui lòng nhập đáp án', life: 3000 })
    } else {
      const data = JSON.parse(JSON.stringify(dataQuestion.dataAnswer));
      // check các đáp án đã đc điền
      let isFill = 0;
      data.listAnswer.map((item) => {
        if (item.content.trim() == '') {
          isFill++
        }
      })
      if (isFill > 0) {
        sendRequest = false
        return toast.add({ severity: 'error', summary: 'error', detail: 'Đáp án không được để trống', life: 3000 })
      }
      // check chọn đáp án đúng
      if (!data.hasOwnProperty('answer_true')) {
        sendRequest = false
        return toast.add({ severity: 'error', summary: 'error', detail: 'Vui lòng chọn đáp án đúng cho câu hỏi', life: 3000 })
      }
    }
  }
  if (sendRequest) {
    const data = JSON.parse(JSON.stringify(dataQuestion));
    const product = firebase.database().ref('project');
    product.push(data);
  }
}
const RequestQues = () => {
  connectApi
}
</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <div class="card m-3">
    <button>Get question</button>
    <h5 class="card-header">Vue 3 + VeeValidate - Form Validation Example (Composition API)</h5>
    <div class="card-body">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="flex flex-wrap">
          <div class="w-1/3 px-7 py-3">
            <label for="tensp" class=" font-semibold">Tên câu hỏi</label>
            <Field name="name" type="text" class="form-control" v-model="dataQuestion.name"
              :class="{ 'is-invalid': errors.name }" />
            <div class="invalid-feedback">{{ errors.name
            }}</div>

          </div>
          <div class="w-1/3 px-7 py-3">
            <label for="tensp" class=" font-semibold">Định danh câu hỏi</label>
            <Field name="tags" type="text" class="form-control" :class="{ 'is-invalid': errors.tags }"
              v-model="dataQuestion.tags" />
            <div class="invalid-feedback">{{ errors.tags
            }}</div>
          </div>
          <div class="w-1/3 px-7 py-3">
            <label for="tensp" class=" font-semibold">Lĩnh vực câu hỏi</label>
            <Field name="typeQues" v-model="dataQuestion.typeQues" type="text" class="form-control"
              :class="{ 'is-invalid': errors.typeQues }" />
            <div class="invalid-feedback">{{ errors.typeQues
            }}</div>
          </div>

          <div class="w-1/3 px-7 py-3">
            <label for="tensp" class=" font-semibold">Độ khó</label>
            <Field name="level" v-model="dataQuestion.level" as="select" class="form-control"
              :class="{ 'is-invalid': errors.level }">
              <option value="1">Dễ</option>
              <option value="2">Trung bình</option>
              <option value="3">Khó</option>
            </Field>
            <div class="invalid-feedback">{{ errors.level
            }}</div>
          </div>
          <div class="w-1/3 px-7 py-3">
            <label for="tensp" class=" font-semibold">Loại câu hỏi</label>
            <Field name="quizType" as="select" class="form-control" v-model="dataQuestion.quizType"
              :class="{ 'is-invalid': errors.quizType }">
              <option value="0">Tự luận</option>
              <option value="1">Trắc nghiệm 1 đáp án đúng</option>
              <option value="2">Trắc nghiệm nhiều đáp án đúng</option>
            </Field>
            <div class="invalid-feedback">{{ errors.quizType
            }}</div>
          </div>
          <div class="w-full  px-7 py-3">
            <label for="" class=" font-semibold">Nội dung câu hỏi</label>
            <Editor v-model="dataQuestion.text" editorStyle="height: 100px" />
          </div>
          <div class="w-full  px-7 py-3">
            <label for="" class=" font-semibold">Nội dung giải thích</label>
            <Editor v-model="dataQuestion.solution" editorStyle="height: 100px" />
          </div>
        </div>
        <div>
          <!-- <createQuestionComp v-bind:quizType="Number(dataQuestion.quizType)" v-on:updateAnswer="updateAnswer" /> -->
        </div>

        <div class="flex justify-center">
          <Button type="submit" class="w-[200px]" label="Tạo mới" />
        </div>
      </Form>
    </div>
  </div>
</template>