<script lang="ts" setup>
import { useTrip } from '../../../composables/useTrip';
import { ref } from 'vue';
import { router } from '../../../router';

const {
	trip,
	nombre_cliente,
	nombre_operador,
	numero_economico_caja,
	numero_economico_tractor,
} = useTrip();

const tipos_de_viajes = ref([
	{ clave: 'NACIONAL' },
	{ clave: 'IMPORTACION' },
	{ clave: 'IMPORTACION' },
]);

const moneda = ref([
	{ clave: 'AED', descripcion: 'Dirham de EAU' },
	{ clave: 'AFN', descripcion: 'Afghani' },
	{ clave: 'ALL', descripcion: 'Lek' },
	{ clave: 'AMD', descripcion: 'Dram armenio' },
	{ clave: 'ANG', descripcion: 'Florín antillano neerlandés' },
	{ clave: 'AOA', descripcion: 'Kwanza' },
	{ clave: 'ARS', descripcion: 'Peso Argentino' },
	{ clave: 'AUD', descripcion: 'Dólar Australiano' },
	{ clave: 'AWG', descripcion: 'Aruba Florin' },
	{ clave: 'AZN', descripcion: 'Azerbaijanian Manat' },
	{ clave: 'BAM', descripcion: 'Convertibles marca' },
	{ clave: 'BBD', descripcion: 'Dólar de Barbados' },
	{ clave: 'BDT', descripcion: 'Taka' },
	{ clave: 'BGN', descripcion: 'Lev búlgaro' },
	{ clave: 'BHD', descripcion: 'Dinar de Bahrein' },
	{ clave: 'BIF', descripcion: 'Burundi Franc' },
	{ clave: 'BMD', descripcion: 'Dólar de Bermudas' },
	{ clave: 'BND', descripcion: 'Dólar de Brunei' },
	{ clave: 'BOB', descripcion: 'Boliviano' },
	{ clave: 'BOV', descripcion: 'Mvdol' },
	{ clave: 'BRL', descripcion: 'Real brasileño' },
	{ clave: 'BSD', descripcion: 'Dólar de las Bahamas' },
	{ clave: 'BTN', descripcion: 'Ngultrum' },
	{ clave: 'BWP', descripcion: 'Pula' },
	{ clave: 'BYR', descripcion: 'Rublo bielorruso' },
	{ clave: 'BZD', descripcion: 'Dólar de Belice' },
	{ clave: 'CAD', descripcion: 'Dólar Canadiense' },
	{ clave: 'CDF', descripcion: 'Franco congoleño' },
	{ clave: 'CHE', descripcion: 'WIR Euro' },
	{ clave: 'CHF', descripcion: 'Franco Suizo' },
	{ clave: 'CHW', descripcion: 'Franc WIR' },
	{ clave: 'CLF', descripcion: 'Unidad de Fomento' },
	{ clave: 'CLP', descripcion: 'Peso chileno' },
	{ clave: 'CNY', descripcion: 'Yuan Renminbi' },
	{ clave: 'COP', descripcion: 'Peso Colombiano' },
	{ clave: 'COU', descripcion: 'Unidad de Valor real' },
	{ clave: 'CRC', descripcion: 'Colón costarricense' },
	{ clave: 'CUC', descripcion: 'Peso Convertible' },
	{ clave: 'CUP', descripcion: 'Peso Cubano' },
	{ clave: 'CVE', descripcion: 'Cabo Verde Escudo' },
	{ clave: 'CZK', descripcion: 'Corona checa' },
	{ clave: 'DJF', descripcion: 'Franco de Djibouti' },
	{ clave: 'DKK', descripcion: 'Corona danesa' },
	{ clave: 'DOP', descripcion: 'Peso Dominicano' },
	{ clave: 'DZD', descripcion: 'Dinar argelino' },
	{ clave: 'EGP', descripcion: 'Libra egipcia' },
	{ clave: 'ERN', descripcion: 'Nakfa' },
	{ clave: 'ETB', descripcion: 'Birr etíope' },
	{ clave: 'EUR', descripcion: 'Euro' },
	{ clave: 'FJD', descripcion: 'Dólar de Fiji' },
	{ clave: 'FKP', descripcion: 'Libra malvinense' },
	{ clave: 'GBP', descripcion: 'Libra Esterlina' },
	{ clave: 'GEL', descripcion: 'Lari' },
	{ clave: 'GHS', descripcion: 'Cedi de Ghana' },
	{ clave: 'GIP', descripcion: 'Libra de Gibraltar' },
	{ clave: 'GMD', descripcion: 'Dalasi' },
	{ clave: 'GNF', descripcion: 'Franco guineano' },
	{ clave: 'GTQ', descripcion: 'Quetzal' },
	{ clave: 'GYD', descripcion: 'Dólar guyanés' },
	{ clave: 'HKD', descripcion: 'Dólar De Hong Kong' },
	{ clave: 'HNL', descripcion: 'Lempira' },
	{ clave: 'HRK', descripcion: 'Kuna' },
	{ clave: 'HTG', descripcion: 'Gourde' },
	{ clave: 'HUF', descripcion: 'Florín' },
	{ clave: 'IDR', descripcion: 'Rupia' },
	{ clave: 'ILS', descripcion: 'Nuevo Shekel Israelí' },
	{ clave: 'INR', descripcion: 'Rupia india' },
	{ clave: 'IQD', descripcion: 'Dinar iraquí' },
	{ clave: 'IRR', descripcion: 'Rial iraní' },
	{ clave: 'ISK', descripcion: 'Corona islandesa' },
	{ clave: 'JMD', descripcion: 'Dólar Jamaiquino' },
	{ clave: 'JOD', descripcion: 'Dinar jordano' },
	{ clave: 'JPY', descripcion: 'Yen' },
	{ clave: 'KES', descripcion: 'Chelín keniano' },
	{ clave: 'KGS', descripcion: 'Som' },
	{ clave: 'KHR', descripcion: 'Riel' },
	{ clave: 'KMF', descripcion: 'Franco Comoro' },
	{ clave: 'KPW', descripcion: 'Corea del Norte ganó' },
	{ clave: 'KRW', descripcion: 'Won' },
	{ clave: 'KWD', descripcion: 'Dinar kuwaití' },
	{ clave: 'KYD', descripcion: 'Dólar de las Islas Caimán' },
	{ clave: 'KZT', descripcion: 'Tenge' },
	{ clave: 'LAK', descripcion: 'Kip' },
	{ clave: 'LBP', descripcion: 'Libra libanesa' },
	{ clave: 'LKR', descripcion: 'Rupia de Sri Lanka' },
	{ clave: 'LRD', descripcion: 'Dólar liberiano' },
	{ clave: 'LSL', descripcion: 'Loti' },
	{ clave: 'LYD', descripcion: 'Dinar libio' },
	{ clave: 'MAD', descripcion: 'Dirham marroquí' },
	{ clave: 'MDL', descripcion: 'Leu moldavo' },
	{ clave: 'MGA', descripcion: 'Ariary malgache' },
	{ clave: 'MKD', descripcion: 'Denar' },
	{ clave: 'MMK', descripcion: 'Kyat' },
	{ clave: 'MNT', descripcion: 'Tugrik' },
	{ clave: 'MOP', descripcion: 'Pataca' },
	{ clave: 'MRO', descripcion: 'Ouguiya' },
	{ clave: 'MUR', descripcion: 'Rupia de Mauricio' },
	{ clave: 'MVR', descripcion: 'Rupia' },
	{ clave: 'MWK', descripcion: 'Kwacha' },
	{ clave: 'MXN', descripcion: 'Peso Mexicano' },
	{ clave: 'MXV', descripcion: 'México Unidad de Inversión (UDI)' },
	{ clave: 'MYR', descripcion: 'Ringgit malayo' },
	{ clave: 'MZN', descripcion: 'Mozambique Metical' },
	{ clave: 'NAD', descripcion: 'Dólar de Namibia' },
	{ clave: 'NGN', descripcion: 'Naira' },
	{ clave: 'NIO', descripcion: 'Córdoba Oro' },
	{ clave: 'NOK', descripcion: 'Corona noruega' },
	{ clave: 'NPR', descripcion: 'Rupia nepalí' },
	{ clave: 'NZD', descripcion: 'Dólar de Nueva Zelanda' },
	{ clave: 'OMR', descripcion: 'Rial omaní' },
	{ clave: 'PAB', descripcion: 'Balboa' },
	{ clave: 'PEN', descripcion: 'Nuevo Sol' },
	{ clave: 'PGK', descripcion: 'Kina' },
	{ clave: 'PHP', descripcion: 'Peso filipino' },
	{ clave: 'PKR', descripcion: 'Rupia de Pakistán' },
	{ clave: 'PLN', descripcion: 'Zloty' },
	{ clave: 'PYG', descripcion: 'Guaraní' },
	{ clave: 'QAR', descripcion: 'Qatar Rial' },
	{ clave: 'RON', descripcion: 'Leu rumano' },
	{ clave: 'RSD', descripcion: 'Dinar serbio' },
	{ clave: 'RUB', descripcion: 'Rublo ruso' },
	{ clave: 'RWF', descripcion: 'Franco ruandés' },
	{ clave: 'SAR', descripcion: 'Riyal saudí' },
	{ clave: 'SBD', descripcion: 'Dólar de las Islas Salomón' },
	{ clave: 'SCR', descripcion: 'Rupia de Seychelles' },
	{ clave: 'SDG', descripcion: 'Libra sudanesa' },
	{ clave: 'SEK', descripcion: 'Corona sueca' },
	{ clave: 'SGD', descripcion: 'Dólar De Singapur' },
	{ clave: 'SHP', descripcion: 'Libra de Santa Helena' },
	{ clave: 'SLL', descripcion: 'Leona' },
	{ clave: 'SOS', descripcion: 'Chelín somalí' },
	{ clave: 'SRD', descripcion: 'Dólar de Suriname' },
	{ clave: 'SSP', descripcion: 'Libra sudanesa Sur' },
	{ clave: 'STD', descripcion: 'Dobra' },
	{ clave: 'SVC', descripcion: 'Colon El Salvador' },
	{ clave: 'SYP', descripcion: 'Libra Siria' },
	{ clave: 'SZL', descripcion: 'Lilangeni' },
	{ clave: 'THB', descripcion: 'Baht' },
	{ clave: 'TJS', descripcion: 'Somoni' },
	{ clave: 'TMT', descripcion: 'Turkmenistán nuevo manat' },
	{ clave: 'TND', descripcion: 'Dinar tunecino' },
	{ clave: 'TOP', descripcion: "Pa'anga" },
	{ clave: 'TRY', descripcion: 'Lira turca' },
	{ clave: 'TTD', descripcion: 'Dólar de Trinidad y Tobago' },
	{ clave: 'TWD', descripcion: 'Nuevo dólar de Taiwán' },
	{ clave: 'TZS', descripcion: 'Shilling tanzano' },
	{ clave: 'UAH', descripcion: 'Hryvnia' },
	{ clave: 'UGX', descripcion: 'Shilling de Uganda' },
	{ clave: 'USD', descripcion: 'Dólar americano' },
	{ clave: 'USN', descripcion: 'Dólar estadounidense (día siguiente)' },
	{
		clave: 'UYI',
		descripcion: 'Peso Uruguay en Unidades Indexadas (URUIURUI)',
	},
	{ clave: 'UYU', descripcion: 'Peso Uruguayo' },
	{ clave: 'UZS', descripcion: 'Uzbekistán Sum' },
	{ clave: 'VEF', descripcion: 'Bolívar' },
	{ clave: 'VND', descripcion: 'Dong' },
	{ clave: 'VUV', descripcion: 'Vatu' },
	{ clave: 'WST', descripcion: 'Tala' },
	{ clave: 'XAF', descripcion: 'Franco CFA BEAC' },
	{ clave: 'XAG', descripcion: 'Plata' },
	{ clave: 'XAU', descripcion: 'Oro' },
	{
		clave: 'XBA',
		descripcion: 'Unidad de Mercados de Bonos Unidad Europea Composite (EURCO)',
	},
	{
		clave: 'XBB',
		descripcion: 'Unidad Monetaria de Bonos de Mercados Unidad Europea (UEM-6)',
	},
	{
		clave: 'XBC',
		descripcion:
			'Mercados de Bonos Unidad Europea unidad de cuenta a 9 (UCE-9)',
	},
	{
		clave: 'XBD',
		descripcion:
			'Mercados de Bonos Unidad Europea unidad de cuenta a 17 (UCE-17)',
	},
	{ clave: 'XCD', descripcion: 'Dólar del Caribe Oriental' },
	{ clave: 'XDR', descripcion: 'DEG (Derechos Especiales de Giro)' },
	{ clave: 'XOF', descripcion: 'Franco CFA BCEAO' },
	{ clave: 'XPD', descripcion: 'Paladio' },
	{ clave: 'XPF', descripcion: 'Franco CFP' },
	{ clave: 'XPT', descripcion: 'Platino' },
	{ clave: 'XSU', descripcion: 'Sucre' },
	{
		clave: 'XTS',
		descripcion: 'Códigos reservados específicamente para propósitos de prueba',
	},
	{ clave: 'XUA', descripcion: 'Unidad ADB de Cuenta' },
	{
		clave: 'XXX',
		descripcion:
			'Los códigos asignados para las transacciones en que intervenga ninguna moneda',
	},
	{ clave: 'YER', descripcion: 'Rial yemení' },
	{ clave: 'ZAR', descripcion: 'Rand' },
	{ clave: 'ZMW', descripcion: 'Kwacha zambiano' },
	{ clave: 'ZWL', descripcion: 'Zimbabwe Dólar' },
]);

const uso_cfdi = ref([
	{ clave: 'G01', descripcion: 'Adquisición de mercancías.' },
	{ clave: 'G02', descripcion: 'Devoluciones, descuentos o bonificaciones.' },
	{ clave: 'G03', descripcion: 'Gastos en general.' },
	{ clave: 'I01', descripcion: 'Construcciones.' },
	{
		clave: 'I02',
		descripcion: 'Mobiliario y equipo de oficina por inversiones.',
	},
	{ clave: 'I03', descripcion: 'Equipo de transporte.' },
	{ clave: 'I04', descripcion: 'Equipo de computo y accesorios.' },
	{
		clave: 'I05',
		descripcion: 'Dados, troqueles, moldes, matrices y herramental.',
	},
	{ clave: 'I06', descripcion: 'Comunicaciones telefónicas.' },
	{ clave: 'I07', descripcion: 'Comunicaciones satelitales.' },
	{ clave: 'I08', descripcion: 'Otra maquinaria y equipo.' },
	{
		clave: 'D01',
		descripcion: 'Honorarios médicos, dentales y gastos hospitalarios.',
	},
	{
		clave: 'D02',
		descripcion: 'Gastos médicos por incapacidad o discapacidad.',
	},
	{ clave: 'D03', descripcion: 'Gastos funerales.' },
	{ clave: 'D04', descripcion: 'Donativos.' },
	{
		clave: 'D05',
		descripcion:
			'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación).',
	},
	{ clave: 'D06', descripcion: 'Aportaciones voluntarias al SAR.' },
	{ clave: 'D07', descripcion: 'Primas por seguros de gastos médicos.' },
	{
		clave: 'D08',
		descripcion: 'Gastos de transportación escolar obligatoria.',
	},
	{
		clave: 'D09',
		descripcion:
			'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones.',
	},
	{
		clave: 'D10',
		descripcion: 'Pagos por servicios educativos (colegiaturas).',
	},
	{ clave: 'S01', descripcion: 'Sin efectos fiscales.' },
	{ clave: 'CP01', descripcion: 'Pagos.' },
	{ clave: 'CN01', descripcion: 'Nómina.' },
]);

const metodo_pago = ref([
	{ clave: 'PUE', descripcion: 'Pago en una sola exhibición' },
	{ clave: 'PPD', descripcion: 'Pago en parcialidades o diferido' },
]);

const forma_pago = ref([
	{ clave: '01', descripcion: 'Efectivo' },
	{ clave: '02', descripcion: 'Cheque nominativo' },
	{ clave: '03', descripcion: 'Transferencia electrónica de fondos' },
	{ clave: '04', descripcion: 'Tarjeta de crédito' },
	{ clave: '05', descripcion: 'Monedero electrónico' },
	{ clave: '06', descripcion: 'Dinero electrónico' },
	{ clave: '08', descripcion: 'Vales de despensa' },
	{ clave: '12', descripcion: 'Dación en pago' },
	{ clave: '13', descripcion: 'Pago por subrogación' },
	{ clave: '14', descripcion: 'Pago por consignación' },
	{ clave: '15', descripcion: 'Condonación' },
	{ clave: '17', descripcion: 'Compensación' },
	{ clave: '23', descripcion: 'Novación' },
	{ clave: '24', descripcion: 'Confusión' },
	{ clave: '25', descripcion: 'Remisión de deuda' },
	{ clave: '26', descripcion: 'Prescripción o caducidad' },
	{ clave: '27', descripcion: 'A satisfacción del acreedor' },
	{ clave: '28', descripcion: 'Tarjeta de débito' },
	{ clave: '29', descripcion: 'Tarjeta de servicios' },
	{ clave: '30', descripcion: 'Aplicación de anticipos' },
	{ clave: '31', descripcion: 'Intermediario pagos' },
	{ clave: '99', descripcion: 'Por definir' },
]);

const agregar = (tipo: string) => {
	if (tipo === 'cliente') {
		router.push({ name: 'AgregarClienteTrip' });
	} else if (tipo === 'operador') {
		router.push({ name: 'AgregarOperadorTrip' });
	} else if (tipo === 'caja') {
		router.push({ name: 'AgregarCajaTrip' });
	} else {
		router.push({ name: 'AgregarTractorTrip' });
	}
};
</script>

<template>
	<Panel header="Datos">
		<div class="row p-2">
			<div class="col-lg-6 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Tipo de viaje"
					optionLabel="clave"
					filter
					name="tipo_viaje"
					:options="tipos_de_viajes"
					optionValue="clave"
					v-model="trip.tipo_viaje"
				/>
				<small class="p-error" name="tipo_viaje"></small>
			</div>
			<div class="col-lg-6 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Moneda"
					optionLabel="descripcion"
					filter
					name="moneda"
					:options="moneda"
					optionValue="clave"
					v-model="trip.moneda"
				/>
				<small class="p-error" name="moneda"></small>
			</div>
			<div class="col-lg-4 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Uso de CFDI"
					optionLabel="descripcion"
					filter
					name="uso_CFDI"
					:options="uso_cfdi"
					optionValue="clave"
					v-model="trip.uso_CFDI"
				/>
				<small class="p-error" name="uso_CFDI"></small>
			</div>
			<div class="col-lg-4 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Metodo de pago"
					optionLabel="descripcion"
					filter
					name="metodo_pago"
					:options="metodo_pago"
					optionValue="clave"
					v-model="trip.metodo_pago"
				/>
				<small class="p-error" name="metodo_pago"></small>
			</div>
			<div class="col-lg-4 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Forma de pago"
					optionLabel="descripcion"
					filter
					name="forma_pago"
					:options="forma_pago"
					optionValue="clave"
					v-model="trip.forma_pago"
				/>
				<small class="p-error" name="forma_pago"></small>
			</div>
			<div class="col-lg-5 mb-3">
				<InputText
					class="w-100"
					autocomplete="off"
					required
					name="cliente_id"
					disabled
					v-model="nombre_cliente"
				/>
				<small class="p-error" name="cliente_id"></small>
			</div>
			<div class="col-lg-1">
				<Button class="w-100" icon="pi pi-plus" @click="agregar('cliente')" />
			</div>
			<div class="col-lg-5 mb-3">
				<InputText
					class="w-100"
					autocomplete="off"
					required
					name="operador_id"
					disabled
					v-model="nombre_operador"
				/>
				<small class="p-error" name="operador_id"></small>
			</div>
			<div class="col-lg-1">
				<Button class="w-100" icon="pi pi-plus" @click="agregar('operador')" />
			</div>
			<div class="col-lg-5 mb-3">
				<InputText
					class="w-100"
					autocomplete="off"
					required
					name="caja_id"
					disabled
					v-model="numero_economico_caja"
				/>
				<small class="p-error" name="caja_id"></small>
			</div>
			<div class="col-lg-1">
				<Button class="w-100" icon="pi pi-plus" @click="agregar('caja')" />
			</div>
			<div class="col-lg-5 mb-3">
				<InputText
					class="w-100"
					autocomplete="off"
					required
					name="tractor_id"
					disabled
					v-model="numero_economico_tractor"
				/>
				<small class="p-error" name="tractor_id"></small>
			</div>
			<div class="col-lg-1">
				<Button class="w-100" icon="pi pi-plus" @click="agregar('tractor')" />
			</div>
		</div>
	</Panel>
</template>
