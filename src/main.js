import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
// Vuetify
import Checkbox from "primevue/checkbox";
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import AutoComplete from "primevue/autocomplete";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Button from "primevue/button";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import Dropdown from "primevue/dropdown";
import Paginator from "primevue/paginator";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import MultiSelect from "primevue/multiselect";
import Calendar from "primevue/calendar";
import Password from "primevue/password";
import Textarea from "primevue/textarea";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import DialogService from "primevue/dialogservice";
import DynamicDialog from "primevue/dynamicdialog";
import OrderList from "primevue/orderlist";
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Card from "primevue/card";
import Breadcrumb from "primevue/breadcrumb";
import InputSwitch from "primevue/inputswitch";
import Listbox from "primevue/listbox";
import Fieldset from "primevue/fieldset";
import RadioButton from "primevue/radiobutton";
import CascadeSelect from "primevue/cascadeselect";
import FileUpload from "primevue/fileupload";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component("Checkbox", Checkbox);
app.use(DialogService);
app.use(ToastService)
app.component("DynamicDialog", DynamicDialog);
app.component("DataTable", DataTable);
app.component("OrderList", OrderList);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("AutoComplete", AutoComplete);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Button", Button);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Dropdown", Dropdown);
app.component("Paginator", Paginator);
app.component("Toast", Toast);
app.component("MultiSelect", MultiSelect);
app.component("Dialog", Dialog);
app.component("Calendar", Calendar);
app.component("Password", Password);
app.component("Textarea", Textarea);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Panel", Panel);
app.component("Avatar", Avatar);
app.component("Card", Card);
app.component("Breadcrumb", Breadcrumb);
app.component("InputSwitch", InputSwitch);
app.component("Listbox", Listbox);
app.component("Fieldset", Fieldset);
app.component("RadioButton", RadioButton);
app.component("CascadeSelect", CascadeSelect);
app.component("FileUpload", FileUpload);
app.mount('#app')
