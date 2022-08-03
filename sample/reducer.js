import _ from 'lodash';
import { ocultarRegistroRestaurado } from '@linear-front-end/infra/lib/statusHelpers';
import { OPERACOES_API } from '@linear-front-end/infra/lib/operationsCRUDHelpers';
import * as actionTypes from './actionTypes';
import { INITIAL_REDUX_STATE } from './constants';

let result;
const <samplePlural> = (state = INITIAL_REDUX_STATE, action) => {
  switch (action.type) {
    case actionTypes.PESQUISAR_<SAMPLE_PLURAL_CONST>_REQUISICAO: {
      const { pageIndex } = action.payload.request.data.pagination;
      return {
        ...state,
        itens: pageIndex === 0 ? {} : state.itens,
        operacaoApi: OPERACOES_API.PESQUISANDO,
      };
    }
    case actionTypes.PESQUISAR_<SAMPLE_PLURAL_CONST>_SUCESSO: {
      const { items, pagination } = action.payload.data.content;
      let itens = _.mapKeys(items, 'id');
      if (pagination.pageIndex > 0) itens = { ...state.itens, ...itens };

      return {
        ...state,
        operacaoApi: null,
        itens,
        paginacao: { ...state.paginacao, ...pagination },
      };
    }

    case actionTypes.RECUPERAR_<SAMPLE_SINGLE_CONST>_REQUISICAO:
      return {
        ...state,
        operacaoApi: action.unauthorized ? null : OPERACOES_API.RECUPERANDO,
        corrente: {},
      };
    case actionTypes.RECUPERAR_<SAMPLE_SINGLE_CONST>_SUCESSO:
      return {
        ...state, operacaoApi: null, corrente: action.payload.data.content,
      };

    case actionTypes.CRIAR_<SAMPLE_SINGLE_CONST>_REQUISICAO:
    case actionTypes.ATUALIZAR_<SAMPLE_SINGLE_CONST>_REQUISICAO:
      return {
        ...state, operacaoApi: OPERACOES_API.SALVANDO,
      };
    case actionTypes.CRIAR_<SAMPLE_SINGLE_CONST>_SUCESSO:
    case actionTypes.ATUALIZAR_<SAMPLE_SINGLE_CONST>_SUCESSO:
      result = action.payload.data.content;
      return {
        ...state,
        itens: { ...state.itens, [result.id]: result },
        corrente: result,
        operacaoApi: null,
        errosCampos: {},
      };
    case actionTypes.CRIAR_<SAMPLE_SINGLE_CONST>_INCONSISTENCIAS:
    case actionTypes.ATUALIZAR_<SAMPLE_SINGLE_CONST>_INCONSISTENCIAS:
      return { ...state, errosCampos: action.errors };

    case actionTypes.DELETAR_<SAMPLE_SINGLE_CONST>_REQUISICAO:
      return { ...state, operacaoApi: OPERACOES_API.DELETANDO };

    case actionTypes.DELETAR_<SAMPLE_SINGLE_CONST>_SUCESSO:
      return {
        ...state, operacaoApi: null, itens: _.omit(state.itens, action.payload.data.content.id),
      };

    case actionTypes.RESTAURAR_<SAMPLE_SINGLE_CONST>_REQUISICAO:
      return { ...state, operacaoApi: OPERACOES_API.RESTAURANDO };
    case actionTypes.RESTAURAR_<SAMPLE_SINGLE_CONST>_SUCESSO: {
      result = action.payload.data.content;
      if (ocultarRegistroRestaurado(action)) {
        return { ...state, operacaoApi: null, itens: _.omit(state.itens, result.id) };
      }
      return {
        ...state,
        operacaoApi: null,
        itens: { ...state.itens, [result.id]: result },
        corrente: result,
      };
    }

    case actionTypes.LIMPAR_INCONSISTENCIAS_<SAMPLE_PLURAL_CONST>:
      return { ...state, errosCampos: {} };

    case actionTypes.PESQUISAR_<SAMPLE_PLURAL_CONST>_ERRO:
    case actionTypes.RECUPERAR_<SAMPLE_SINGLE_CONST>_ERRO:
    case actionTypes.CRIAR_<SAMPLE_SINGLE_CONST>_ERRO:
    case actionTypes.ATUALIZAR_<SAMPLE_SINGLE_CONST>_ERRO:
    case actionTypes.DELETAR_<SAMPLE_SINGLE_CONST>_ERRO:
    case actionTypes.RESTAURAR_<SAMPLE_SINGLE_CONST>_ERRO:
      return {
        ...state,
        operacaoApi: null,
      };
    default:
      return state;
  }
};

export default <samplePlural>;
