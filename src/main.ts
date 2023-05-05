import App from './App.vue';
import { createApp } from 'vue';
import { router } from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

// theme
import '/public/saga-green/theme.scss';
// core
import 'primevue/resources/primevue.min.css';
// icons
import 'primeicons/primeicons.css';
// my styles
import '../public/css/style.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faBriefcase,
	faBuilding,
	faChevronRight,
	faHouse,
	faMoon,
	faRightFromBracket,
	faShieldHalved,
	faSun,
	faTrailer,
	faTruck,
	faUserAstronaut,
	faUsers,
	faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faChevronRight);
library.add(faUsers);
library.add(faRightFromBracket);
library.add(faBuilding);
library.add(faHouse);
library.add(faShieldHalved);
library.add(faTruck);
library.add(faUserAstronaut);
library.add(faBriefcase);
library.add(faMoon);
library.add(faSun);
library.add(faTrailer);
library.add(faGlobe);

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import TreeTable from 'primevue/treetable';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputSwitch from 'primevue/inputswitch';
import Toast from 'primevue/toast';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import TreeSelect from 'primevue/treeselect';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Avatar from 'primevue/avatar';
import ProgressBar from 'primevue/progressbar';
import Tag from 'primevue/tag';
import Panel from 'primevue/panel';
import FileUpload from 'primevue/fileupload';
import Listbox from 'primevue/listbox';
import ProgressSpinner from 'primevue/progressspinner';
import Image from 'primevue/image';

// service toast
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(PrimeVue);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('TreeTable', TreeTable);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputSwitch', InputSwitch);
app.component('Toast', Toast);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('TreeSelect', TreeSelect);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('Avatar', Avatar);
app.component('ProgressBar', ProgressBar);
app.component('Tag', Tag);
app.component('Panel', Panel);
app.component('FileUpload', FileUpload);
app.component('Listbox', Listbox);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Image', Image);

app.use(ToastService);
app.use(createPinia());
app.use(router);
app.mount('#app');
