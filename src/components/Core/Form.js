import { Component } from 'react';
import PropTypes from 'prop-types';
import logdown from 'logdown';

const logger = logdown('FORM');

class CoreForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
    this.formName = null;
  }

  handleSubmit(e, data = null) {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(data || this.state);

    logger.info('*SUBMIT DATA*: ', data || this.state);
    return false;
  }

  handleChange(e, callback) {
    const {
      name,
      type,
      value,
      checked,
      files,
    } = e.target;

    let val;
    switch (type) {
      case 'checkbox':
        val = checked;
        break;
      case 'file':
        val = files[0]; //eslint-disable-line
        break;
      default:
        val = value;
    }
    logger.info(`Field: *${name}*: `, val);
    this.setState({ [name]: val }, callback);
  }
}

CoreForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
CoreForm.defaultProps = {};

export default CoreForm;
