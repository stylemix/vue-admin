<template>
  <div class="navbar site-navbar navbar-expand-md navbar-dark">
    <div class="navbar-brand">
      <router-link :to="logoRoute" class="d-inline-block">
        <img :src="logo" alt="logo"/>
      </router-link>
    </div>
    <div class="d-md-none d-flex ml-auto mobile-nav">

      <button
        v-if="isAdmin"
        @click="onShowDivisionBar"
        type="button"
        class="navbar-toggler lang-icon"
      >
        <i class="icon-map5"></i>
      </button>

      <button
        type="button"
        class="navbar-toggler lang-icon"
        @click="onShowLangSwitcher"
      >
        <i class="icon-earth"></i>
      </button>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-mobile"
        @click="onShowSubmenu"
      >
       <svg height="14pt" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" width="14pt"
            fill="white"
            xmlns="http://www.w3.org/2000/svg">
         <g transform="matrix(.1 0 0 -.1 0 512)">
         <path d="m2135 5113c-992-86-1815-781-2060-1738-55-215-69-332-69-575s14-360 69-575c223-871 931-1536 1815-1704 368-69 768-47 1117 64 88 28 113 49 113 98 0 33-40 77-69 77-11 0-55-11-98-24-634-195-1346-80-1878 302l-80 58 2 89c3 163 77 395 178 561 215 355 550 578 958 638 265 40 524-2 772-123 198-97 349-222 483-398 64-85 89-101 137-89 30 8 59 59 51 92-10 40-121 177-224 276-156 149-335 260-530 328l-91 32 61 40c169 109 302 292 360 495 30 104 32 330 4 438-91 351-400 613-758 644-162 14-308-13-453-83-176-85-315-224-399-399-58-120-76-197-83-338-6-134 11-239 58-357 61-152 181-302 316-392l72-49-67-22c-363-119-681-397-857-749-69-138-123-307-140-437-4-29-11-53-16-53-14 0-197 212-266 308-651 910-491 2186 366 2903 337 283 744 454 1190 500 139 14 407 7 541-16 301-50 600-167 854-335 539-356 890-941 957-1595 23-227-3-543-61-751-26-91-25-110 5-139 29-30 73-33 105-7 25 21 60 144 92 332 30 170 32 530 5 695-25 145-49 251-87 369-285 888-1062 1513-1994 1605-102 10-308 12-401 4zm327-1164c198-34 390-183 484-374 175-354 34-767-321-940-201-99-407-99-610 0-294 142-447 457-380 780 21 102 92 238 165 317 169 185 404 262 662 217z"/><path d="m4050 1950c-45-11-55-26-90-140l-30-95-69-32c-38-18-89-48-114-67l-45-35-104 21c-57 12-115 19-129 15-45-11-189-248-189-311 0-18 22-51 72-107l72-82v-136l1-136-72-83c-51-57-73-90-73-108 0-46 106-240 162-296 23-23 62-23 170 1l86 19 62-44c34-23 86-53 116-65l55-23 25-85c48-158 53-161 244-161s196 3 244 160l26 85 55 24c30 13 82 43 116 66l61 42 82-18c105-24 151-24 174-1 56 56 162 250 162 295 0 18-22 51-72 108l-71 81-1 140c-1 109 2 142 13 151 47 39 131 150 131 174 0 35-92 208-141 266-48 55-58 57-192 27l-89-20-44 34c-24 19-76 49-114 67l-71 34-29 95c-36 116-44 129-95 140-48 11-246 11-295 0zm254-239c34-111 45-126 105-146 57-19 149-72 197-115 41-36 74-38 184-11 86 22 82 23 127-63l25-48-29-34c-117-137-108-123-104-178 3-28 5-89 5-136s-2-108-5-136c-4-50-4-50 66-128l69-78-34-64c-19-35-39-64-44-64-6 0-48 9-94 20s-91 20-101 20-49-24-88-53c-38-30-101-66-139-82s-78-37-89-47-34-60-51-111l-31-92h-74-74l-30 92c-29 88-56 133-79 133-25 0-155 70-210 114-33 25-67 46-77 46s-55-9-101-20-88-20-94-20c-5 0-25 29-44 64l-34 64 59 67c82 91 87 102 75 165-13 66-12 172 0 227 13 56 4 75-69 155-34 36-61 72-61 79 0 25 64 119 81 119 10 0 56-9 103-20 97-23 92-25 189 49 36 26 96 61 135 76 40 15 78 35 86 44s26 58 42 109l27 92h77 77z"/><path d="m4075 1360c-109-35-210-133-251-243-14-37-19-77-19-142 0-80 4-97 32-157 58-124 164-205 303-230 166-31 346 66 423 230 28 60 32 77 32 157 0 105-20 169-75 242-104 139-281 195-445 143zm231-163c105-54 159-188 119-293-39-102-119-158-225-158-102 0-176 48-219 144-55 122 16 279 145 320 41 13 144 6 180-13z"/>
         </g>
       </svg>
      </button>
      <button
        @click="onHamburgerClick"
        class="navbar-toggler sidebar-mobile-main-toggle d-none d-md-block"
        type="button"
      >
        <i class="icon-paragraph-justify3"></i>
      </button>
      <button
        @click="onMobileClick"
        class="navbar-toggler sidebar-mobile-main-toggle"
        type="button"
      >
        <i class="icon-paragraph-justify3"></i>
      </button>

    </div>

    <div
      :class="{ 'show': showLangSwitcher }"
      class="d-md-none collapse "
      id="lang-switcher"
    >
      <div class="lang-switcher">
        <slot name="lang-switcher"></slot>
      </div>
    </div>

    <div
      v-if="isAdmin"
      :class="{ 'show': showDivisionBar }"
      class="d-md-none collapse "
      id="navbar-division"
    >
      <div class="navbar-division">
        <slot name="navbar-division"></slot>
      </div>
    </div>

    <div
      :class="{ 'show': showSubmenu }"
      class="collapse navbar-collapse"
      id="navbar-mobile">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            href
            @click.prevent="onHamburgerClick"
            class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block"
          >
            <i class="icon-paragraph-justify3"></i>
          </a>
        </li>
      </ul>
      <div class="d-none d-md-flex">
         <slot name="lang-switcher" />
         <slot name="navbar-division" />
      </div>
      <ul class="navbar-nav ml-auto user-info">
        <navbar-user></navbar-user>
      </ul>
    </div>
  </div>
</template>

<script>
import NavbarUser from './navbar-user'
import Config from '../../config'

export default {
  name: 'Navbar',
  components: { NavbarUser },
  data() {
    return {
      showSubmenu: false,
      showLangSwitcher: false,
      showDivisionBar: false
    }
  },
  props: {
    logo: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    logoRoute: () => Config.defaultRoute,
  },
  methods: {
    onHamburgerClick() {
      const classList = document.body.classList
      const found = classList.contains('sidebar-xs')
      if (found) classList.remove('sidebar-xs')
      else classList.add('sidebar-xs')
    },
    onMobileClick() {
      const classList = document.body.classList
      const found = classList.contains('sidebar-mobile-main')
      if (found) classList.remove('sidebar-mobile-main')
      else classList.add('sidebar-mobile-main')
    },
    onShowSubmenu() {
      this.showSubmenu = !this.showSubmenu
      this.showLangSwitcher = false
      this.showDivisionBar = false
    },
    onShowLangSwitcher() {
      this.showLangSwitcher = !this.showLangSwitcher
      this.showSubmenu = false
      this.showDivisionBar = false
    },
    onShowDivisionBar(){
      this.showDivisionBar = !this.showDivisionBar
      this.showSubmenu = false
      this.showLangSwitcher = false
    }
  },
}
</script>
<style lang="scss">
  @media (max-width: 768px) {

    .user-info {
      .navbar-nav-link.dropdown-toggle {
        display: none;
      }

      .dropdown-menu.dropdown-menu-right {
        display: block !important;
      }
    }
    .lang-icon {
      font-size: 17px !important;
    }
    .lang-switcher,
    .navbar-division {
      margin: 1.25rem 0;
    }
    .navbar-toggler + .navbar-toggler {
      margin-left: 15px !important;
    }

    #lang-switcher,
    #navbar-division{
      width: 100%;
      border-top: 1px solid rgba(255, 255, 255, .1);
      margin: 0 -1.25rem;
      padding: 0 1.25rem;
      flex-grow: 1;
      flex-basis: 100%;
      .dropdown, .b-dropdown {
        padding: .5rem 0;
        border-radius: .1875rem;
      }
      .lang-switcher,
      .navbar-division{
        .navbar-nav {
          margin-left: 0 !important;
          .dropdown-toggle {
            background-color: #fff;
            box-shadow: none;
            color: #333;
          }
          .dropdown {
            width: 100%;
            background-color: #fff;
            .dropdown-menu {
              &.show {
                min-width: 100%;
                top: 100% !important;
                left: auto !important;
                right: 0 !important;
                transform: translate(0, 0) !important;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 350px){
    .site-navbar {
      .navbar-brand {
        text-align: center;
        margin: 0;
        padding: 10px 0 0 0;
        width: 100%;
      }
      .mobile-nav {
        margin-right: auto;
        button {
          i, svg {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
