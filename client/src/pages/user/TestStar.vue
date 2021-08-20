<template>
  <div>
      <q-carousel
            v-model="slide"
            animated
            style="height:100%"
            ref="carousel"
            >
            <q-carousel-slide :name="index + 1" class="q-pa-none" v-for="(item, index) in preguntas" :key="index">
                <q-btn v-if="slide > 1" class="absolute-top" round flat color="white" icon="arrow_back" @click="$refs.carousel.previous()" />
                <div class="row justify-center">
                    <q-img src="image 5.png" style="height: 400px; width: 100%; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px">
                        <div class="row items-center q-mb-xl absolute-bottom bg-transparent">
                            <img src="balance 3.png" style="width: 50px" >
                            <div class="text-h5 text-bold q-pl-sm">Nombre del examen</div>
                        </div>
                    </q-img>
                </div>

                <div class="column items-center justify-center q-mx-md q-pa-md bg-white" style="position:relative; top: -40px; border-top-left-radius: 20px; border-top-right-radius: 20px">
                    <q-card class="bordes q-pa-none q-mb-md" style="width: 100%; border-radius: 10px;">
                        <div class="row items-center q-py-xs q-pl-xs">
                            <q-icon name="help" color="primary" size="40px" />
                            <div class="q-pl-xs">
                            <div class="text-primary">Pregunta</div>
                            <div class="text-grey-8 text-caption">{{item.pregunta}}</div>
                            </div>
                        </div>
                        <div class="bg-primary q-py-md q-px-md q-ma-none">
                            <div class="text-white text-center text-caption">{{item.pregunta}}</div>
                        </div>
                    </q-card>

                    <q-card clickable v-ripple class="bordes q-pa-none q-my-sm" v-for="(option, index2) in item.respuestas" :key="index2" style="width: 100%; border-radius: 10px;"
                    @click="answerSelected(option, item)">
                        <div class="row items-center">
                            <div class="bg-primary q-ma-none q-py-sm q-px-md text-h6 text-white" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px">{{index2 + 1}}</div>
                            <div class="text-primary q-pl-sm">{{option.title}}</div>
                        </div>
                    </q-card>

                    <!-- <div class="column items-center q-py-md" style="width:100%;">
                        <q-btn no-caps color="black" :label="index + 1 === preguntas.length ? 'Terminar' : 'Responder'" style="width:90%" size="lg" :disable="index + 1 === preguntas.length ? false : item.isActive ? false : true" @click="$refs.carousel.next()" />
                        <q-btn v-if="index + 1 !== preguntas.length" flat no-caps color="grey-9" label="Omitir" style="width:90%" size="lg" @click="omitir(item)" />
                    </div> -->
                </div>
            </q-carousel-slide>
        </q-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      preguntas: [
        {
          pregunta: 'Esta es una pregunta 1',
          isActive: false,
          selected: false,
          result: 'A',
          respuestas: [
            { title: 'Esta es una opcion', value: 'A', isActive: false },
            { title: 'Esta es una opcion', value: 'B', isActive: false },
            { title: 'Esta es una opcion', value: 'C', isActive: false },
            { title: 'Esta es una opcion', value: 'D', isActive: false }
          ]
        },
        {
          pregunta: 'Esta es una pregunta 2',
          isActive: false,
          selected: false,
          result: 'B',
          respuestas: [
            { title: 'Esta es una opcion', value: 'A', isActive: false },
            { title: 'Esta es una opcion', value: 'B', isActive: false },
            { title: 'Esta es una opcion', value: 'C', isActive: false },
            { title: 'Esta es una opcion', value: 'D', isActive: false }
          ]
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    answerSelected (opcion, pregunta) {
      for (let i = 0; i < pregunta.respuestas.length; i++) {
        pregunta.respuestas[i].isActive = false
      }
      pregunta.isActive = true
      opcion.isActive = true
      if (pregunta.result === opcion.value) {
        pregunta.selected = true
      } else {
        pregunta.selected = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border: 1px solid $primary;
}
</style>
