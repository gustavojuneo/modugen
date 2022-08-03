import _ from 'lodash';
import { createSelector } from 'reselect';
import * as constants from './constants';

export const obter<SamplePlural> = createSelector(
  state => state[constants.NAME].itens,
  itens => _.orderBy(_.map(itens, item => item), [<campoOrdem>], ['asc']),
);
export const obter<SamplePlural>Paginacao = state => state[constants.NAME].paginacao;
export const obter<SampleSingle>Corrente = state => state[constants.NAME].corrente;
export const obterOperacaoApi = state => state[constants.NAME].operacaoApi;
export const obterErrosCampos = state => state[constants.NAME].errosCampos;
