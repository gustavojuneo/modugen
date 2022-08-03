import React, { useContext } from 'react';
import { OPCOES_STATUS } from '@linear-front-end/infra/lib/statusHelpers';
import { montarPermissoes } from '@linear-front-end/infra/lib/permissionHelpers';
import { <PROJECT_MODULE_NAME> } from '@linear-front-end/infra/lib/projectModules';

export const NAME = '<samplePlural>';
export const TAB_PAGE_<SAMPLE_PLURAL_CONST> = 'TAB_PAGE_<SAMPLE_PLURAL_CONST>';
export const <SamplePlural>Context = React.createContext();
export const useFeatureContext = () => useContext(<SamplePlural>Context);

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

export const PERMISSAO_<SAMPLE_PLURAL_CONST> = montarPermissoes(
  <PROJECT_MODULE_NAME>, `${<PROJECT_MODULE_NAME>}_<PERMISSION_FEATURE>`,
);
