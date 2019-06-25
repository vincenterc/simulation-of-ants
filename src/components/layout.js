import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import favicon from '../../assets/img/favicon.ico'
import './layout.css'

class Layout extends React.Component {
  render() {
    let { children } = this.props

    return (
      <Wrapper>
        <Helmet>
          <title>Simulation of Ants</title>
          <meta name="description" content="The simulation of ants" />
          {/* <link rel="icon" href={favicon} /> */}
        </Helmet>
        {children}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``

export default Layout
