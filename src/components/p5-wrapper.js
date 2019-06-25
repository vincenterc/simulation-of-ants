import React, { useRef, useEffect } from 'react'

function P5Wrapper(props) {
  let { sketch, exposeSketchCustomProps = () => {} } = props
  let p5Wrapper = useRef(null)
  let p5Instance = null

  useEffect(() => {
    // hack to import p5 because SSR
    const p5 = require('p5')

    p5Instance = new p5(sketch, p5Wrapper.current)
  }, [])

  useEffect(() => {
    if (p5Instance && p5Instance.setSketchProps) {
      p5Instance.setSketchProps(props)
    }
  })

  useEffect(() => {
    exposeSketchCustomProps(p5Instance.customProps)
  }, [])

  return <div ref={p5Wrapper} />
}

export default P5Wrapper
