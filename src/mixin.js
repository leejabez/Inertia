import Vue from 'vue'
import {
    mapGetters
} from 'vuex'
Vue.mixin({
    computed: {
        ...mapGetters(['getUser'])
    },
    data() {
        return {
            defaultProfilePic: require("./assets/discover.png"),
        }
    },
    methods: {
        formatedDate(d) {
            var today = new Date();
            if (d) {
                var thatDay = d.toDate()
                var thatDayOriginal = d.toDate()
                if (today.setHours(0, 0, 0, 0) === thatDay.setHours(0, 0, 0, 0)) {
                    console.log("*** Same day ***");
                    return formatedWithAMPM(thatDayOriginal)
                } else {
                    if (today.setDate(0) == thatDay.setDate(0)) {
                        return thatDayOriginal.getDate() + ' ' + getMonthName(thatDayOriginal.getMonth()) + ' '
                    } else {
                        return getMonthName(thatDayOriginal.getMonth())
                    }
                }


            } else {
                return ''
            }

            function getMonthName(monthNum) {
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                return monthNames[monthNum]
            }

            function formatedWithAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ' ' + minutes + ' ' + ampm;
                return strTime;
            }
        }
    },
})