<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-header v-if="rol === 1" style="background: linear-gradient(to right, #002938, #004e6d);">
        <q-toolbar>
          <div class="row no-wrap q-px-lg">
            <q-btn flat dense rounded color="white" class="q-px-md" v-for="(item, index) in 5" :key="index">{{menu[index].label}}</q-btn>
            <q-input dense borderless v-model="buscar" style="background: #838383cc; border-radius: 20px; height: 35px;">
              <template v-slot:prepend>
                <q-icon color="grey" name="search"/>
              </template>
            </q-input>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer v-if="rol === 1" v-model="DrawerOpen" style="width: 175px;">
        <div class="row items-center justify-center" style="background: linear-gradient(to right, #002938, #004e6d); height: 200px; width: 100%;">
          <div>
            <div class="text-center text-h3 q-mb-md">GymTest</div>
            <div class="text-center text-bold text-h5 text-white">Admin</div>
          </div>
        </div>
        <q-list class="row q-pa-sm">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pa-sm" v-for="(item, index) in menu" :key="index">
            <q-btn flat stack dense :color="selecBtn === item.label ? 'white' : 'primary'" class="q-px-md text-no-wrap" @click="item.label === 'Cerrar Sesión' ? cerrarSesion() : rutas(item)" :style="`${selecBtn === item.label ? 'background: linear-gradient(to right, #002938, #004e6d);' : ''} width: 100%;`" no-caps>
              <q-img src="" style="width: 70px; height: 70px;"/>
              {{item.label}}
            </q-btn>
          </div>
        </q-list>
      </q-drawer>

      <q-footer elevated v-if="rol === 2">
        <div class="bg-primary shadow-2 full-width row justify-around q-py-sm" >
          <div class="row items-center" v-for="(item, index) in menu" :key="index">
            <q-btn :icon="item.icon" color="white" flat stack dense no-caps size="md" @click="item.label === 'Cerrar Sesión' ? cerrarSesion() : $router.push(item.ruta)">
              <div class="text-caption">{{item.label}}</div>
            </q-btn>
          </div>
        </div>
      </q-footer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      rol: null,
      user: {},
      buscar: '',
      selecBtn: '',
      DrawerOpen: true,
      menu: [],
      menuAdmin: [
        {
          icon: 'menu_book',
          label: 'Home',
          ruta: '/administrador'
        },
        {
          icon: '',
          label: 'Temas',
          ruta: ''
        },
        {
          icon: '',
          label: 'Preguntas',
          ruta: ''
        },
        {
          icon: '',
          label: 'Examenes',
          ruta: '/exams'
        },
        {
          icon: '',
          label: 'Blog',
          ruta: ''
        },
        {
          icon: 'logout',
          label: 'Cerrar Sesión',
          ruta: ''
        }
      ],
      menuUser: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio'
        },
        {
          icon: 'store',
          label: 'Tienda',
          ruta: '/tienda'
        },
        {
          icon: 'circle_notifications',
          label: 'Desafios',
          ruta: '/desafios'
        },
        {
          icon: 'logout',
          label: 'Cerrar Sesión',
          ruta: ''
        }
      ]
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    ...mapMutations('generals', ['logout']),
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.user = v
          console.log(this.user)
          if (this.rol === 1) {
            this.menu = this.menuAdmin
          } else if (this.rol === 2) {
            this.menu = this.menuUser
          }
        }
      })
    },
    cerrarSesion () {
      this.logout()
      this.$router.push('/login')
    },
    rutas (itm) {
      this.selecBtn = itm.label
      this.$router.push(itm.ruta)
    }
  }
}
</script>
