import * as actionTypes from './actionTypes';
import { PERMISSAO_Testando3 } from './constants';

export function pesquisargruposFamilias(data) {
  return {
    type: actionTypes.PESQUISAR_Testando3,
    payload: {
      request: {
        data,
        url: 'TEstaoidjsa908iu2/pesquisa',
        method: 'POST',
      },
      feedbackMessages: {
        i18nNS: 'Testando7',
        success: false,
        modelKey: 'Teste.model.one',
        action: 'search',
      },
      permissionAttr: PERMISSAO_Testando3.PESQUISAR,
    },
  };
}

export function recuperarTestand(id, visualizacao = false) {
  return {
    type: actionTypes.RECUPERAR_Testando4,
    payload: {
      request: {
        url: `TEstaoidjsa908iu2/${id}`,
        method: 'GET',
      },
      feedbackMessages: {
        i18nNS: 'Testando7',
        success: false,
        modelKey: 'Teste.model.one',
      },
      permissionAttr: visualizacao ? PERMISSAO_Testando3.VISUALIZAR : undefined,
    },
  };
}

export function criarTestand(data) {
  return {
    type: actionTypes.CRIAR_Testando4,
    payload: {
      request: {
        data,
        url: 'TEstaoidjsa908iu2',
        method: 'POST',
      },
      feedbackMessages: {
        i18nNS: 'Testando7',
        modelKey: 'Teste.model.one',
      },
    },
  };
}

export function atualizarTestand(data, id) {
  return {
    type: actionTypes.ATUALIZAR_Testando4,
    payload: {
      request: {
        data,
        url: `TEstaoidjsa908iu2/${id}`,
        method: 'PUT',
      },
      feedbackMessages: {
        i18nNS: 'Testando7',
        modelKey: 'Teste.model.one',
      },
    },
  };
}

export function deletarTestand(id) {
  return {
    type: actionTypes.DELETAR_Testando4,
    payload: {
      request: {
        url: `TEstaoidjsa908iu2/${id}`,
        method: 'DELETE',
      },
      feedbackMessages: {
        i18nNS: 'Testando7',
        modelKey: 'Teste.model.one',
      },
    },
  };
}

export function restaurarTestand(id, filtro) {
  return {
    type: actionTypes.RESTAURAR_Testando4,
    filtro,
    payload: {
      request: {
        url: `TEstaoidjsa908iu2/${id}/restaurar`,
        method: 'PUT',
      },
      feedbackMessages: {
        i18nNS: 'Testando7',
        modelKey: 'Teste.model.one',
        action: 'restore',
      },
    },
  };
}

export function limparInconsistenciasgruposFamilias() {
  return {
    type: actionTypes.LIMPAR_INCONSISTENCIAS_Testando3
  };
}
