<template>
    <h1>Details {{ product?.p_name }} - {{ product?.p_price }}</h1>
    <input type="text" v-model="product.p_price">
    <br />
    <div class="flex">
        <div class="w-1/2 px-7 py-3">
            <label for="tensp" class=" font-semibold">Tên sản phẩm</label>
            <InputText type="text" v-model="product.p_name" class="w-full" />
        </div>
        <div class="w-1/2 px-7 py-3">
            <label for="tensp" class=" font-semibold">Giá sản phẩm</label>
            <InputText type="text" v-model="product.p_price" class="w-full" />
        </div>

    </div>
    <div class="w-full px-7 py-3">
        <label for="tensp" class=" font-semibold">Mô tả sản phẩm</label>
        <Textarea class="w-full" v-model="product.p_description" />
    </div>
    <DataTable :value="data" showGridlines tableStyle="min-width: 50rem">
        <Column field="id" header="ID"></Column>
        <Column field="p_name" header="Name"></Column>
        <Column field="p_price" header="Price"></Column>
        <Column field="p_quality" header="Quantity"></Column>
    </DataTable>
</template>
<script setup>
import firebase from '@/utils/firebase';
import { onMounted, reactive, watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const product = reactive({
    p_name: '',
    p_img: '',
    p_description: '',
    p_category: '',
    p_price: '',
    p_promotion: '',
    p_quality: '',
    p_status: ''
})
const data = ref(null)
onMounted(() => {
    const todoRef = firebase.database().ref('product');
    todoRef.on('value', (snapshot) => {
        const todos = snapshot.val();
        const todoList = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id] });
        }
        console.log('====================================');
        console.log('fff');
        console.log('====================================');
        data.value = todoList
    });
})
const selected = ref(0)
onMounted(async () => {
    const todoRef = await firebase.database().ref('product').child(route.params.id);
    //   console.log(todoRef);
    todoRef.on('value', (snapshot) => {
        const todos = snapshot.val();
        product.p_name = todos.p_name;
        product.p_price = todos.p_price;
        product.p_description = todos.p_description;
        product.p_category = todos.p_category;
    });
})

watch(() => product.p_price, (old, newV) => {
    if (Number(newV) < 0) {
        alert('666')
    }
})
watch(() => selected, (old, newV) => {
    console.log('====================================');
    console.log(newV);
    console.log('====================================');
})
const pushArr = () => {
    const index = data.value.length + 1;
    data.value.push(index)
}
const updateSelected = (id) => {
    selected.value = id + ''
}
</script>