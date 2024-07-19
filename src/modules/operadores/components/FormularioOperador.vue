<script lang="ts" setup>
import { estado } from '@/data/estado'
import { pais } from '@/data/pais'
import { useOperadorStore } from '@/stores/operador'
import { storeToRefs } from 'pinia'
import type { FileUploadSelectEvent } from 'primevue/fileupload'

const operadorStore = useOperadorStore()
const { operador, errors } = storeToRefs(operadorStore)
operadorStore.resetErrors()
const fecha_minima = new Date()

const setGafete = (e: FileUploadSelectEvent) => {
  operadorStore.setGafete(e.files[0])
}
</script>

<template>
  <form class="formulario p-2">
    <div class="grid">
      <div class="col-4 mt-5">
        <Image
          :src="`https://recawi.mx/timbrado_v2_ftp/${operador.gafete === undefined ? 'user-default.png' : operador.gafete}`"
          alt="Image"
          width="100%"
          height="280px"
          preview
        />

        <FileUpload
          mode="basic"
          name="demo[]"
          class="w-full"
          chooseLabel="Gafete unico"
          customUpload
          @select="setGafete"
        />
      </div>
      <div class="col-8">
        <div class="mb-3">
          <label>Nombre</label>
          <InputText
            id="nombre"
            name="nombre"
            class="w-full focus:border-primary mt-2"
            placeholder="Nombre"
            autocomplete="off"
            v-model="operador.nombre"
            :invalid="errors.nombre !== undefined"
          />
          <small class="p-error" v-if="errors.nombre">
            {{ errors.nombre }}
          </small>
        </div>
        <div class="mb-3">
          <label>Apellido paterno</label>
          <InputText
            id="paterno"
            name="paterno"
            class="w-full focus:border-primary mt-2"
            placeholder="Apellido paterno"
            v-model="operador.paterno"
            :invalid="errors.paterno !== undefined"
          />
          <small class="p-error" v-if="errors.paterno">
            {{ errors.paterno }}
          </small>
        </div>
        <div class="mb-3">
          <label>Apellido materno</label>
          <InputText
            id="materno"
            name="materno"
            class="w-full focus:border-primary mt-2"
            placeholder="Apellido materno"
            v-model="operador.materno"
            :invalid="errors.materno !== undefined"
          />
          <small class="p-error" v-if="errors.materno">
            {{ errors.materno }}
          </small>
        </div>
        <div class="mb-3">
          <label>Fecha de nacimiento</label>
          <Calendar
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            class="w-full focus:border-primary mt-2"
            placeholder="Fecha de nacimiento"
            v-model="operador.fecha_nacimiento"
            dateFormat="dd/mm/yy"
            showIcon
            :invalid="errors.fecha_nacimiento !== undefined"
          />
          <small class="p-error" v-if="errors.fecha_nacimiento">
            {{ errors.fecha_nacimiento }}
          </small>
        </div>
        <div class="mb-3">
          <label>Fecha de ingreso</label>
          <Calendar
            id="fecha_ingreso"
            name="fecha_ingreso"
            class="w-full focus:border-primary mt-2"
            placeholder="Fecha de ingreso"
            v-model="operador.fecha_ingreso"
            dateFormat="dd/mm/yy"
            showIcon
            :invalid="errors.fecha_ingreso !== undefined"
          />
          <small class="p-error" v-if="errors.fecha_ingreso">
            {{ errors.fecha_ingreso }}
          </small>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label>CURP</label>
      <InputText
        id="curp"
        name="curp"
        class="w-full focus:border-primary mt-2"
        placeholder="CURP"
        v-model="operador.curp"
        :invalid="errors.curp !== undefined"
      />
      <small class="p-error" v-if="errors.curp">
        {{ errors.curp }}
      </small>
    </div>
    <div class="mb-3">
      <label>RFC</label>
      <InputText
        id="rfc"
        name="rfc"
        class="w-full focus:border-primary mt-2"
        placeholder="RFC"
        v-model="operador.rfc"
        :invalid="errors.rfc !== undefined"
      />
      <small class="p-error" v-if="errors.rfc">
        {{ errors.rfc }}
      </small>
    </div>
    <div class="mb-3">
      <label>Codigo postal</label>
      <InputText
        id="codigo_postal"
        name="codigo_postal"
        class="w-full focus:border-primary mt-2"
        placeholder="Codigo postal"
        v-model="operador.codigo_postal"
        :invalid="errors.codigo_postal !== undefined"
      />
      <small class="p-error" v-if="errors.codigo_postal">
        {{ errors.codigo_postal }}
      </small>
    </div>
    <div class="mb-3">
      <label>Colonia</label>
      <InputText
        id="colonia"
        name="colonia"
        class="w-full focus:border-primary mt-2"
        placeholder="Colonia"
        v-model="operador.colonia"
        :invalid="errors.colonia !== undefined"
      />
      <small class="p-error" v-if="errors.colonia">
        {{ errors.colonia }}
      </small>
    </div>
    <div class="mb-3">
      <label>Municipio</label>
      <InputText
        id="municipio"
        name="municipio"
        class="w-full focus:border-primary mt-2"
        placeholder="Municipio"
        v-model="operador.municipio"
        :invalid="errors.municipio !== undefined"
      />
      <small class="p-error" v-if="errors.municipio">
        {{ errors.municipio }}
      </small>
    </div>
    <div class="mb-3">
      <label>Estado</label>
      <Dropdown
        id="estado"
        name="estado"
        class="w-full focus:border-primary mt-2"
        :options="estado"
        placeholder="Estado"
        optionLabel="item"
        optionValue="item"
        v-model="operador.estado"
        :invalid="errors.estado !== undefined"
      />
      <small class="p-error" v-if="errors.estado">
        {{ errors.estado }}
      </small>
    </div>
    <div class="mb-3">
      <label>Pais</label>
      <Dropdown
        id="pais"
        name="pais"
        class="w-full focus:border-primary mt-2"
        :options="pais"
        placeholder="Pais"
        optionLabel="item"
        optionValue="item"
        v-model="operador.pais"
        :invalid="errors.pais !== undefined"
      />
      <small class="p-error" v-if="errors.pais">
        {{ errors.pais }}
      </small>
    </div>
    <div class="mb-3">
      <label>Calle</label>
      <InputText
        id="calle"
        name="calle"
        class="w-full focus:border-primary mt-2"
        placeholder="Calle"
        v-model="operador.calle"
        :invalid="errors.calle !== undefined"
      />
      <small class="p-error" v-if="errors.calle">
        {{ errors.calle }}
      </small>
    </div>
    <div class="mb-3">
      <label>Numero exterior</label>
      <InputText
        id="numero_exterior"
        name="numero_exterior"
        class="w-full focus:border-primary mt-2"
        placeholder="Numero exterior"
        v-model="operador.numero_exterior"
        :invalid="errors.numero_exterior !== undefined"
      />
      <small class="p-error" v-if="errors.numero_exterior">
        {{ errors.numero_exterior }}
      </small>
    </div>
    <div class="mb-3">
      <label>Numero interior</label>
      <InputText
        id="numero_interior"
        name="numero_interior"
        class="w-full focus:border-primary mt-2"
        placeholder="Numero interior"
        v-model="operador.numero_interior"
        :invalid="errors.numero_interior !== undefined"
      />
      <small class="p-error" v-if="errors.numero_interior">
        {{ errors.numero_interior }}
      </small>
    </div>
    <div class="mb-3">
      <label>Licencia</label>
      <InputText
        id="licencia"
        name="licencia"
        class="w-full focus:border-primary mt-2"
        placeholder="Licencia"
        v-model="operador.licencia"
        :invalid="errors.licencia !== undefined"
      />
      <small class="p-error" v-if="errors.licencia">
        {{ errors.licencia }}
      </small>
    </div>
    <div class="mb-3">
      <label>Vencimiento de la licencia</label>
      <Calendar
        id="vencimiento_licencia"
        name="vencimiento_licencia"
        class="w-full focus:border-primary mt-2"
        placeholder="Vencimiento de licencia"
        v-model="operador.vencimiento_licencia"
        showIcon
        :minDate="fecha_minima"
        :invalid="errors.vencimiento_licencia !== undefined"
      />
      <small class="p-error" v-if="errors.vencimiento_licencia">
        {{ errors.vencimiento_licencia }}
      </small>
    </div>
  </form>
</template>
