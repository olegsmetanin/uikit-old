import * as React from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'

export const Pure = ComposedComponent => class PureHOC extends React.Component<any, any> {
  constructor(props, context) {
    super(props, context)
  }
  shouldComponentUpdate() {
    // console.log('Pure shouldComponentUpdate')
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }

  render() {
    // console.log('Pure render')
    return <ComposedComponent {...this.props}/>
  }
}