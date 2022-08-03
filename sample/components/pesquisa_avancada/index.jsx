import React, { useEffect, useRef, useState } from 'react';
import Form from 'linear-react-components-ui/lib/form';
import Button, { SuccessButton, ButtonContainer } from 'linear-react-components-ui/lib/buttons';
import { useFeatureContext } from '../../constants';
import Campos from './Campos';

const FormPesquisaAvancada = () => {
  const [handlerSubmit, setHandlerSubmit] = useState(undefined);
  const inputRef = useRef(null);
  const context = useFeatureContext();
  const {
    t, criteriosFiltro, handlerPesquisar, handlerLimparCriteriosFiltro, apiPesquisando,
  } = context;

  useEffect(() => {
    setTimeout(() => {
      if (inputRef && inputRef.current) inputRef.current.focus();
    }, 200);
  }, []);

  const pesquisar = (filtros) => {
    handlerPesquisar(filtros);
  };

  return (
    <Form
      dataSource={criteriosFiltro}
      onSubmit={(jsonData) => { pesquisar(jsonData); }}
      handlerSubmit={(handler) => { setHandlerSubmit(() => handler); }}
      submitOnPressEnterKey>
      <Campos t={t} inputRef={inputRef} />
      <ButtonContainer style={{ marginTop: 20 }}>
        <SuccessButton
          style={{ marginLeft: 16 }}
          label={t('commons:labels.pesquisar')}
          isLoading={apiPesquisando}
          disabled={apiPesquisando}
          onClick={() => { handlerSubmit(); }} />
        <Button
          label={t('commons:labels.limparFiltros')}
          onClick={() => { handlerLimparCriteriosFiltro(); }} />
      </ButtonContainer>
    </Form>
  );
};

export default FormPesquisaAvancada;
