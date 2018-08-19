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

class LoginForm extends CoreForm {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    const { isLoading } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormBox isLoading={isLoading}>
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
          <FormBox isLoading={isLoading}>
            <FormRow>
              <FormItem>
                <Button type="submit" primary fullWidth>
                  {isLoading ? <Loading inline white sm /> : 'Entrar'}
                </Button>
              </FormItem>
            </FormRow>
          </FormBox>
        </Spacer>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  isLoading: PropTypes.bool,
};
LoginForm.defaultProps = {
  isLoading: false,
};

export default LoginForm;
