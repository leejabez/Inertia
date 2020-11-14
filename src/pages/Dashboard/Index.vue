<template>
  <div style="background: #f8f8fb; height: 100%; min-height: 100vh">
                      <b-row>
              <b-col cols="12" md="6" lg="6" xl="6" class="py-3">
                <div class="dashboard_card d-flex">
                  <div>
                    <b-avatar
                      style="
                        background: rgba(113, 59, 219, 0.05);
                        color: #6F52ED;
                      "
                    ></b-avatar>
                  </div>
                  <div class="pl-3 pt-2">
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 28px;
                        line-height: 24px;
                        letter-spacing: 0.01em;
                        color: #2e3b52;
                      "
                      >{{ frndsList.length }}</span
                    >
                    <br />
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 21px;
                        letter-spacing: 0.01em;
                        color: #a6acbe;
                      "
                      >Friends</span>
                  </div>
                </div>
              </b-col>
                      </b-row>
      </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>