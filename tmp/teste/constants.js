import React, { useContext } from 'react';
import { OPCOES_STATUS } from '@linear-front-end/infra/lib/statusHelpers';
import { montarPermissoes } from '@linear-front-end/infra/lib/permissionHelpers';
import { Testando5 } from '@linear-front-end/infra/lib/projectModules';

export const NAME = 'Teste';
export const TAB_PAGE_Testando3 = 'TAB_PAGE_Testando3';
export const gruposFamiliasContext = React.createContext();
export const useFeatureContext = () => useContext(gruposFamiliasContext);

export const INITIAL_REDUX_STATE = {
  itens: {},
  corrente: {},
  paginacao: {},
  operacaoApi: null,
  errosCampos: {},
};

export const CRITERIOS_FILTRO = {
  descricao: '',
  status: [OPCOES_STATUS.ativo],
  <outrosCampos>
};

export const DEFAULT_FORM_DATA = {
  descricao: '',
  versao: 0,
  <outrosCampos>
};

export const PERMISSAO_Testando3 = montarPermissoes(
  Testando5, `${Testando5}_Testando6`,
);
