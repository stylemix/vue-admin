<template>
  <div class="navbar navbar-expand-md navbar-dark">
    <div class="navbar-brand">
      <a href="#" class="d-inline-block">
        <img src="../../assets/images/logo_light.png" alt="logo" />
      </a>
    </div>

    <div class="d-md-none">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-mobile"
      >
        <i class="icon-tree5"></i>
      </button>
      <button
        @click="onHamburgerClick"
        class="navbar-toggler sidebar-mobile-main-toggle"
        type="button"
      >
        <i class="icon-paragraph-justify3"></i>
      </button>
    </div>

    <div class="collapse navbar-collapse" id="navbar-mobile">
      <ul class="navbar-nav">
        <li @click="onHamburgerClick" class="nav-item">
          <a
            href="#"
            class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block"
          >
            <i class="icon-paragraph-justify3"></i>
          </a>
        </li>
      </ul>
      <slot name="extra-nav" />
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a href="#" class="navbar-nav-link">
            Replace with your own actions
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="navbar-nav-link">
            Save
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="navbar-nav-link">
            Delete
          </a>
        </li>

        <li class="nav-item dropdown">
          <a href="#" class="navbar-nav-link">
            <i class="icon-bell2"></i>
            <span class="d-md-none ml-2">Notifications</span>
            <span
              class="badge badge-pill bg-warning border-white ml-auto ml-md-0"
              >9</span
            >
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',

  methods: {
    onHamburgerClick() {
      const classList = document.body.classList
      const found = classList.contains('sidebar-xs')
      if (found) classList.remove('sidebar-xs')
      else classList.add('sidebar-xs')
    }
  }
}
</script>
