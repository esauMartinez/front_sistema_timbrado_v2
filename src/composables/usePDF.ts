import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ref } from 'vue';
import { router } from '../router';
import { useTimbradoStore } from '../store/timbrado';
import { storeToRefs } from 'pinia';
import { text } from '@fortawesome/fontawesome-svg-core';
import { useTripStore } from '../store/trip';
import moment from 'moment';

export const usePDF = () => {
	const timbradoStore = useTimbradoStore();
	const tripStore = useTripStore();
	const {
		pdf,
		empresa,
		cliente,
		conceptos,
		mercancias,
		timbres,
		movimientos,
		tractor,
		caja,
		operador,
	} = storeToRefs(timbradoStore);
	const { trip } = storeToRefs(tripStore);

	const getConceptos = () => {
		const array = [];
		conceptos.value.forEach((concepto) => {
			const total = +concepto.monto + +concepto.iva - +concepto.retencion;
			const c = [
				{ text: 1, fontSize: 8 },
				{ text: concepto.clave, fontSize: 8 },
				{ text: '', fontSize: 8 },
				{ text: concepto.nombre, fontSize: 8 },
				{ text: concepto.monto, fontSize: 8 },
				{ text: concepto.iva, fontSize: 8 },
				{ text: concepto.retencion, fontSize: 8 },
				{ text: total, fontSize: 8 },
			];
			array.push(c);
		});
		return array;
	};

	const getMercancias = () => {
		const array = [];

		mercancias.value.forEach((mercancia) => {
			const m = [
				{ text: mercancia.producto, fontSize: 8 },
				{ text: mercancia.unidad_medida, fontSize: 8 },
				{ text: mercancia.peso, fontSize: 8 },
				{ text: mercancia.cantidad, fontSize: 8 },
				{ text: mercancia.material_peligroso, fontSize: 8 },
				{ text: mercancia.tipo_documento, fontSize: 8 },
				{ text: mercancia.tipo_materia, fontSize: 8 },
				{ text: mercancia.pedimento, fontSize: 8 },
				{ text: mercancia.fraccion_arancelaria, fontSize: 8 },
				{ text: mercancia.descripcion_materia, fontSize: 8 },
				{ text: mercancia.identificador_documento_aduanero, fontSize: 8 },
			];

			array.push(m);
		});
		return array;
	};

	const pdfTimbre = (trip_id: Number) => {
		pdfMake.vfs = pdfFonts.pdfMake.vfs;
		const timbre = timbres.value[0];
		const origen = movimientos.value[0];
		const destino = movimientos.value[movimientos.value.length - 1];

		const docDefinition = {
			content: [
				{
					text: empresa.value.razon_social,
					fontSize: 18,
					bold: true,
					alignment: 'center',
				},
				'\n',
				{
					text: empresa.value.calle,
					fontSize: 14,
					bold: true,
					alignment: 'center',
				},
				'\n',
				{
					text: empresa.value.rfc,
					fontSize: 14,
					bold: true,
					alignment: 'center',
				},
				'-----------------------------------------------------------------------------------------------------------------------------------------------------------',
				{
					text: `RAZON SOCIAL: ${cliente.value.razon_social}`,
					fontSize: 9,
					alignment: 'left',
				},
				{
					text: `RFC: ${cliente.value.rfc}`,
					fontSize: 9,
					alignment: 'left',
				},
				{
					text: `DIRECCION: ${cliente.value.calle}`,
					fontSize: 9,
					alignment: 'left',
				},
				{
					text: `ESTADO: ${cliente.value.estado}`,
					fontSize: 9,
					alignment: 'left',
				},
				{
					text: `PAIS: ${cliente.value.pais}`,
					fontSize: 9,
					alignment: 'left',
				},
				{
					text: `CODIGO POSTAL: ${cliente.value.codigo_postal}`,
					fontSize: 9,
					alignment: 'left',
				},
				'-----------------------------------------------------------------------------------------------------------------------------------------------------------',
				{
					table: {
						widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
						body: [
							[
								{
									text: 'CANTIDAD',
									fontSize: 9,
								},
								{
									text: 'CVE. PRODUCTO',
									fontSize: 9,
								},
								{
									text: 'CVE. UNIDAD',
									fontSize: 9,
								},
								{
									text: 'CONCEPTO',
									fontSize: 9,
								},
								{
									text: 'UNITARIO',
									fontSize: 9,
								},
								{
									text: 'IVA',
									fontSize: 9,
								},
								{
									text: 'RETENCION',
									fontSize: 9,
								},
								{
									text: 'SUBTOTAL',
									fontSize: 9,
								},
							],
							...getConceptos(),
						],
					},
				},
				'\n',
				{
					text: 'ESTE DOCUMENTO ES UNA PRESENTACION IMPRESA DE UN CFDI',
					fontSize: 10,
				},
				'\n',
				{
					columns: [
						{
							width: '*',
							text: [
								{
									text: `USO DE CFDI: ${cliente.value.uso_cfdi} \n`,
									fontSize: 10,
								},
								{
									text: `METODO DE PAGO: ${cliente.value.metodo_pago} \n`,
									fontSize: 10,
								},
								{
									text: `FORMA DE PAGO: ${cliente.value.forma_pago} \n`,
									fontSize: 10,
								},
								{
									text: `REGIMEN FISCAL RECEPTOR: ${cliente.value.regimen_fiscal} \n`,
									fontSize: 10,
								},
								{
									text: `MONEDA: ${trip.value.moneda} \n`,
									fontSize: 10,
								},
								{
									text: `TIPO DE CAMBIO: 0 \n`,
									fontSize: 10,
								},
							],
						},
					],
				},
				'-----------------------------------------------------------------------------------------------------------------------------------------------------------',
				{
					columns: [
						{
							image: `data:image/jpeg;base64,${timbre.codigo_qr}`,
							width: 100,
						},
					],
				},
				{
					table: {
						// widths: ['*', '*', '*', '*'],
						body: [
							[
								{
									text: 'CADENA ORIGINAL DE COMPLEMENTO DE CERTIFICADO DIGITAL DE SAT',
									fontSize: 8,
									alignment: 'center',
									colSpan: 4,
								},
								{},
								{},
								{},
							],
							[
								{
									text: timbre.cadena_original_sat,
									fontSize: 5,
									alignment: 'left',
									colSpan: 4,
								},
								{},
								{},
								{},
							],
							[
								{
									text: 'SELLO DIGITAL DEL CFDI',
									fontSize: 8,
									alignment: 'center',
									colSpan: 4,
								},
								{},
								{},
								{},
							],
							[
								{
									text: timbre.sello_cfdi,
									fontSize: 5,
									alignment: 'left',
									colSpan: 4,
								},
								{},
								{},
								{},
							],
							[
								{
									text: 'SELLO DEL SAT',
									fontSize: 8,
									alignment: 'center',
									colSpan: 4,
								},
								{},
								{},
								{},
							],
							[
								{
									text: timbre.sello_sat,
									fontSize: 5,
									alignment: 'left',
									colSpan: 4,
								},
								{},
								{},
								{},
							],
							[
								{
									text: 'CERTIFICADO SAT',
									fontSize: 7,
								},
								{
									text: 'FOLIO FISCAL',
									fontSize: 7,
								},
								{
									text: 'IDCCP',
									fontSize: 7,
								},
								{
									text: 'FECHA CERTIFICADO',
									fontSize: 7,
								},
							],
							[
								{ text: timbre.numero_certificado_sat, fontSize: 7 },
								{ text: timbre.uuid, fontSize: 7 },
								{ text: '', fontSize: 7 },
								{ text: timbre.fecha_timbrado, fontSize: 7 },
							],
						],
					},
				},
				{
					text: 'COMPLEMENTO CARTA PORTE',
					alignment: 'center',
					fontSize: 10,
					pageBreak: 'before',
				},
				'\n',
				{
					table: {
						body: [
							[
								{
									text: 'LOS BIENES/MERCANCIAS TRANSPORTADOS INGRESAN O SALEN DEL TERRITORIO NACIONAL',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'TOTAL DE DISTANCIAS RECORRIDAS (KM)',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: trip.value.tipo_viaje,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: trip.value.kilometros,
									fontSize: 8,
									alignment: 'center',
								},
							],
						],
					},
				},
				'\n',
				{
					text: 'UBICACIONES',
					alignment: 'center',
					fontSize: 10,
				},
				'\n',
				{
					text: 'UBICACION 1',
					alignment: 'center',
					fontSize: 10,
				},
				{
					table: {
						body: [
							[
								{
									text: 'TIPO DE UBICACION',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'RFC REMITENTE/DESTINATARIO',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'NOMBRE DEL REMITENTE/DESTINATARIO',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'FECHA Y HORA ESTIMADA DE SALIDA/LLEGADA DE LOS BIENES',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'ORIGEN',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: origen.rfc,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: origen.nombre,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: trip.value.ventana_carga,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'CALLE',
									fontSize: 8,
									alignment: 'center',
									colSpan: 2,
								},
								{},
								{
									text: 'NUMERO EXT.',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'COLONIA',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: origen.calle,
									fontSize: 8,
									alignment: 'center',
									colSpan: 2,
								},
								{},
								{
									text: origen.numero_exterior,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: origen.colonia,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'MUNICIPIO',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'ESTADO',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'PAIS',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'CODIGO POSTAL',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: origen.municipio,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: origen.estado,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: origen.pais,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: origen.codigo_postal,
									fontSize: 8,
									alignment: 'center',
								},
							],
						],
					},
				},
				'\n',
				{
					text: 'UBICACION 2',
					alignment: 'center',
					fontSize: 10,
				},
				{
					table: {
						body: [
							[
								{
									text: 'TIPO DE UBICACION',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'RFC REMITENTE/DESTINATARIO',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'NOMBRE DEL REMITENTE/DESTINATARIO',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'FECHA Y HORA ESTIMADA DE SALIDA/LLEGADA DE LOS BIENES',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'ORIGEN',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: destino.rfc,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: destino.nombre,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: trip.value.ventana_entrega,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'CALLE',
									fontSize: 8,
									alignment: 'center',
									colSpan: 2,
								},
								{},
								{
									text: 'NUMERO EXT.',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'COLONIA',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: destino.calle,
									fontSize: 8,
									alignment: 'center',
									colSpan: 2,
								},
								{},
								{
									text: destino.numero_exterior,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: destino.colonia,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'MUNICIPIO',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'ESTADO',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'PAIS',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'CODIGO POSTAL',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: destino.municipio,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: destino.estado,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: destino.pais,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: destino.codigo_postal,
									fontSize: 8,
									alignment: 'center',
								},
							],
						],
					},
				},
				'\n',
				{
					text: 'AUTOTRANSPORTE',
					alignment: 'center',
					fontSize: 10,
				},
				'\n',
				{
					table: {
						widths: ['*', '*', '*'],
						body: [
							[
								{
									text: 'PERMISO SCT',
									fontSize: 8,
									colSpan: 2,
									alignment: 'center',
								},
								{},
								{
									text: 'NUMERO PERMISO SCT',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: empresa.value.permiso_sct,
									fontSize: 8,
									colSpan: 2,
									alignment: 'center',
								},
								{},
								{
									text: empresa.value.numero_permiso_sct,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'VEHICULO',
									fontSize: 8,
									alignment: 'center',
									colSpan: 3,
								},
							],
							[
								{
									text: 'CLAVE VEHICULAR',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'PLACA VEHICULAR',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'AÑO',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: tractor.value.id,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: tractor.value.matricula,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: tractor.value.modelo,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'ASEGURADORA RESPONSABILIDAD CIVIL',
									fontSize: 8,
									colSpan: 2,
									alignment: 'center',
								},
								{},
								{
									text: 'POLIZA RESPONSABILIDAD CIVIL',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: tractor.value.aseguradora,
									fontSize: 8,
									colSpan: 2,
									alignment: 'center',
								},
								{},
								{
									text: tractor.value.numero_poliza,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'REMOLQUE',
									fontSize: 8,
									colSpan: 3,
									alignment: 'center',
								},
								{},
								{},
							],
							[
								{
									text: 'NUMERO ECONOMICO',
									fontSize: 8,
									alignment: 'center',
									colSpan: 2,
								},
								{},
								{
									text: 'PLACA',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: caja.value.numero_economico,
									fontSize: 8,
									alignment: 'center',
									colSpan: 2,
								},
								{},
								{
									text: caja.value.matricula,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'CONFIGURACION VEHICULAR',
									fontSize: 8,
									alignment: 'center',
									colSpan: 3,
								},
								{},
								{},
							],
							[
								{
									text: tractor.value.configuracion,
									fontSize: 8,
									alignment: 'center',
									colSpan: 2,
								},
								{},
								{},
							],
							[
								{
									text: 'SUBTIPO REMOLQUE',
									fontSize: 8,
									alignment: 'center',
									colSpan: 3,
								},
								{},
								{},
							],
							[
								{
									text: caja.value.configuracion,
									fontSize: 8,
									alignment: 'center',
									colSpan: 3,
								},
								{},
								{},
							],
						],
					},
				},
				'\n',
				{
					text: 'FUGURA AUTOTRANSPORTE',
					alignment: 'center',
					fontSize: 10,
				},
				'\n',
				{
					table: {
						widths: ['*', '*', '*'],
						body: [
							[
								{
									text: 'FIGURA',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'RFC',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: 'LICENCIA',
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: '01-OPERADOR',
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: operador.value.rfc,
									fontSize: 8,
									alignment: 'center',
								},
								{
									text: operador.value.licencia,
									fontSize: 8,
									alignment: 'center',
								},
							],
							[
								{
									text: 'NOMBRE',
									fontSize: 8,
									alignment: 'center',
								},
								{},
								{},
							],
							[
								{
									text: `${operador.value.nombre} ${operador.value.paterno} ${operador.value.materno}`,
									fontSize: 8,
									alignment: 'center',
								},
								{},
								{},
							],
						],
					},
				},
				'\n',
				{
					text: 'MERCANCIAS',
					alignment: 'center',
					fontSize: 10,
					pageBreak: 'before',
				},
				'\n',
				{
					table: {
						body: [
							[
								{
									text: 'Producto',
									fontSize: 9,
								},
								{
									text: 'U. Medida',
									fontSize: 9,
								},
								{
									text: 'Peso',
									fontSize: 9,
								},
								{
									text: 'Canitidad',
									fontSize: 9,
								},
								{
									text: 'M. Peligroso',
									fontSize: 9,
								},
								{
									text: 'T. Documento',
									fontSize: 9,
								},
								{
									text: 'T. Materia',
									fontSize: 9,
								},
								{
									text: 'Pedimento',
									fontSize: 9,
								},
								{
									text: 'F. Arancelaria',
									fontSize: 9,
								},
								{
									text: 'D. Materia',
									fontSize: 9,
								},
								{
									text: 'I. Aduanero',
									fontSize: 9,
								},
							],
							...getMercancias(),
						],
					},
				},
			],
		};
		const pdfDocGenerator = pdfMake.createPdf(docDefinition);
		pdfDocGenerator.getDataUrl(async (dataUrl) => {
			timbradoStore.setPDF(dataUrl);
		});

		router.push({ path: `/pdf-timbre/pdf/${trip_id}` });
	};

	const pdfTrip = (trip_id: Number) => {
		pdfMake.vfs = pdfFonts.pdfMake.vfs;
		const timbre = timbres.value[0];
		const origen = movimientos.value[0];
		const destino = movimientos.value[movimientos.value.length - 1];

		let ingresos = [];
		ingresos.forEach((x) => {
			ingresos.push([
				{ text: x.concepto, fontSize: 9 },
				{ text: '*', fontSize: 9 },
				{ text: '*', fontSize: 9 },
				{ text: '*', fontSize: 9 },
				{
					text: '*',
					fontSize: 9,
				},
			]);
		});

		const docDefinition = {
			content: [
				{
					alignment: 'center',
					columns: [
						{
							text: [
								{
									text: 'CFDI DE INGRESO CON COMPLEMENTO CARTA PORTE \n',
									fontSize: 10,
								},
								{
									text: `Empresa: ${empresa.value.razon_social} \n`,
									fontSize: 9,
								},
								{
									text: `Dirección: ${empresa.value.calle} \n`,
									fontSize: 9,
								},
							],
						},
						{
							image:
								'data:image/jpeg;base64,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',
							width: 100,
						},
						{
							text: [
								{
									text: `Fecha de impresion: ${moment().format(
										'YYYY/MM/DD hh:mm:ss'
									)}  \n`,
									fontSize: 9,
								},
								{ text: `Informe de guia  \n`, fontSize: 9 },
								{ text: `RFC: ${empresa.value.rfc} \n`, fontSize: 9 },
								{
									text: `Lugar de expedicion: ${empresa.value.calle}, ${empresa.value.estado}, ${empresa.value.pais}, ${empresa.value.codigo_postal}`,
									fontSize: 9,
								},
							],
						},
					],
					columnGap: 10,
				},
				'-----------------------------------------------------------------------------------------------------------------------------------------------------------',
				{
					alignment: 'justify',
					columns: [
						{
							text: [
								{
									text: 'TRIP \n',
									fontSize: 11,
								},
								{ text: `${trip.value.id} \n`, fontSize: 9 },
							],
						},
						{
							text: [
								{ text: 'ESTATUS \n', fontSize: 11 },
								{ text: 'TRANSITO \n', fontSize: 9 },
							],
						},
						{
							text: [
								{ text: 'SERVICIO \n', fontSize: 11 },
								{ text: 'CARRETERA \n', fontSize: 9 },
							],
						},
						{
							text: [
								{ text: 'Referencia \n', fontSize: 11 },
								{
									text: `${trip.value.referencia} \n`,
									fontSize: 9,
								},
							],
						},
						{
							text: [
								{ text: 'FECHA \n', fontSize: 11 },
								{
									text: `${moment(trip.value.createdAt).format(
										'DD/MM/YYYY'
									)} \n`,
									fontSize: 9,
								},
							],
						},
					],
					columnGap: 10,
				},
				'-----------------------------------------------------------------------------------------------------------------------------------------------------------',
				{
					alignment: 'justify',
					columns: [
						{
							text: [
								{
									text: 'OPERADOR \n',
									fontSize: 10,
								},
								{
									text: `${operador.value.nombre} ${operador.value.paterno} ${operador.value.materno} \n`,
									fontSize: 9,
								},
							],
						},
						{
							text: [
								{ text: 'TRACTOR \n', fontSize: 10 },
								{ text: `${tractor.value.numero_economico} \n`, fontSize: 9 },
							],
						},
						{
							text: [
								{ text: 'PLACAS \n', fontSize: 10 },
								{ text: `${tractor.value.matricula} \n`, fontSize: 9 },
							],
						},
						{
							text: [
								{ text: 'CAJA \n', fontSize: 10 },
								{
									text: `${caja.value.numero_economico}/${caja.value.marca_id} \n`,
									fontSize: 9,
								},
							],
						},
					],
					columnGap: 10,
				},
				'-----------------------------------------------------------------------------------------------------------------------------------------------------------',
				{
					alignment: 'justify',
					columns: [
						{
							text: [
								{
									text: 'CLIENTE \n',
									fontSize: 10,
								},
								{
									text: `NOMBRE: ${cliente.value.razon_social} \n`,
									fontSize: 9,
								},
								{ text: `CALLE: ${cliente.value.calle} \n`, fontSize: 9 },
								{ text: `COLONIA: ${cliente.value.colonia} \n`, fontSize: 9 },
								{
									text: `ESTADO: ${cliente.value.estado}, ${cliente.value.pais}, ${cliente.value.codigo_postal}`,
									fontSize: 9,
								},
							],
						},
						{
							text: [
								{ text: 'Documentos \n', fontSize: 10 },
								{ text: '1.-NOTA C \n', fontSize: 9 },
								{ text: '2.-CARTA PORTE \n', fontSize: 9 },
								{ text: '3.-FACTURA DE ORIGEN \n', fontSize: 9 },
							],
						},
					],
					columnGap: 20,
				},
				'-----------------------------------------------------------------------------------------------------------------------------------------------------------',
				{
					alignment: 'justify',
					columns: [
						{
							text: [
								{ text: 'ORIGEN \n', fontSize: 10 },
								{
									text: `NOMBRE: ${origen.nombre} \n`,
									fontSize: 9,
								},
								{ text: `CALLE: ${origen.calle} \n`, fontSize: 9 },
								{
									text: `COLONIA: ${origen.colonia} \n`,
									fontSize: 9,
								},
								{
									text: `C.P.: ${origen.codigo_postal} ${origen.municipio}, ${origen.estado}, ${origen.pais} \n`,
									fontSize: 9,
								},
							],
						},
						{
							text: [
								{ text: 'DESTINO \n', fontSize: 10 },
								{
									text: `NOMBRE: ${destino.nombre} \n`,
									fontSize: 9,
								},
								{ text: `CALLE: ${destino.calle} \n`, fontSize: 9 },
								{
									text: `COLONIA: ${destino.colonia} \n`,
									fontSize: 9,
								},
								{
									text: `C.P.: ${destino.codigo_postal} ${destino.municipio}, ${destino.estado}, ${destino.pais} \n`,
									fontSize: 9,
								},
							],
						},
					],
					columnGap: 20,
				},
				'-----------------------------------------------------------------------------------------------------------------------------------------------------------',
				{
					table: {
						widths: [50, 50, 50, 70, 20, '*'],
						headerRows: 2,
						body: [
							[
								{
									text: 'REMITENTE DICE QUE CONTIENE',
									colSpan: 3,
									alignment: 'center',
									fontSize: 10,
								},
								{},
								{},
								{},
								{},
								{
									text: 'Producto Descripcion: segun relacion anexa',
									colSpan: 1,
									alignment: 'center',
									fontSize: 10,
								},
							],
							[
								{ text: 'Cantidad', fontSize: 9 },
								{ text: 'Embalaje', fontSize: 9 },
								{ text: 'Metros³', fontSize: 9 },
								{ text: "Kg's est. 15,000", fontSize: 9, alignment: 'center' },

								{ text: 'UM', fontSize: 9 },
								{
									text: 'se declara valor de la mercancia: valor no declarado',
									alignment: 'center',
									fontSize: 9,
								},
							],
						],
					},
				},
				'\n',
				{
					table: {
						widths: [505],
						headerRows: 1,
						body: [
							[
								{
									text: 'OBSERVACIONES',
									fontSize: 10,
									colSpan: 1,
								},
							],
							[
								{
									text: trip.value.observaciones,
									fontSize: 7,
								},
							],
						],
					},
				},
				'\n',
				{
					table: {
						body: [
							[
								{
									text: 'Producto',
									fontSize: 9,
								},
								{
									text: 'U. Medida',
									fontSize: 9,
								},
								{
									text: 'Peso',
									fontSize: 9,
								},
								{
									text: 'Canitidad',
									fontSize: 9,
								},
								{
									text: 'M. Peligroso',
									fontSize: 9,
								},
								{
									text: 'T. Documento',
									fontSize: 9,
								},
								{
									text: 'T. Materia',
									fontSize: 9,
								},
								{
									text: 'Pedimento',
									fontSize: 9,
								},
								{
									text: 'F. Arancelaria',
									fontSize: 9,
								},
								{
									text: 'D. Materia',
									fontSize: 9,
								},
								{
									text: 'I. Aduanero',
									fontSize: 9,
								},
							],
							...getMercancias(),
						],
					},
				},
				'\n',
				{
					columns: [
						{
							width: '*',
							table: {
								body: [
									[
										{ text: 'Gastos', fontSize: 10 },
										{ text: 'Monto', fontSize: 10 },
									],
									[
										{ text: 'KMS', fontSize: 9 },
										{
											text: '*',
											fontSize: 9,
										},
									],
									[
										{ text: 'Combustible', fontSize: 9 },
										{
											text: '*',
											fontSize: 9,
										},
									],
									[
										{ text: 'Viaticos', fontSize: 9 },
										{ text: '*', fontSize: 9 },
									],
									[
										{ text: 'Casetas', fontSize: 9 },
										{ text: '*', fontSize: 9 },
									],
									[
										{
											text: 'Nota: horario de caseta sabinas de 19:00 pm a 7:00 am.',
											colSpan: 2,
											fontSize: 10,
										},
									],
									[
										{
											text: `Ventana carga: ${moment(
												trip.value.ventana_carga
											).format('DD/MM/YYYY hh:mm:ss A')}.`,
											colSpan: 2,
											fontSize: 10,
										},
									],
									[
										{
											text: `Ventana entrega: ${moment(
												trip.value.ventana_entrega
											).format('DD/MM/YYYY hh:mm:ss A')}.`,
											colSpan: 2,
											fontSize: 10,
										},
									],
								],
							},
						},
						{
							width: 'auto',
							table: {
								body: [
									[
										{ text: 'Concepto', fontSize: 10 },
										{ text: 'Monto', fontSize: 10 },
										{ text: 'IVA', fontSize: 10 },
										{ text: 'Retencion', fontSize: 10 },
										{ text: 'Total', fontSize: 10 },
									],
									...ingresos,
									[
										{ text: '', colSpan: 3 },
										{},
										{},
										{
											text: `Subtotal: *`,
											fontSize: 9,
											colSpan: 2,
										},
									],
									[
										{ text: '', colSpan: 3 },
										{},
										{},
										{
											text: `IVA: *`,
											fontSize: 9,
											colSpan: 2,
										},
									],
									[
										{ text: '', colSpan: 3 },
										{},
										{},
										{
											text: `Retencion: *`,
											fontSize: 9,
											colSpan: 2,
										},
										// { text: '*' },
									],
									[
										{ text: '', colSpan: 3 },
										{},
										{},
										{
											text: `Total: *`,
											fontSize: 9,
											colSpan: 2,
										},
									],
								],
							},
						},
					],
				},
				'\n',
				'\n',
				'\n',
				'\n',
				'\n',
				'\n',
				{
					text: '----------------------------------------- \n Operador \n Entiendo y Acepto las condiciones y las politicas de TSM Connect \n al incumplir con tiempos de entrega.',
					fontSize: 9,
					alignment: 'center',
				},

				{
					text: 'Condiciones de prestación de servicios que ampara la \n CARTA DE PORTE O COMPROBANTE PARA ELTRANSPORTE DE MERCANCÍAS.',
					fontSize: 14,
					alignment: 'center',
					bold: true,
					pageBreak: 'before',
				},
				'\n',
				{
					text: 'PRIMERA.- Para los efectos del presente contrato de transporte se denomina "Transportista" al que realiza el servicio de transportación y "Remitente" o "Expedidor" al usuario que contrate el servicio o remite la mercancía. COMPROBANTE PARA ELTRANSPORTE DE MERCANCÍAS.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'SEGUNDA.- El "Remitente" o "Expedidor" es responsable de que la información proporcionada al "Transportista" sea veraz y que la documentación que entregue para efectos del transporte sea la correcta.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'TERCERA.- El "Remitente" o "Expedidor" debe declarar al "Transportista" el tipo de mercancía o efectos de que se trate, peso, medidas y/o número de la carga que entrega para su transporte y, en su caso, el valor de la misma. La carga que se entregue a granel será pesada por el "Transportista" en el primer punto donde haya báscula apropiada o, en su defecto, aforada en metros cúbicos con la conformidad del "Remitente" o "Expedidor".',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'CUARTA.- Para efectos del transporte, el "Remitente" o "Expedidor" deberá entregar al "Transportista" los documentos que las leyes y reglamentos exijan para llevar a cabo el servicio, en caso de no cumplirse con estos requisitos el "Transportista" está obligado a rehusar el transporte de las mercancías.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'QUINTA.- Si por sospecha de falsedad en la declaración del contenido de un bulto el "Transportista" deseare proceder a su reconocimiento, podrá hacerlo ante testigos y con asistencia del "Remitente" o "Expedidor" o del consignatario. Si este último no concurriere, se solicitará la presencia de un inspector de la Secretaría de Comunicaciones y Transportes, y se levantará el acta correspondiente. El "Transportista" tendrá en todo caso, la obligación de dejar los bultos en el estado en que se encontraban antes del reconocimiento.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'SEXTA.- El "Transportista" deberá recoger y entregar la carga precisamente en los domicilios que señale el "Remitente" o "Expedidor", ajustándose a los términos y condiciones convenidos. El "Transportista" sólo está obligado a llevar la carga al domicilio del consignatario para su entrega una sola vez. Si ésta no fuera recibida, se dejará aviso de que la mercancía queda a disposición del interesado en las bodegas que indique el "Transportista".',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'SÉPTIMA.- Si la carga no fuere retirada dentro de los 30 días hábiles siguientes a aquél en que hubiere sido puesta a disposición del consignatario, el "Transportista" podrá solicitar la venta en subasta pública con arreglo a lo que dispone el Código de Comercio.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'OCTAVA.- El "Transportista" y el "Remitente" o "Expedidor" negociarán libremente el precio del servicio, tomando en cuenta su tipo, característica de los embarques, volumen, regularidad, clase de carga y sistema de pago.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'NOVENA.- Si el "Remitente" o "Expedidor" desea que el "Transportista" asuma la responsabilidad por el valor de las mercancías o efectos que él declare y que cubra toda clase de riesgos, inclusive los derivados de caso fortuito o de fuerza mayor, las partes deberán convenir un cargo adicional, equivalente al valor de la prima del seguro que se contrate, el cual se deberá expresar en la Carta de Porte.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'DÉCIMA.- Cuando el importe del flete no incluya el cargo adicional, la responsabilidad del "Transportista" queda expresamente limitada a la cantidad equivalente a 15 días del salario mínimo vigente en el Distrito Federal por tonelada o cuando se trate de embarques cuyo peso sea mayor de 200 kg., pero menor de 1000 kg; y a 4 días de salario mínimo por remesa cuando se trate de embarques con peso hasta de 200 kg.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'DÉCIMA PRIMERA.- El precio del transporte deberá pagarse en origen, salvo convenio entre las partes de pago en destino. Cuando el transporte se hubiere concertado "Flete por Cobrar", la entrega de las mercancías o efectos se hará contra el pago del flete y el "Transportista" tendrá derecho a retenerlos mientras no se le cubra el precio convenido.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'DÉCIMA SEGUNDA.- Si al momento de la entrega resultare algún faltante o avería, el consignatario deberá hacerla constar en ese acto en la Carta de Porte y formular su reclamación por escrito al "Transportista", dentro de las 24 horas siguientes.',
					fontSize: 11,
					alignment: 'justify',
				},
				{
					text: 'DÉCIMA TERCERA.- El "Transportista" queda eximido de la obligación de recibir mercancías o efectos para su transporte, en los siguientes casos: a)Cuando se trate de carga que por su naturaleza, peso, volumen, embalaje defectuoso o cualquier otra circunstancia no pueda transportarse sin destruirse o sin causar daño a los demás artículos o al material rodante, salvo que la empresa de que se trate tenga el equipo adecuado.',
					fontSize: 11,
					alignment: 'justify',
				},
			],
		};

		const pdfDocGenerator = pdfMake.createPdf(docDefinition);
		pdfDocGenerator.getDataUrl(async (dataUrl) => {
			timbradoStore.setPDF(dataUrl);
		});

		router.push({ path: `/pdf-trip/pdf/${trip_id}` });
	};
	return { pdf, pdfTimbre, pdfTrip };
};
