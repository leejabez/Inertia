<template>
  <div style="display: flex; flex-direction: column">
    <h1 class="text-center font-weight-bold py-2" style="color: #0094B6">
      Resources
    </h1>
    <b-container style="flex: 1; background: #DEE5EF" fluid>
      <b-row>
        <b-col cols="12" md="6" lg="3" v-for="(v, k) in items" :key="k">
          <h6 class="font-weight-bold py-2">{{ v.title }}</h6>

          <div v-for="(r, i) in v.resources" :key="i">
            <a :href="r.link" style="text-decoration: none" target="_blank">
              <img
                :src="require('../assets/resources_logos/' + r.logoURL)"
                height="120px"
              />
              <h6 class="text-danger py-2">{{ r.text }}</h6>
            </a>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <footer-view />
  </div>
</template>

<script>
import footerView from "@/components/footer";
export default {
  data() {
    return {
      items: [
        {
          title: "Mental Well-being",
          resources: [
            {
              logoURL: "fy.png",
              text: "Fei Yue Online Counselling Services",
              link: "https://www.fycs.org/our-work/counselling/",
            },
            {
              link: "https://www.silverribbonsingapore.com/counselling.html",
              logoURL: "sb.png",
              text: "Silver Ribbon",
            },
            {
              link: "https://www.sos.org.sg/",
              logoURL: "sos.png",
              text: "Samaritans of Singapore",
            },
          ],
        },
        {
          title: "Violence or Abuse",
          resources: [
            {
              link: "http://www.biglove.org.sg/#section-4",
              logoURL: "bl.png",
              text: "Big Love Child Protection Specialist Centre",
            },
            {
              link: "https://www.carecorner.org.sg/counselling-centre",
              logoURL: "cc.png",
              text: "Care Corner",
            },
            {
              link: "https://www.pave.org.sg/contact-us.php",
              logoURL: "pave.png",
              text: "Pave",
            },
          ],
        },
        {
          title: "Counselling",
          resources: [
            {
              link:
                "https://www.touch.org.sg/about-touch/our-services/touch-cyber-wellness-homepage/contact-us",
              logoURL: "tcs.png",
              text: "TOUCHline",
            },
            {
              link:
                "https://www.gov.sg/article/call-these-helplines-if-you-need-emotional-or-psychological-support",
              logoURL: "nch.png",
              text: "National Care hotline",
            },
          ],
        },

        {
          title: "Marital & Parenting Issues",
          resources: [
            {
              link: "https://www.cphonlinecounselling.sg/hc/en-us",
              logoURL: "cph.png",
              text: "CPH Online Counselling",
            },
          ],
        },
      ],
    };
  },
  components: {
    footerView,
  },
};
</script>

<style>
</style>