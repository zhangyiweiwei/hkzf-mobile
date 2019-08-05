import React from 'react'
import './index.scss'

class Map extends React.Component {
  componentDidMount() {
    const map = new window.BMap.Map('container')
    const point = new window.BMap.Point(121.61895125119062, 31.040452304898167)
    map.centerAndZoom(point, 18)
    map.enableScrollWheelZoom(true)
    var marker = new window.BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
    // marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) //跳动的动画
    // var marker2 = new window.BMap.Marker(window.pt, { icon: window.myIcon }) // 创建标注
    // map.addOverlay(marker2)
  }

  render() {
    return (
      <div className="map">
        {/* 设置地图的大小 */}
        <div id="container" />
      </div>
    )
  }
}

export default Map
