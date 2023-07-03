<template>
  <div id="bmap"></div>
</template>
<script>
export default {
  data() {
    return {
      carMk: null
    };
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

    var pStart = new BMapGL.Point(117.19635, 36.24093);
    var pEnd = new BMapGL.Point(117.2035, 36.24764);
    var bounds = new BMapGL.Bounds(
      new BMapGL.Point(pStart.lng, pEnd.lat),
      new BMapGL.Point(pEnd.lng, pStart.lat)
    );
    var imgOverlay = new BMapGL.GroundOverlay(bounds, {
      type: "image",
      url: "/car.png",
      opacity: 1
    });
    map.addOverlay(imgOverlay);

    var trackLine = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: []
          }
        }
      ]
    };
    var lineLayer = null;
    // 添加图层
    const addLineLayer = () => {
      fetch(
        "https://mapopen-pub-jsapigl.bj.bcebos.com/svgmodel/lineLayerData.json"
      )
        .then(res => {
          return res.json();
        })
        .then(testLineData => {
          trackLine.features[0] = testLineData.features[3];
          if (!lineLayer) {
            lineLayer = new BMapGL.LineLayer({
              enablePicked: true,
              autoSelect: true,
              pickWidth: 30,
              pickHeight: 30,
              selectedColor: "#3faf7c", // 选中项颜色
              style: {
                borderColor: "#fff",
                borderWeight: 1,
                strokeWeight: 5,
                strokeColor: "#3faf7c",
                strokeTextureUrl: "/img2.png",
                sequence: true,
                marginLength: 32,
                borderColor: "green",
                borderMask: false,
                borderWeight: 2,
                strokeWeight: 6,
                strokeLineJoin: "miter",
                strokeLineCap: "round",
                strokeTextureWidth: 32,
                strokeTextureHeight: 64
              }
            });
          }
          console.log(trackLine)
          lineLayer.setData(trackLine);
          map.addNormalLayer(lineLayer);
          const coordinates = trackLine.features[0].geometry.coordinates;
          this.createIcon(map, coordinates);
        });
    };
    addLineLayer();
  },
  methods: {
    createIcon(map, coordinates) {
      // 绘制开始结束icon
      this.drawIcon(map, coordinates[0], "/start.png");
      this.drawIcon(map, coordinates[coordinates.length - 1], "/end.png");
      var temporary = []; //定义中间新取出的值放到一个新的数组里面
      var i = 0;
      var interval = setInterval(() => {
        if (i >= coordinates.length) {
          clearInterval(interval);
          return;
        }
        i = i + 1;
        temporary.push(coordinates[i]);
        this.drowLine(map, temporary); //画线调用
      }, 100);
    },
    drawIcon(map, pos, image) {
      // 创建小车图标
      var myIcon = new BMapGL.Icon(image, new BMapGL.Size(52, 26));
      // 创建Marker标注，使用小车图标
      var pt = new BMapGL.Point(...pos);
      var marker = new BMapGL.Marker(pt, {
        icon: myIcon
      });
      // 将标注添加到地图
      map.addOverlay(marker);
    },

    drowLine(map, temporary) {
      if (temporary && temporary.length > 1) {
        // 判断数值为两个点时开始进行绘制
        var polyline22 = new BMapGL.Polyline(
          [
            new BMapGL.Point(
              temporary[temporary.length - 2][0],
              temporary[temporary.length - 2][1]
            ),
            new BMapGL.Point(
              temporary[temporary.length - 1][0],
              temporary[temporary.length - 1][1]
            )
          ],
          { strokeColor: "red", strokeWeight: 7, strokeOpacity: 1 }
        ); //创建折线
        map.addOverlay(polyline22);
        this.addMarkerEnd(
          new BMapGL.Point(
            temporary[temporary.length - 1][0],
            temporary[temporary.length - 1][1]
          ),
          "终点",
          map,
          temporary[temporary.length]
        ); //添加图标
      }
    },

    addMarkerEnd(point, name, map, trackUnit) {
      var myIcon2 = new BMapGL.Icon("/move.png", new BMapGL.Size(22, 26)); //初始化终点坐标图标
      if (name == "终点") {
        if (this.carMk) {
          //先判断第一次进来的时候这个值有没有定义，有的话就清除掉上一次的。然后在进行画图标。第一次进来时候没有定义也就不走这块，直接进行画图标
          map.removeOverlay(this.carMk);
        }
        this.carMk = new BMapGL.Marker(point, { icon: myIcon2 }); // 创建标注
        // this.carMk.setRotation(trackUnit.route); //trackUnit.route
        map.addOverlay(this.carMk); // 将标注添加到地图中
        this.carMk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#bmap {
  width: 1200px;
  height: 800px;
  background: #44444456;
}
</style>
