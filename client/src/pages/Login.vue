<template>
  <div class="window-height">
    <div style="background: linear-gradient(to right, #002938, #004e6d); border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; height: 300px; width: 100%;"></div>
    <!-- <q-img src="noimg.png" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; height: 265px; width: 100%;"/> -->
    <div class="absolute-full column q-px-md no-wrap">
      <div class="q-mb-md">
        <div class="column items-center q-pt-xl q-pb-lg">
          <q-img src="gymtest 1.png" style="width: 300px"/>
        </div>
        <div class="text-h6 text-bold text-white">INICIO DE SESIÓN</div>
      </div>
      <div class="q-px-md q-py-lg bg-white" style="border-radius: 10px;">
        <q-input dense filled type="email" v-model="form.email" placeholder="Usuario" :error="$v.form.email.$error" error-message="Este campo es requerido"  @blur="$v.form.email.$touch()">
          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>
        </q-input>
        <q-input dense filled class="q-mb-sm" type="password" v-model="form.password" placeholder="Contraseña" :error="$v.form.password.$error" error-message="Este campo es requerido"  @blur="$v.form.password.$touch()">
          <template v-slot:prepend>
            <q-icon name="lock"/>
          </template>
        </q-input>
        <q-btn color="primary" text-color="white" label="Iniciar sesión" :loading="loading" @click="loguear()" no-caps class="full-width q-py-xs q-mb-md">
          <template v-slot:loading>
            <q-spinner-hourglass class="on-center" />
            loading...
          </template>
        </q-btn>
        <div class="row justify-center text-h6 q-mb-xl">
          <div class="text-grey q-mr-xs">Olvide</div>
          <div class="text-bold text-primary">mi contraseña</div>
        </div>
        <div class="row justify-center items-center q-mb-lg">
          <q-separator color="grey" class="col"/>
          <div class="text-grey q-px-sm">O conectate usando</div>
          <q-separator color="grey" class="col"/>
        </div>
        <div class="row justify-center q-mb-xl">
          <q-avatar rounded class="q-mx-md" size="50px" style="border-radius: 15px;">
            <q-img src="fa 1.png" class="full-height"/>
          </q-avatar>
          <q-avatar rounded class="q-mx-md" size="50px" style="border-radius: 15px;">
            <q-img src="email 1.png" class="full-height"/>
          </q-avatar>
          <q-avatar rounded class="q-mx-md" size="50px" style="border-radius: 15px;">
            <q-img src="twte 1.png" class="full-height"/>
          </q-avatar>
        </div>
        <div class="row justify-center">
          <div class="text-grey q-mr-xs">¿No tienes cuenta aun?</div>
          <div class="text-bold text-primary" @click="$router.push('/registro')">Crear una cuenta</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      loading: false,
      isPwd: true,
      form: {},
      user: {}
    }
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    ...mapActions('generals', ['saveUser']),
    loguear () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.loading = true
        this.$q.loading.show({
          message: 'Iniciando sesión'
        })
        this.$api.post('login', this.form).then(res => {
          if (res) {
            this.user = res.SESSION_INFO
            this.login(res)
            if (this.user.roles[0] === 1) {
              this.$router.push('/administrador')
            } else {
              this.$router.push('/inicio')
            }
          } else {
            console.log('error de ususario')
            this.loading = false
            this.$q.loading.hide()
          }
          this.$q.loading.hide()
          this.loading = false
        })
      }
    }
  }
}
</script>
