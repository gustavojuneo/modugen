import React, { Fragment } from 'react';
import Table, { THeader, TRow, TBody, Th, Td } from 'linear-react-components-ui/lib/table';
import SpinnerLoading from 'linear-react-components-ui/lib/spinner';
import SemDados from '@linear-front-end/commons/lib/semDados';
import PaginacaoFim from '@linear-front-end/commons/lib/paginacao_fim';
import ListaFim from '@linear-front-end/commons/lib/lista_fim';
import { obterLabelStatus } from '@linear-front-end/infra/lib/statusHelpers';
import { useFeatureContext } from '../../constants';
import MenuDropdown from './MenuDropdown';

const Lista = () => {
  const context = useFeatureContext();
  const {
    t, <samplePlural>, handlerVisualizar, fimPaginacao, apiPesquisando,
    <samplePlural>Paginacao: paginacao,
  } = context;
  const model = t('<i18nNamespace>:<samplePlural>.model.many');

  const exibirListaFim = () => (
    !paginacao.hasNextPage && !apiPesquisando && <samplePlural>.length > 0 &&
    paginacao.totalPages > 1
  );

  return (
    <Fragment>
      <Table
        bordered
        hovered
        headerColored
        condensed
        onColClick={(event, id) => handlerVisualizar(event, id)}
        skeletonize={apiPesquisando && <samplePlural>.length === 0}
        skeletonInHeader={<SkeletonInHeader>}
        skeletonInRows={<SkeletonInRows>}>
        <THeader>
          <TRow>
            <Th>{t('commons:labels.descricao')}</Th>
            <Th style={{ width: '200px' }} />
            <Th style={{ width: '100px' }}>*</Th>
          </TRow>
        </THeader>
        <TBody>
          {<samplePlural>.map(<sampleSingle> => (
            <TRow
              rowId={`<sampleSingle>-${<sampleSingle>.id}`}
              dataId={<sampleSingle>.id}
              key={`<sampleSingle>-${<sampleSingle>.id}`}>
              <Td>{<sampleSingle>.descricao}</Td>
              <Td>{obterLabelStatus({ ...<sampleSingle> })}</Td>
              <Td ignoreTableColClick displayContent="onRowHover" style={{ minWidth: '60px' }}>
                <MenuDropdown <sampleSingle>={<sampleSingle>} {...context} />
              </Td>
            </TRow>
          ))}
        </TBody>
      </Table>
      <SpinnerLoading
        text={t('commons:labels.carregando', { model })}
        heightAuto
        visible={apiPesquisando && <samplePlural>.length > 0} />
      <PaginacaoFim visivel={fimPaginacao} />
      <ListaFim visible={exibirListaFim()} />
      <SemDados
        title={t('commons:pesquisaVazia.titulo', { model })}
        info={t('commons:pesquisaVazia.info')}
        visible={!apiPesquisando && <samplePlural>.length === 0} />
    </Fragment>
  );
};

export default Lista;
