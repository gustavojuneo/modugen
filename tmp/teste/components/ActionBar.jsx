import React from 'react';
import ToolBar, { ToolBarGroup, ButtonBar } from 'linear-react-components-ui/lib/toolbar';
import SearchField from 'linear-react-components-ui/lib/inputs/search';
import { OPCOES_STATUS } from '@linear-front-end/infra/lib/statusHelpers';
import _ from 'lodash';
import FormPesquisaAvancada from './pesquisa_avancada';
import {
  useFeatureContext, TAB_PAGE_Testando3, PERMISSAO_Testando3,
} from '../constants';

const pesquisargruposFamilias = _.debounce((condicao, func) => { func(condicao); }, 300);
const ActionBar = () => {
  const { t, handlerPesquisar, handlerAdicionar } = useFeatureContext();

  return (
    <ToolBar customClass="default-toolbar">
      <ToolBarGroup style={{ float: 'left', marginLeft: '5px' }}>
        <ButtonBar
          label={t('commons:buttons.add')}
          type="add"
          onClick={handlerAdicionar}
          size="medium"
          permissionAttr={{ ...PERMISSAO_Testando3.INCLUIR, onDenied: 'disabled' }} />
      </ToolBarGroup>
      <ToolBarGroup>
        <SearchField
          placeHolder={t('commons:labels.pesquisar')}
          onChange={(e) => {
            if (e.target.value.trim().length > 0 || e.target.value === '') {
              pesquisargruposFamilias(
                { descricao: e.target.value, status: [OPCOES_STATUS.ativo] },
                handlerPesquisar,
              );
            }
          }}
          onReset={() => handlerPesquisar()}
          permissionAttr={{ ...PERMISSAO_Testando3.PESQUISAR, onDenied: 'disabled' }}
          advancedFilterProps={{
            position: 'right',
            style: { width: 500 },
            closeOnEsc: true,
            headerTitle: t('commons:labels.pesquisaAvancada'),
            targetId: TAB_PAGE_Testando3,
            content: <FormPesquisaAvancada />,
          }} />
      </ToolBarGroup>
    </ToolBar>
  );
};

export default ActionBar;
