import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'linear-react-components-ui/lib/inputs/select';
import TextField from 'linear-react-components-ui/lib/inputs/text';
import { Field, FieldArray } from 'linear-react-components-ui/lib/form';
import { GridRow } from 'linear-react-components-ui/lib/gridlayout';
import { obterStatusDataSource } from '@linear-front-end/infra/lib/statusHelpers';

const Campos = ({ t, inputRef }) => (
  <GridRow>
    <Field
      component={TextField}
      label={t('commons:labels.<campoDescritivo>')}
      name=<campo>
      gridLayout="12 12 12 12"
      inputRef={inputRef} />
    <outrosCampos>
    <FieldArray
      component={SelectField}
      dataSource={obterStatusDataSource(t, true)}
      idKey="id"
      descriptionKey="name"
      label={t('commons:labels.status')}
      skipLabel
      name="status"
      valuePropName="value"
      changePropName="onSelect"
      multiple
      gridLayout="12 12 12 12"
      showClearButton={false} />
  </GridRow>
);

Campos.propTypes = {
  t: PropTypes.func.isRequired,
  inputRef: PropTypes.object.isRequired,
};

export default Campos;
