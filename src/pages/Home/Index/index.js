import React from 'react'
import { Carousel, Flex } from 'antd-mobile'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import './index.scss'

class Index extends React.Component {
  state = {
    // 轮播图的初始数据
    // 当swipers 为空的时候 不给isLoaded 判断 那么会有轮播图 不自动变化的
    swipers: [],
    //设置轮播图的默认高度， 不会在加载的时候 下面的内容上来的现象
    imgHeight: 212,
    // 表示数据没有加载完成
    isLoaded: false
  }

  // 获取轮播图
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    // console.log(res.data)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        swipers: body,
        // 表示数据加载完成
        isLoaded: true
      })
    }
  }

  componentDidMount() {
    this.getSwipers()
  }

  // 渲染轮播图
  renderSwiper() {
    return (
      // 必须 isLoaded  为 true 即 数据加载完成
      this.state.isLoaded && (
        <Carousel
          // 自动播放
          autoplay={true}
          // 无限的
          infinite
          // autoplayInterval={1000}
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {this.state.swipers.map(item => (
            <a
              key={item.id}
              href="http://www.itcast.cn"
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight
              }}
            >
              <img
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // 设置图片是否可以缩放 图片高度没有定死
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
      )
    )
  }

  render() {
    return (
      <div className="index">
        {/* 给这个盒子加上一个 高 这样的话 就不会出现下面的内容想上蹿的情况 */}
        <div className="swiper" style={{ height: this.state.imgHeight }}>
          {/* 轮播图调用 */}
          {this.renderSwiper()}
        </div>
        <div className="nav">
          <Flex>
            <Flex.Item>
              <Link to="/home/house">
                <img src={Nav1} alt="" />
                <p>整租</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="/home/house">
                <img src={Nav2} alt="" />
                <p>合租</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="/map">
                <img src={Nav3} alt="" />
                <p>地图找房</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="/rent">
                <img src={Nav4} alt="" />
                <p>去租房</p>
              </Link>
            </Flex.Item>
          </Flex>
        </div>
      </div>
    )
  }
}
export default Index
