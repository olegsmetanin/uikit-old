import * as React from 'react'
import {observable, observer} from 'lib/Reactive'
import {Container} from 'components'


export interface IIndexPageProps {
}

/**
 * Index page
 */
@observer
export class IndexPage extends React.Component<IIndexPageProps, void> {

  @observable
  layoutWidth: number

  onLayoutWidthChange = (newLayoutWidth) => {
    this.layoutWidth = newLayoutWidth
  }

  render() {
    return (
      <div>
        Index Page
        <div>
      <Container
        width={this.layoutWidth}
        onChangeWidth={this.onLayoutWidthChange}
        className={'layout'}
      >
        Container width: {this.layoutWidth}

      </Container>

        </div>
      </div>
    )
  }

}

