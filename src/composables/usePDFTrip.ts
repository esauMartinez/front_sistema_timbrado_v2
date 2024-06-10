import * as pdfMake from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { useTripStore } from '@/store/trip';

export const usePDFTrip = () => {
	const tripStore = useTripStore();
	const {
		pdf,
		trip,
		empresa,
		operador,
		tractor,
		caja,
		cliente,
		patios,
		mercancias,
		timbre,
	} = storeToRefs(tripStore);

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

	const pdfTrip = async (trip_id: number) => {
		const origen = patios.value[0];
		const destino = patios.value[patios.value.length - 1];

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
						{},
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
				timbre.value !== undefined ? [...datosTimbre()] : '',

				// {
				// 	text: 'Condiciones de prestación de servicios que ampara la \n CARTA DE PORTE O COMPROBANTE PARA ELTRANSPORTE DE MERCANCÍAS.',
				// 	fontSize: 14,
				// 	alignment: 'center',
				// 	bold: true,
				// 	pageBreak: 'before',
				// },
				// '\n',
				// {
				// 	text: 'PRIMERA.- Para los efectos del presente contrato de transporte se denomina "Transportista" al que realiza el servicio de transportación y "Remitente" o "Expedidor" al usuario que contrate el servicio o remite la mercancía. COMPROBANTE PARA ELTRANSPORTE DE MERCANCÍAS.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'SEGUNDA.- El "Remitente" o "Expedidor" es responsable de que la información proporcionada al "Transportista" sea veraz y que la documentación que entregue para efectos del transporte sea la correcta.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'TERCERA.- El "Remitente" o "Expedidor" debe declarar al "Transportista" el tipo de mercancía o efectos de que se trate, peso, medidas y/o número de la carga que entrega para su transporte y, en su caso, el valor de la misma. La carga que se entregue a granel será pesada por el "Transportista" en el primer punto donde haya báscula apropiada o, en su defecto, aforada en metros cúbicos con la conformidad del "Remitente" o "Expedidor".',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'CUARTA.- Para efectos del transporte, el "Remitente" o "Expedidor" deberá entregar al "Transportista" los documentos que las leyes y reglamentos exijan para llevar a cabo el servicio, en caso de no cumplirse con estos requisitos el "Transportista" está obligado a rehusar el transporte de las mercancías.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'QUINTA.- Si por sospecha de falsedad en la declaración del contenido de un bulto el "Transportista" deseare proceder a su reconocimiento, podrá hacerlo ante testigos y con asistencia del "Remitente" o "Expedidor" o del consignatario. Si este último no concurriere, se solicitará la presencia de un inspector de la Secretaría de Comunicaciones y Transportes, y se levantará el acta correspondiente. El "Transportista" tendrá en todo caso, la obligación de dejar los bultos en el estado en que se encontraban antes del reconocimiento.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'SEXTA.- El "Transportista" deberá recoger y entregar la carga precisamente en los domicilios que señale el "Remitente" o "Expedidor", ajustándose a los términos y condiciones convenidos. El "Transportista" sólo está obligado a llevar la carga al domicilio del consignatario para su entrega una sola vez. Si ésta no fuera recibida, se dejará aviso de que la mercancía queda a disposición del interesado en las bodegas que indique el "Transportista".',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'SÉPTIMA.- Si la carga no fuere retirada dentro de los 30 días hábiles siguientes a aquél en que hubiere sido puesta a disposición del consignatario, el "Transportista" podrá solicitar la venta en subasta pública con arreglo a lo que dispone el Código de Comercio.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'OCTAVA.- El "Transportista" y el "Remitente" o "Expedidor" negociarán libremente el precio del servicio, tomando en cuenta su tipo, característica de los embarques, volumen, regularidad, clase de carga y sistema de pago.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'NOVENA.- Si el "Remitente" o "Expedidor" desea que el "Transportista" asuma la responsabilidad por el valor de las mercancías o efectos que él declare y que cubra toda clase de riesgos, inclusive los derivados de caso fortuito o de fuerza mayor, las partes deberán convenir un cargo adicional, equivalente al valor de la prima del seguro que se contrate, el cual se deberá expresar en la Carta de Porte.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'DÉCIMA.- Cuando el importe del flete no incluya el cargo adicional, la responsabilidad del "Transportista" queda expresamente limitada a la cantidad equivalente a 15 días del salario mínimo vigente en el Distrito Federal por tonelada o cuando se trate de embarques cuyo peso sea mayor de 200 kg., pero menor de 1000 kg; y a 4 días de salario mínimo por remesa cuando se trate de embarques con peso hasta de 200 kg.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'DÉCIMA PRIMERA.- El precio del transporte deberá pagarse en origen, salvo convenio entre las partes de pago en destino. Cuando el transporte se hubiere concertado "Flete por Cobrar", la entrega de las mercancías o efectos se hará contra el pago del flete y el "Transportista" tendrá derecho a retenerlos mientras no se le cubra el precio convenido.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'DÉCIMA SEGUNDA.- Si al momento de la entrega resultare algún faltante o avería, el consignatario deberá hacerla constar en ese acto en la Carta de Porte y formular su reclamación por escrito al "Transportista", dentro de las 24 horas siguientes.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
				// {
				// 	text: 'DÉCIMA TERCERA.- El "Transportista" queda eximido de la obligación de recibir mercancías o efectos para su transporte, en los siguientes casos: a)Cuando se trate de carga que por su naturaleza, peso, volumen, embalaje defectuoso o cualquier otra circunstancia no pueda transportarse sin destruirse o sin causar daño a los demás artículos o al material rodante, salvo que la empresa de que se trate tenga el equipo adecuado.',
				// 	fontSize: 11,
				// 	alignment: 'justify',
				// },
			],
		};

		const pdfDocGenerator = pdfMake.createPdf(docDefinition);
		pdfDocGenerator.getDataUrl(async (dataUrl) => {
			tripStore.setPDF(dataUrl);
		});
	};

	const datosTimbre = () => {
		return [
			{
				columns: [
					{
						image: `data:image/jpeg;base64,${timbre.value.codigo_qr}`,
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
								text: timbre.value.cadena_original_sat,
								fontSize: 5,
								alignment: 'center',
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
								text: timbre.value.sello_cfdi,
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
								text: timbre.value.sello_sat,
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
								colSpan: 2,
								alignment: 'center',
							},
							{},
							{
								text: 'FOLIO FISCAL',
								fontSize: 7,
								colSpan: 2,
								alignment: 'center',
							},
							{},
						],
						[
							{
								text: timbre.value.numero_certificado_sat,
								fontSize: 7,
								colSpan: 2,
								alignment: 'center',
							},
							{},
							{
								text: timbre.value.uuid,
								fontSize: 7,
								colSpan: 2,
								alignment: 'center',
							},
							{},
						],
						[
							{
								text: 'IDCCP',
								fontSize: 7,
								colSpan: 2,
								alignment: 'center',
							},
							{},
							{
								text: 'FECHA CERTIFICADO',
								fontSize: 7,
								colSpan: 2,
								alignment: 'center',
							},
							{},
						],
						[
							{ text: 'test', fontSize: 7, colSpan: 2, alignment: 'center' },
							{},
							{
								text: timbre.value.fecha_timbrado,
								fontSize: 7,
								colSpan: 2,
								alignment: 'center',
							},
							{},
						],
					],
				},
			},
		];
	};

	return { pdf, pdfTrip };
};
