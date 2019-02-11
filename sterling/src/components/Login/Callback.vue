<template>
    <div>
    </div>
</template>

<script>
import AuthService from './AuthService'
export default {
  name: 'Callback',
  data () {
      console.log('callback component')
      AuthService.handleAuthentication(this)
    return {
    }
  }
}
</script>
