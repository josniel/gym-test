<template>
  <div>
    <q-btn class="absolute-top" round flat color="white" icon="arrow_back" @click="$router.go(-1)" />
    <q-img src="image 5.png" style="height: 330px; width: 100%; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px">
        <div class="row items-center q-mb-xl absolute-bottom bg-transparent">
          <img src="balance 3.png" style="width: 50px" >
          <div class="text-h5 text-bold q-pl-sm">Nombre del examen</div>
        </div>
    </q-img>

    <div class="q-mx-md q-pa-md bg-white" style="position:relative; top: -40px;border-top-left-radius: 20px; border-top-right-radius: 20px">
        <div class="row item-start">
            <div class="col-6">
                <div class="text-bold text-primary">Temas</div>
                <div class="text-caption text-grey-8">Tema seleccionado</div>
                <div class="q-pt-sm">
                    <q-img src="image 5.png" style="width: 100px; height: 100px;" />
                </div>
            </div>
            <div class="col-6">
                <div class="text-bold text-primary">Sub temas</div>
                <div class="text-caption text-grey-8">Sub temas incluidos</div>
                <q-card clickable v-ripple class="bg-primary q-px-xs q-mb-sm" v-for="(item, index) in 4" :key="index" style="border-radius: 5px">
                    <div class="text-caption text-center text-white ellipsis">Sub tema</div>
                </q-card>
            </div>
        </div>

        <q-separator color="primary" class="q-my-md" />

        <div class="text-bold text-primary">Detalles del examen</div>
        <div class="text-caption text-grey-8">Indicaciones al realizar el examen</div>

        <div class="row item-start q-my-md">
            <div class="col-6">
                <div class="text-caption text-bold text-primary">Tiempo</div>
                <div class="text-caption text-grey-8">Tiempo disponible 30min</div>
                <div class="text-caption text-bold text-primary q-mt-md">Resultado anterior</div>
                <div class="text-caption text-grey-8">10ptos de 10ptos</div>
                <div class="text-caption text-bold text-primary q-mt-md">Año del examen</div>
                <div class="text-caption text-grey-8">2021</div>
            </div>
            <div class="col-6">
                <div class="text-caption text-bold text-primary">Preguntas</div>
                <div class="text-caption text-grey-8">Cantidad 100 preguntas</div>
                <div class="text-caption text-bold text-primary q-mt-md">Fecha de realización</div>
                <div class="text-caption text-grey-8">10/10/2021</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
