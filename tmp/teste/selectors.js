import _ from 'lodash';
import { createSelector } from 'reselect';
import * as constants from './constants';

export const obtergruposFamilias = createSelector(
  state => state[constants.NAME].itens,
  itens => _.orderBy(_.map(itens, item => item), [<campoOrdem>], ['asc']),
);
export const obtergruposFamiliasPaginacao = state => state[constants.NAME].paginacao;
export const obterTestandCorrente = state => state[constants.NAME].corrente;
export const obterOperacaoApi = state => state[constants.NAME].operacaoApi;
export const obterErrosCampos = state => state[constants.NAME].errosCampos;
