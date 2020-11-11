<template>
  <div style="position: sticky; top: 0; z-index: 99" class="border-bottom">
    <b-navbar toggleable="lg" type="light" variant="white" class=" ">
      <b-navbar-brand to="/">
        <b-img :src="logowithname"></b-img>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="pl-5">
          <template v-for="(v, k) in links">
            <b-nav-item
              v-if="(v.auth && getUser) || !v.auth"
              :to="v.path"
              :key="k"
              :class="['nav_item', { nav_item_active: $route.path == v.path }]"
              >{{ v.name }}</b-nav-item
            >
          </template>
        </b-navbar-nav>

        <!-- if logged in -->
        <b-navbar-nav class="ml-auto" v-if="getUser">
          <b-nav-item href="#">
            <b-dropdown
              id="request-dropdown"
              text="Requests"
              variant="white"
              no-caret
              class="mx-md-2"
              lazy
            >
              <template v-if="requests.length">
                <b-dropdown-item v-for="(v, k) in requests" :key="k">
                  <b-list-group v-if="!v.requested && !v.is_approved">
                    <b-list-group-item>
                      <div>
                        <div>
                          <span class="float-left h6 font-weight-bold">
                            {{ v.name }}
                          </span>
                          <span class="float-right text-muted">
                            {{
                              v.requested_on.toDate().getDay() +
                              "/" +
                              v.requested_on.toDate().getMonth() +
                              "/" +
                              v.requested_on.toDate().getFullYear()
                            }}
                          </span>
                        </div>
                        <div class="d-flex justify-content-around w-100">
                          <b-btn
                            class="rounded-pill"
                            size="sm"
                            variant="primary"
                            @click="accept(v)"
                          >
                            Accept
                          </b-btn>
                          <b-btn
                            class="rounded-pill"
                            size="sm"
                            variant="danger"
                            @click="reject(v)"
                          >
                            Reject
                          </b-btn>
                        </div>
                      </div></b-list-group-item
                    >
                  </b-list-group>
                </b-dropdown-item>
              </template>
              <template v-else>
                <b-dropdown-item v-if="!noRequest">
                  loading ....
                </b-dropdown-item>
                <b-dropdown-item v-else> No Friend Request </b-dropdown-item>
              </template>
            </b-dropdown>
          </b-nav-item>
          <b-nav-item href="#"
            >{{ getUser.name || "" }}
            <b-avatar variant="primary" text="IU"></b-avatar>
          </b-nav-item>
          <b-nav-item>
            <b-button @click="signout"> Signout </b-button>
          </b-nav-item>
        </b-navbar-nav>
        <!-- if not logged in -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
            <b-button
              class="nav_btn px-5"
              to="/login"
              v-if="$route.path !== '/login'"
            >
              Login
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>