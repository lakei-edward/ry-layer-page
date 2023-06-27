<template>
  <div id="bmap"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: [],
  mounted() {
    var map = new BMapGL.Map("bmap");
    var point = new BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    // map.centerAndZoom("徐州", 12); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
    map.addControl(zoomCtrl);
    var navi3DCtrl = new BMapGL.NavigationControl3D(); // 添加3D控件
    map.addControl(navi3DCtrl);
    // 创建城市选择控件
    var cityControl = new BMapGL.CityListControl({
      // 控件的停靠位置（可选，默认左上角）
      anchor: BMAP_ANCHOR_TOP_LEFT,
      // 控件基于停靠位置的偏移量（可选）
      offset: new BMapGL.Size(10, 5)
    });
    // 将控件添加到地图上
    map.addControl(cityControl);
    // 点击事件
    // map.addEventListener("click", function(e) {
    //   alert("点击位置经纬度：" + e.latlng.lng + "," + e.latlng.lat);
    // });

    var lineLayer = null;
    // 添加图层
    function addLineLayer() {
      fetch(
        "https://mapopen-pub-jsapigl.bj.bcebos.com/svgmodel/lineLayerData.json"
      )
        .then(res => {
          return res.json();
        })
        .then(testLineData => {
          if (!lineLayer) {
            lineLayer = new BMapGL.LineLayer({
              enablePicked: true,
              autoSelect: true,
              pickWidth: 30,
              pickHeight: 30,
              selectedColor: "yellow", // 选中项颜色
              style: {
                // borderMask: false,
                borderColor: "rgba(27, 142, 236, .6)",
                borderWeight: 2,
                strokeWeight: 3,
                strokeStyle: "dashed",
                strokeColor: [
                  "case",
                  ["boolean", ["feature-state", "picked"], false],
                  "#6704ff",
                  [
                    "match",
                    ["get", "name"],
                    "demo1",
                    "#ce4848",
                    "demo2",
                    "#6704ff",
                    "demo3",
                    "blue",
                    "#6704ff"
                  ]
                ]
              }
            });
          }
          lineLayer.addEventListener("click", function(e) {
            if (e.value.dataIndex !== -1 && e.value.dataItem) {
              console.log("click", e.value.dataItem);
              // 使用样式配置，实现单选效果
              // this.updateState(e.value.dataIndex, { picked: true })
            }
          });
          console.log(testLineData)
          lineLayer.setData(testLineData);
          map.addNormalLayer(lineLayer);
        });
    }
    addLineLayer();
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
#bmap {
  width: 100%;
  height: 100%;
  background: #44444456;
}
</style>
