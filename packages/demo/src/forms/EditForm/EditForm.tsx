import * as React from 'react'
import {observable, observer, /*extendObservable*/} from 'lib/Reactive'
import * as _ from 'lodash'
import {MaskedInput} from 'components'
export interface IEditFormProps {
  prefill?: IEditFormState

  onApply: (value: IEditFormValue) => void
}


export interface IEditFormValue {
  number: {
    numberMin?: number
    numberMax?: number
  }
  maskedValue?: number
}

export interface IEditFormState {
  value: IEditFormValue

}

@observer
export class EditForm extends React.Component<IEditFormProps, void> {

  @observable
  _state: IEditFormState

  constructor(props, context) {
    super(props, context)

    const defaults = {
      number: {
        numberMin: undefined,
        numberMax: undefined,
      },
      maskedValue: undefined
    }

    this._state = {
      value: props.prefill
        ? props.prefill
        : defaults
    }
  }

  handleApply = () => {
    this.props.onApply(this._state.value)
  }

  handleInputChange = (e) => {
    _.update(this._state.value, e.target.name, () => e.target.value || undefined)
  }

  render() {
    return (
      <div>
        <div>
          <input type="input"
            name="number.numberMin"
            value={this._state.value.number.numberMin || ''}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <input type="input"
            name="number.numberMax"
            value={this._state.value.number.numberMax || ''}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <MaskedInput
            name="maskedValue"
            value={this._state.value.maskedValue}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
        {JSON.stringify(this._state.value)}
        </div>
        <button onClick={this.handleApply}>
          Save
        </button>
      </div>
    )
  }
}