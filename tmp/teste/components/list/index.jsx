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
    t, Teste, handlerVisualizar, fimPaginacao, apiPesquisando,
    TestePaginacao: paginacao,
  } = context;
  const model = t('Testando7:Teste.model.many');

  const exibirListaFim = () => (
    !paginacao.hasNextPage && !apiPesquisando && Teste.length > 0 &&
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
        skeletonize={apiPesquisando && Teste.length === 0}
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
          {Teste.map(testando2 => (
            <TRow
              rowId={`testando2-${testando2.id}`}
              dataId={testando2.id}
              key={`testando2-${testando2.id}`}>
              <Td>{testando2.descricao}</Td>
              <Td>{obterLabelStatus({ ...testando2 })}</Td>
              <Td ignoreTableColClick displayContent="onRowHover" style={{ minWidth: '60px' }}>
                <MenuDropdown testando2={testando2} {...context} />
              </Td>
            </TRow>
          ))}
        </TBody>
      </Table>
      <SpinnerLoading
        text={t('commons:labels.carregando', { model })}
        heightAuto
        visible={apiPesquisando && Teste.length > 0} />
      <PaginacaoFim visivel={fimPaginacao} />
      <ListaFim visible={exibirListaFim()} />
      <SemDados
        title={t('commons:pesquisaVazia.titulo', { model })}
        info={t('commons:pesquisaVazia.info')}
        visible={!apiPesquisando && Teste.length === 0} />
    </Fragment>
  );
};

export default Lista;
