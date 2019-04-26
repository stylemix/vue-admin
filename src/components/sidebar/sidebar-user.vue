<template>
  <div class="sidebar-user" v-if="user && user.firstname">
    <div class="card-body">
      <div class="media">
        <div class="mr-3">
          <a href="#"
            ><img
              v-if="user.avatar"
              :src="user.avatar"
              width="38"
              height="38"
              class="rounded-circle"
              alt="user-avatar"
          /></a>
        </div>

        <div v-if="user" class="media-body">
          <div class="media-title font-weight-semibold">{{ fullname }}</div>
          <div class="font-size-xs opacity-50">
            {{ user.profession || `Programmer, SEO manager` }}
          </div>
        </div>

        <div class="ml-3 align-self-center">
          <a href="#" class="text-white"><i class="icon-cog3"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarUser',

  computed: mapGetters('profile', ['fullname', 'user'])
}
</script>
