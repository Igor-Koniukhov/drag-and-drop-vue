<template>
  <div class="home">
    <div class="container">
      <ToDo/>

    </div>


  </div>
</template>

<script>
import ToDo from "@/components/ToDo"

export default {
  name: 'Home',
  components:{ToDo}

}
</script>
