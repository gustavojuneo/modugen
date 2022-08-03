import React from 'react';
import ToolBar, { ToolBarGroup, ButtonBar } from 'linear-react-components-ui/lib/toolbar';
import SearchField from 'linear-react-components-ui/lib/inputs/search';
import { OPCOES_STATUS } from '@linear-front-end/infra/lib/statusHelpers';
import _ from 'lodash';
import FormPesquisaAvancada from './pesquisa_avancada';
import {
  useFeatureContext, TAB_PAGE_<SAMPLE_PLURAL_CONST>, PERMISSAO_<SAMPLE_PLURAL_CONST>,
} from '../constants';

const pesquisar<SamplePlural> = _.debounce((condicao, func) => { func(condicao); }, 300);
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
          permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.INCLUIR, onDenied: 'disabled' }} />
      </ToolBarGroup>
      <ToolBarGroup>
        <SearchField
          placeHolder={t('commons:labels.pesquisar')}
          onChange={(e) => {
            if (e.target.value.trim().length > 0 || e.target.value === '') {
              pesquisar<SamplePlural>(
                { descricao: e.target.value, status: [OPCOES_STATUS.ativo] },
                handlerPesquisar,
              );
            }
          }}
          onReset={() => handlerPesquisar()}
          permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.PESQUISAR, onDenied: 'disabled' }}
          advancedFilterProps={{
            position: 'right',
            style: { width: 500 },
            closeOnEsc: true,
            headerTitle: t('commons:labels.pesquisaAvancada'),
            targetId: TAB_PAGE_<SAMPLE_PLURAL_CONST>,
            content: <FormPesquisaAvancada />,
          }} />
      </ToolBarGroup>
    </ToolBar>
  );
};

export default ActionBar;
