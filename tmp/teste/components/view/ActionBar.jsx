import React from 'react';
import ToolBar, { ToolBarGroup, ButtonBar } from 'linear-react-components-ui/lib/toolbar';
import { statusEhAtivo, statusEhExcluido } from '@linear-front-end/infra/lib/statusHelpers';
import { useFeatureContext, PERMISSAO_Testando3 } from '../../constants';

const ActionBar = () => {
  const {
    testando2Corrente, handlerEditar, t, handlerDeletar, handlerRestaurar, apiRecuperando,
  } = useFeatureContext();
  return (
    <ToolBar style={{ marginBottom: '5px' }} skeletonize={apiRecuperando}>
      <ToolBarGroup>
        <ButtonBar
          label={t('commons:buttons.editar')}
          type="edit"
          size="medium"
          onClick={() => { handlerEditar(testando2Corrente.id); }}
          visible={
            apiRecuperando || (!apiRecuperando && statusEhAtivo({ ...testando2Corrente }))
          }
          disabled={apiRecuperando}
          permissionAttr={{ ...PERMISSAO_Testando3.ALTERAR, onDenied: 'disabled' }} />
        <ButtonBar
          label={t('commons:buttons.excluir')}
          type="destroy"
          size="medium"
          onClick={() => { handlerDeletar(testando2Corrente.id); }}
          visible={
            apiRecuperando || (!apiRecuperando && statusEhAtivo({ ...testando2Corrente }))
          }
          disabled={apiRecuperando}
          permissionAttr={{ ...PERMISSAO_Testando3.EXCLUIR, onDenied: 'disabled' }} />
        <ButtonBar
          label={t('commons:buttons.restaurar')}
          type="default"
          size="medium"
          iconName="undo"
          onClick={() => { handlerRestaurar(testando2Corrente.id); }}
          visible={
            apiRecuperando || (!apiRecuperando && statusEhExcluido({ ...testando2Corrente }))
          }
          disabled={apiRecuperando}
          permissionAttr={{ ...PERMISSAO_Testando3.RESTAURAR, onDenied: 'disabled' }} />
      </ToolBarGroup>
    </ToolBar>
  );
};

export default ActionBar;
