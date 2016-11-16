import * as React from 'react'

export interface IMaskedInputProps {
  value: string | number
  mask?: string
  changeOnKeyPress?: boolean
  name?: string
  onChange: (e) => void
}

export interface IMaskedInputState {
  value: string
}

export class MaskedInput extends React.Component<IMaskedInputProps, IMaskedInputState> {

  constructor(props, context) {
    super(props, context)
    this.state = {
      value: props.value || ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const {value} = nextProps
    const _value = value || ''
    // allows the user to update the value after render
    if (this._isValidUpdateValue(_value)) { this.setState({value: _value}) }
  }

  _isValidUpdateValue = (value) => {
    // A String of numbers, or a number, will have digits. Null or undefined will not.
    const isANumber = String(value).match(/\d/g)

    return Boolean(isANumber)
  }

  handleChange = (evt) => {
    const value = this._maskedInputValue(evt.target.value, evt.target.validity || {})
    const _value = value || ''
    evt.persist()
    this.setState({ value: _value }, () => {
      if (this.props.onChange) {
        // call original callback, if it exists
        this.props.onChange(evt)
      }
    })
  }

  _maskedInputValue = (value, validity) => {
    // a falsy value with "good" input indicates the user is clearing the text,
    // so allow them to.
    if (!value && !(validity.badInput)) { return null }

    // extract digits. if no digits, fill in a zero.
    const digits = value.match(/\d/g) || ['0']

    // zero-pad a one-digit input
    if (digits.length === 1) {
      digits.unshift('0')
    }

    // add a decimal point
    digits.splice(digits.length - 2, 0, '.')

    // make a number with 2 decimal points
    return Number(digits.join('')).toFixed(2)
  }

  render () {
    return (
      <div>
        <input type="text"
          name={this.props.name}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    )
  }

}
