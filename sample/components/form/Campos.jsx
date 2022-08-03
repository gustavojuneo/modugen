import React from 'react';
import PropTypes from 'prop-types';
import Fieldset from 'linear-react-components-ui/lib/fieldset';
import TextField from 'linear-react-components-ui/lib/inputs/text';
import { Field } from 'linear-react-components-ui/lib/form';
import * as validators from '@linear-front-end/infra/lib/fieldValidators';

const Campos = ({ inputFocusRef, t }) => (
  <Fieldset title={t('commons:labels.dadosBasicos')}>
    <Field
      component={TextField}
      name=<campo>
      label={t('commons:labels.<campoDescritivo>')}
      gridLayout="12 12 12 12"
      required
      inputRef={inputFocusRef}
      validators={[<validators>]} />
  </Fieldset>
);

Campos.propTypes = {
  inputFocusRef: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Campos;
