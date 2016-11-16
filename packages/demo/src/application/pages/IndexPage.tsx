import * as React from 'react'
import {observable, observer} from 'lib/Reactive'
import {Container} from 'components'
import {IEditFormValue, EditForm} from 'forms/EditForm/EditForm'

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

  handleApply = (value: IEditFormValue) => {
    console.log('edit form handleApply', value)
  }

  render() {
    return (
      <div>
        Index Page
        <Container
          width={this.layoutWidth}
          onChangeWidth={this.onLayoutWidthChange}
          className={'layout'}
        >
          Container width: {this.layoutWidth}
          <EditForm
            onApply={this.handleApply}
          />
        </Container>
      </div>
    )
  }

}

