import React from 'react';
import ToolBar, { ToolBarGroup, ButtonBar } from 'linear-react-components-ui/lib/toolbar';
import { statusEhAtivo, statusEhExcluido } from '@linear-front-end/infra/lib/statusHelpers';
import { useFeatureContext, PERMISSAO_<SAMPLE_PLURAL_CONST> } from '../../constants';

const ActionBar = () => {
  const {
    <sampleSingle>Corrente, handlerEditar, t, handlerDeletar, handlerRestaurar, apiRecuperando,
  } = useFeatureContext();
  return (
    <ToolBar style={{ marginBottom: '5px' }} skeletonize={apiRecuperando}>
      <ToolBarGroup>
        <ButtonBar
          label={t('commons:buttons.editar')}
          type="edit"
          size="medium"
          onClick={() => { handlerEditar(<sampleSingle>Corrente.id); }}
          visible={
            apiRecuperando || (!apiRecuperando && statusEhAtivo({ ...<sampleSingle>Corrente }))
          }
          disabled={apiRecuperando}
          permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.ALTERAR, onDenied: 'disabled' }} />
        <ButtonBar
          label={t('commons:buttons.excluir')}
          type="destroy"
          size="medium"
          onClick={() => { handlerDeletar(<sampleSingle>Corrente.id); }}
          visible={
            apiRecuperando || (!apiRecuperando && statusEhAtivo({ ...<sampleSingle>Corrente }))
          }
          disabled={apiRecuperando}
          permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.EXCLUIR, onDenied: 'disabled' }} />
        <ButtonBar
          label={t('commons:buttons.restaurar')}
          type="default"
          size="medium"
          iconName="undo"
          onClick={() => { handlerRestaurar(<sampleSingle>Corrente.id); }}
          visible={
            apiRecuperando || (!apiRecuperando && statusEhExcluido({ ...<sampleSingle>Corrente }))
          }
          disabled={apiRecuperando}
          permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.RESTAURAR, onDenied: 'disabled' }} />
      </ToolBarGroup>
    </ToolBar>
  );
};

export default ActionBar;
