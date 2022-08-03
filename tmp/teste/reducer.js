import _ from 'lodash';
import { ocultarRegistroRestaurado } from '@linear-front-end/infra/lib/statusHelpers';
import { OPERACOES_API } from '@linear-front-end/infra/lib/operationsCRUDHelpers';
import * as actionTypes from './actionTypes';
import { INITIAL_REDUX_STATE } from './constants';

let result;
const Teste = (state = INITIAL_REDUX_STATE, action) => {
  switch (action.type) {
    case actionTypes.PESQUISAR_Testando3_REQUISICAO: {
      const { pageIndex } = action.payload.request.data.pagination;
      return {
        ...state,
        itens: pageIndex === 0 ? {} : state.itens,
        operacaoApi: OPERACOES_API.PESQUISANDO,
      };
    }
    case actionTypes.PESQUISAR_Testando3_SUCESSO: {
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

    case actionTypes.RECUPERAR_Testando4_REQUISICAO:
      return {
        ...state,
        operacaoApi: action.unauthorized ? null : OPERACOES_API.RECUPERANDO,
        corrente: {},
      };
    case actionTypes.RECUPERAR_Testando4_SUCESSO:
      return {
        ...state, operacaoApi: null, corrente: action.payload.data.content,
      };

    case actionTypes.CRIAR_Testando4_REQUISICAO:
    case actionTypes.ATUALIZAR_Testando4_REQUISICAO:
      return {
        ...state, operacaoApi: OPERACOES_API.SALVANDO,
      };
    case actionTypes.CRIAR_Testando4_SUCESSO:
    case actionTypes.ATUALIZAR_Testando4_SUCESSO:
      result = action.payload.data.content;
      return {
        ...state,
        itens: { ...state.itens, [result.id]: result },
        corrente: result,
        operacaoApi: null,
        errosCampos: {},
      };
    case actionTypes.CRIAR_Testando4_INCONSISTENCIAS:
    case actionTypes.ATUALIZAR_Testando4_INCONSISTENCIAS:
      return { ...state, errosCampos: action.errors };

    case actionTypes.DELETAR_Testando4_REQUISICAO:
      return { ...state, operacaoApi: OPERACOES_API.DELETANDO };

    case actionTypes.DELETAR_Testando4_SUCESSO:
      return {
        ...state, operacaoApi: null, itens: _.omit(state.itens, action.payload.data.content.id),
      };

    case actionTypes.RESTAURAR_Testando4_REQUISICAO:
      return { ...state, operacaoApi: OPERACOES_API.RESTAURANDO };
    case actionTypes.RESTAURAR_Testando4_SUCESSO: {
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

    case actionTypes.LIMPAR_INCONSISTENCIAS_Testando3:
      return { ...state, errosCampos: {} };

    case actionTypes.PESQUISAR_Testando3_ERRO:
    case actionTypes.RECUPERAR_Testando4_ERRO:
    case actionTypes.CRIAR_Testando4_ERRO:
    case actionTypes.ATUALIZAR_Testando4_ERRO:
    case actionTypes.DELETAR_Testando4_ERRO:
    case actionTypes.RESTAURAR_Testando4_ERRO:
      return {
        ...state,
        operacaoApi: null,
      };
    default:
      return state;
  }
};

export default Teste;
