import React from 'react'
import styled from 'styled-components'
import PageWrapper from '../components/page-wrapper'
import P5Wrapper from '../components/p5-wrapper'
import simulationOfAntsSketch from '../p5-sketches/simulation-of-ants'

function HomePage() {
  return (
    <Wrapper>
      <P5Wrapper sketch={simulationOfAntsSketch} />
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default PageWrapper(HomePage)
