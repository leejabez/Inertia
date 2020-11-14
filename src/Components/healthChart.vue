<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: ["asdasd", "asdasd", "asdasd", "asdasd"],
      datasets: [
        {
          label: "Feelings Rating ",
          borderColor: "",
          data: [10, 30, 46, 2, 8, 50, 0],
          fill: true,
          pointBorderColor: "",
          pointBackgroundColor: "",
          pointHoverBackgroundColor: "",
          pointHoverBorderColor: "",
        },
      ],
    },

    options: {
      responsive: true,
      title: {
        display: false,
        text: "Mode: index, intersect = false",
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 1,
        },
      },
scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxTicksLimit: 12,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              scaleSteps: 5,
              scaleStepWidth: 5,
              scaleStartValue: 0,
            },
          },
        ],
      },
    },
  }),
  methods: {
    renderTheChart() {
      var canvas = document.getElementById("line-chart");
      console.log(canvas);
      var ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "#E8B56B");
      gradient.addColorStop(1, "rgba(232, 181, 107, 0) ");

      var r = this.getUser.feeling_updates;
      var series = [];
      var labels = [];

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      if (r) {
        r.forEach((e) => {
          series.push(e.rating);
          var d = e.update_time.toDate();
          console.log(d);
          labels.push(monthNames[d.getMonth()] + " " + d.getDate());
        });
      }
      console.log(series);
      console.log(labels);
      this.chartdata.labels = labels;

      this.chartdata.datasets[0].data = series;
      this.chartdata.datasets[0].backgroundColor = gradient;
      this.renderChart(this.chartdata, this.options);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renderTheChart();
    });
  },
};
</script>