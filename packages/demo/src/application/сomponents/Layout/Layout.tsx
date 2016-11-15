import * as React from 'react'

export interface ILayoutProps {

}

export class Layout extends React.Component<ILayoutProps, void> {

  render() {
    let {children} = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

