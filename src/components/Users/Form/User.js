import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Form,
  FormBox,
  FormRow,
  FormItem,
  FormLabel,
  Loading,
  Spacer,
  Textfield,
} from '@radargovernamental/orbit-style';

import CoreForm from '../../Core/Form';

class UserForm extends CoreForm {
  componentWillMount() {
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  }

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      const currentState = this.state;
      this.setState({ ...Object.assign({}, currentState, data || {}) });
    }
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormBox isLoading={loading}>
          <FormRow>
            <FormItem>
              <Textfield
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
                autoFocus
              />
              <FormLabel htmlFor="email">E-mail</FormLabel>
            </FormItem>
          </FormRow>
          <FormRow>
            <FormItem>
              <Textfield type="password" name="password" value={password} onChange={this.handleChange} required />
              <FormLabel htmlFor="password">Senha</FormLabel>
            </FormItem>
          </FormRow>
        </FormBox>
        <Spacer mtLg={2} mtMd={2} mtSm={2} mtXs={2}>
          <FormBox isLoading={loading}>
            <FormRow>
              <FormItem>
                <Button type="submit" primary lg fullWidth>
                  {loading ? <Loading inline white sm /> : 'Entrar'}
                </Button>
              </FormItem>
            </FormRow>
          </FormBox>
        </Spacer>
      </Form>
    );
  }
}

UserForm.propTypes = {
  data: PropTypes.object,
  submitTitle: PropTypes.string,
  showCancel: PropTypes.bool,
  loading: PropTypes.bool,
  cancelLink: PropTypes.string,
};
UserForm.defaultProps = {
  data: {},
  submitTitle: 'Save',
  showCancel: false,
  cancelLink: null,
  loading: false,
};

export default UserForm;
