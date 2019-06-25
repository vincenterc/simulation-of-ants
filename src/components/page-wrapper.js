import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import Layout from './layout'

const PageWrapper = Comp => {
  class Wrapper extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Layout {...this.props}>
            <Comp {...this.props} />
          </Layout>
        </Provider>
      )
    }
  }

  Wrapper.displayName = `Wrapper-of-${Comp.displayName || Comp.name}`

  return Wrapper
}

export default PageWrapper
