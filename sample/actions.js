import * as actionTypes from './actionTypes';
import { PERMISSAO_<SAMPLE_PLURAL_CONST> } from './constants';

export function pesquisar<SamplePlural>(data) {
  return {
    type: actionTypes.PESQUISAR_<SAMPLE_PLURAL_CONST>,
    payload: {
      request: {
        data,
        url: '<urlResourcePath>/pesquisa',
        method: 'POST',
      },
      feedbackMessages: {
        i18nNS: '<i18nNamespace>',
        success: false,
        modelKey: '<samplePlural>.model.one',
        action: 'search',
      },
      permissionAttr: PERMISSAO_<SAMPLE_PLURAL_CONST>.PESQUISAR,
    },
  };
}

export function recuperar<SampleSingle>(id, visualizacao = false) {
  return {
    type: actionTypes.RECUPERAR_<SAMPLE_SINGLE_CONST>,
    payload: {
      request: {
        url: `<urlResourcePath>/${id}`,
        method: 'GET',
      },
      feedbackMessages: {
        i18nNS: '<i18nNamespace>',
        success: false,
        modelKey: '<samplePlural>.model.one',
      },
      permissionAttr: visualizacao ? PERMISSAO_<SAMPLE_PLURAL_CONST>.VISUALIZAR : undefined,
    },
  };
}

export function criar<SampleSingle>(data) {
  return {
    type: actionTypes.CRIAR_<SAMPLE_SINGLE_CONST>,
    payload: {
      request: {
        data,
        url: '<urlResourcePath>',
        method: 'POST',
      },
      feedbackMessages: {
        i18nNS: '<i18nNamespace>',
        modelKey: '<samplePlural>.model.one',
      },
    },
  };
}

export function atualizar<SampleSingle>(data, id) {
  return {
    type: actionTypes.ATUALIZAR_<SAMPLE_SINGLE_CONST>,
    payload: {
      request: {
        data,
        url: `<urlResourcePath>/${id}`,
        method: 'PUT',
      },
      feedbackMessages: {
        i18nNS: '<i18nNamespace>',
        modelKey: '<samplePlural>.model.one',
      },
    },
  };
}

export function deletar<SampleSingle>(id) {
  return {
    type: actionTypes.DELETAR_<SAMPLE_SINGLE_CONST>,
    payload: {
      request: {
        url: `<urlResourcePath>/${id}`,
        method: 'DELETE',
      },
      feedbackMessages: {
        i18nNS: '<i18nNamespace>',
        modelKey: '<samplePlural>.model.one',
      },
    },
  };
}

export function restaurar<SampleSingle>(id, filtro) {
  return {
    type: actionTypes.RESTAURAR_<SAMPLE_SINGLE_CONST>,
    filtro,
    payload: {
      request: {
        url: `<urlResourcePath>/${id}/restaurar`,
        method: 'PUT',
      },
      feedbackMessages: {
        i18nNS: '<i18nNamespace>',
        modelKey: '<samplePlural>.model.one',
        action: 'restore',
      },
    },
  };
}

export function limparInconsistencias<SamplePlural>() {
  return {
    type: actionTypes.LIMPAR_INCONSISTENCIAS_<SAMPLE_PLURAL_CONST>
  };
}
