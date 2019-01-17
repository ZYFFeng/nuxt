<template>
  <div class="browse">
    <v-navigation-drawer
      v-model="drawerChild"
      temporary
      fixed
    >
      <div class="navigation-title">
        <h2 class="title">Browse</h2>
        <v-text-field
          class="search"
          label="Search our store"
          clearable
          solo
          append-icon="search"
          @click:append="handerSearch"
        />
      </div>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <template v-for="item in menuLsit">
          <v-list-tile 
            v-if="item.menu_name === 'DEALS'" 
            :key="item.menu_name">
            <v-list-tile-title>{{ item.menu_name }}</v-list-tile-title>
          </v-list-tile>
          <v-list-group
            v-else
            :key="item.menu_name"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.menu_name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-if="item.menu_name !== 'KIDS'">
              <v-list-tile
                v-for="subItem in item.child_menu"
                :key="subItem.child_name"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.child_name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <template v-else>
              <v-list-group
                v-for="(subItem, key) in item.child_menu[0]"
                :key="key+1"
                no-action
                sub-group
              >
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ key }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                  v-for="kudsItem in subItem"
                  :key="kudsItem.child_name"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ kudsItem.child_name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
  export default {
    props: {
       menuLsit: {
        type: Array,
        default: () => []
      },
      drawer: {
        type: Boolean,
        default: () => false
      }
    },
    data () {
      return {
        drawerChild: null,
      }
    },
    watch: {
      drawer (value) {
          this.drawerChild = value;
      },
      drawerChild (value) {
          this.$emit('drawerStatus', value)
      }
    },
    methods: {
      handerSearch() {
        console.log(1)
      }
    },
  }
</script>
<style lang="stylus" scoped>

.browse 
  >>> .search
    margin 16px
  >>> .v-navigation-drawer
    z-index 11
.title
  margin 16px
</style>
