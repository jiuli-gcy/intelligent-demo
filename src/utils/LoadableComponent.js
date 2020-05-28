import React, { Component } from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

class LoadingPage extends Component {
  //类似github页面加载的那个加载条
  UNSAFE_componentWillMount() {
    NProgress.start()
  }
  UNSAFE_componentWillUnmount() {
    NProgress.done()
  }
  render() {
    return (
      <div />
    )
  }
}

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: () => <LoadingPage />
  })
}

export default LoadableComponent