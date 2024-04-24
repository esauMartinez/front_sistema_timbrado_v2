import App from './App.vue';
import { createApp } from 'vue';
import { router } from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

// theme
import 'primevue/resources/themes/lara-light-indigo/theme.css';
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
	faPlaneDeparture,
	faBoxOpen,
	faPlus,
	faCircleInfo,
	faTimes,
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
library.add(faPlaneDeparture);
library.add(faBoxOpen);
library.add(faPlus);
library.add(faCircleInfo);
library.add(faTimes);

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
import Timeline from 'primevue/timeline';
import Message from 'primevue/message';
import InputNumber from 'primevue/inputnumber';
import TabMenu from 'primevue/tabmenu';
import Tree from 'primevue/tree';
import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Divider from 'primevue/divider';

// service toast
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(PrimeVue, {
	unstyled: true
});
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
app.component('Timeline', Timeline);
app.component('Message', Message);
app.component('InputNumber', InputNumber);
app.component('TabMenu', TabMenu);
app.component('Tree', Tree);
app.component('AutoComplete', AutoComplete);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Divider', Divider);

app.use(ToastService);
app.use(createPinia());
app.use(VueSidebarMenu);
app.use(router);
app.mount('#app');
