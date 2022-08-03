import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import ModalForm from 'linear-react-components-ui/lib/dialog/form';
import { SaveButton, CancelButton } from 'linear-react-components-ui/lib/buttons';
import Form from 'linear-react-components-ui/lib/form';
import { useFeatureContext, DEFAULT_FORM_DATA } from '../../constants';
import Campos from './Campos';

const TestandForm = () => {
  const {
    testando2Corrente,
    handlerFecharModal,
    handlerSalvar,
    apiSalvando,
    apiRecuperando,
    uiEditando,
    t,
    errosCampos,
  } = useFeatureContext();

  const defaultData = uiEditando ? testando2Corrente : DEFAULT_FORM_DATA;
  const [data, setData] = useState(JSON.parse(JSON.stringify(defaultData)));
  const [formValido, setFormValido] = useState(uiEditando);
  const inputRef = useRef(null);
  const handlerSubmit = useRef(null);

  useEffect(() => {
    if (uiEditando) setData(JSON.parse(JSON.stringify(testando2Corrente)));
  }, [testando2Corrente]);

  useEffect(() => {
    if (inputRef && inputRef.current !== undefined) inputRef.current.focus();
  }, []);

  const salvarDados = (dados) => {
    const payload = uiEditando ? _.pick(dados, Object.keys(DEFAULT_FORM_DATA)) : dados;
    handlerSalvar(payload);
  };

  const obterTituloForm = () => {
    const key = `commons:formModalTitulo.${uiEditando ? 'alteracao' : 'inclusao'}`;
    return t(key, { model: t('Testando7:Teste.model.one') });
  };

  return (
    <ModalForm
      title={obterTituloForm()}
      width="600px"
      height="auto"
      handlerClose={() => { handlerFecharModal(); }}
      closeOnEsc={false}
      isWaiting={apiRecuperando}
      buttons={[
        <SaveButton
          key="botao-salvar"
          label={t('commons:buttons.salvar')}
          onClick={() => { handlerSubmit.current(); }}
          isLoading={apiSalvando}
          disabled={apiSalvando || !formValido} />,
        <CancelButton
          key="botao-cancelar"
          label={t('commons:buttons.cancelar')}
          onClick={() => { handlerFecharModal(); }}
          disabled={apiSalvando} />,
      ]}>
      <Form
        dataSource={data}
        externalFieldErrors={errosCampos}
        onSubmit={(jsonData) => { salvarDados(jsonData); }}
        handlerSubmit={(handler) => { handlerSubmit.current = () => { handler(); }; }}
        onValidateForm={(valido) => { setFormValido(valido); }}
        submitOnPressEnterKey={false}>
        <Campos inputFocusRef={(r) => { inputRef.current = r; }} t={t} />
      </Form>
    </ModalForm>
  );
};

export default TestandForm;
