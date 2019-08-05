import React from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import './index.scss'

const navList = [
  { title: '整租', src: Nav1, path: '/home/house' },
  { title: '合租', src: Nav2, path: '/home/house' },
  { title: '地图找房', src: Nav3, path: '/map' },
  { title: '取租房', src: Nav4, path: '/rent' }
]

// const data = Array.from(new Array(4)).map((_val, i) => ({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//   text: `name${i}`
// }))
class Index extends React.Component {
  state = {
    // 轮播图的初始数据
    // 当swipers 为空的时候 不给isLoaded 判断 那么会有轮播图 不自动变化的
    swipers: [],
    //设置轮播图的默认高度， 不会在加载的时候 下面的内容上来的现象
    imgHeight: 212,
    // 表示数据没有加载完成
    isLoaded: false,
    groups: [],
    news: [],
    cityName: '北京'
  }

  // 获取轮播图  发送 请求
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

  // 获取小组
  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    const { status, body } = res.data
    // console.log(res.data)
    if (status === 200) {
      this.setState({
        groups: body
      })
    }
  }

  // 获取资讯
  async getNews() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    // console.log(res.data)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        news: body
      })
    }
  }

  componentDidMount() {
    this.getSwipers()
    // 获取小组成员信息
    this.getGroups()
    // 获取资讯
    this.getNews()
    // 获取地理位置
    // console.log('获取位置')
    // navigator.geolocation.getCurrentPosition(position => {
    //   console.log('获取地理位置')
    //   console.log(position)
    // })

    var myCity = new window.BMap.LocalCity()
    myCity.get(async result => {
      // 获取当前城市的名字
      const name = result.name
      const res = await axios.get('http://localhost:8080/area/info', {
        params: {
          name: name
        }
      })
      // console.log(res.data.body)
      // {label: "上海", value: "AREA|dbf46d32-7e76-1196"} 是个对象
      // console.log(JSON.stringify(res.data.body))
      // {"label":"上海","value":"AREA|dbf46d32-7e76-1196"}  存入localStorage 的正确格式
      const { body, status } = res.data
      // console.log(res.data)
      if (status === 200) {
        //1. 获取成功后 把获取到的数据 存到缓存中 没必要每次都获取， 取其他页面的时候 ，也要能使用
        //2. 显示城市的名字
        localStorage.setItem('current_city', JSON.stringify(body))
        this.setState({
          cityName: body.label
        })
      }
    })
  }

  // 渲染资讯
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
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

  // 渲染 搜索框
  renderSearch() {
    return (
      <div className="search">
        <Flex className="search-box">
          <Flex className="search-form">
            <div
              className="location"
              onClick={() => this.props.history.push('/city')}
            >
              <span className="name">{this.state.cityName}</span>
              <i className="iconfont icon-arrow"> </i>
            </div>
            <div
              className="search-input"
              onClick={() => this.props.history.push('/search')}
            >
              <i className="iconfont icon-seach" />
              <span className="text">请输入小区地址</span>
            </div>
          </Flex>
          {/* 地图小图标 */}
          <i
            className="iconfont icon-map"
            onClick={() => this.props.history.push('/map')}
          />
        </Flex>
      </div>
    )
  }

  // 渲染导航列表
  renderNav() {
    return navList.map(item => (
      <Flex.Item key={item.title}>
        <Link to={item.path}>
          <img src={item.src} alt="" />
          <p>{item.title}</p>
        </Link>
      </Flex.Item>
    ))
  }

  render() {
    return (
      <div className="index">
        {/* 给这个盒子加上一个 高 这样的话 就不会出现下面的内容想上蹿的情况 */}
        <div className="swiper" style={{ height: this.state.imgHeight }}>
          {/* 收缩框 */}
          {this.renderSearch()}
          {/* 轮播图调用 */}
          {this.renderSwiper()}
        </div>
        {/* 导航 */}
        <div className="nav">
          <Flex>{this.renderNav()}</Flex>
        </div>

        {/* 租房小组 */}
        <div className="group">
          {/* 标题 */}
          <div className="group-title">
            租房小组
            <span className="more">更多</span>
          </div>
          {/* 内容 */}
          <div className="group-content">
            <Grid
              data={this.state.groups}
              columnNum={2}
              hasLine={false}
              square={false}
              activeStyle
              renderItem={item => (
                <Flex className="group-item" justify="around">
                  <div className="desc">
                    <p className="title">{item.title}</p>
                    <span className="info">{item.desc}</span>
                  </div>
                  <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </Flex>
              )}
            />
          </div>
        </div>

        {/* 最新资讯 */}
        <div className="message">
          <h3 className="group-title">最新资讯</h3>
          {this.renderNews()}
        </div>
      </div>
    )
  }
}
export default Index
