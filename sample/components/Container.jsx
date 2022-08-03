import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DialogQuestion } from 'linear-react-components-ui/lib/dialog';
import Panel, { PanelContent } from 'linear-react-components-ui/lib/panel';
import { translate } from 'react-i18next';
import {
  apiEstaPesquisando, OPERACOES_UI, uiEstaEditandoOuAdicionando, uiEstaDeletando, uiEstaEditando,
  apiEstaDeletando, apiEstaRecuperando, uiEstaRestaurando, apiEstaRestaurando, apiEstaSalvando,
} from '@linear-front-end/infra/lib/operationsCRUDHelpers';
import * as actions from '../actions';
import * as selectors from '../selectors';
import Form from './form';
import ActionBar from './ActionBar';
import Lista from './list';
import View from './view';
import {
  <SamplePlural>Context, CRITERIOS_FILTRO, PERMISSAO_<SAMPLE_PLURAL_CONST>,
} from '../constants';

const maxPaginacao = process.env.REACT_APP_MAXIMO_PAGINACAO;
const Container = (props) => {
    const [operacaoUi, setOperacaoUi] = useState(null);
    const [visualizando, setVisualizando] = useState(false);
    const [criteriosFiltro, setCriteriosFiltro] = useState(
    JSON.parse(JSON.stringify(CRITERIOS_FILTRO)),
    );
    const [fimPaginacao, setFimPaginacao] = useState(false);
    const [idSelecionado, setIdSelecionado] = useState(undefined);
    const {
      pesquisar<SamplePlural>,
      <samplePlural>Paginacao,
      <sampleSingle>Corrente,
      recuperar<SampleSingle>,
      criar<SampleSingle>,
      atualizar<SampleSingle>,
      deletar<SampleSingle>,
      restaurar<SampleSingle>,
      limparInconsistencias<SamplePlural>,
      t,
      operacaoApi,
    } = props;
  const apiPesquisando = apiEstaPesquisando(operacaoApi);
  const uiEditando = uiEstaEditando(operacaoUi);
  const uiDeletando = uiEstaDeletando(operacaoUi);
  const uiRestaurando = uiEstaRestaurando(operacaoUi);

  const pesquisar = (filtros = CRITERIOS_FILTRO, proximaPagina = false) => {
    const condicoes = {
      ...filtros,
      pagination: {
        pageSize: process.env.REACT_APP_TAMANHO_PADRAO_PAGINA,
        pageIndex: proximaPagina ? <samplePlural>Paginacao.pageIndex + 1 : 0,
      },
    };
    setFimPaginacao(false);
    pesquisar<SamplePlural>(condicoes);
  };

  const pesquisarProximaPagina = () => {
    const {hasNextPage, pageIndex} = <SamplePlural>Paginacao;

    if (hasNextPage && pageIndex + 1 < maxPaginacao && !apiPesquisando) {
      pesquisar(criteriosFiltro, true);
    } else if (hasNextPage && pageIndex + 1 >= maxPaginacao) {
      setFimPaginacao(true);
    }
  };

  useEffect(() => {
    pesquisar();
  }, []);

  const fecharModal = () => {
    setOperacaoUi(null);
    limparInconsistencias<SamplePlural>();
  };

  const fecharDrawer = () => {
    setVisualizando(false);
  };

  const editar = (id) => {
    recuperar<SamplePlural>(id);
    setOperacaoUi(OPERACOES_UI.EDITANDO);
  };

  const salvar = (data) => {
    const action = uiEditando ? atualizar<SampleSingle> : criar<SampleSingle>;
    action(data, <sampleSingle>Corrente.id).then(() => {
      fecharModal();
    });
  };

  const deletar = (id) => {
    setIdSelecionado(id);
    setOperacaoUi(OPERACOES_UI.DELETANDO);
  };

  const deletando<SamplePlural> = () => {
    const action = uiDeletando && deletar<SampleSingle>;
    action(idSelecionado).then(() => {
      fecharDrawer();
    });
  };

  const restaurar = (id) => {
    setIdSelecionado(id);
    setOperacaoUi(OPERACOES_UI.RESTAURANDO);
  };

  const restaurando<SamplePlural> = () => {
    const action = uiRestaurando && restaurar<SampleSingle>;
    action(idSelecionado, criteriosFiltro).then(() => {
      fecharDrawer();
    });
  };

  const visualizar = (event, id) => {
    recuperar<SampleSingle>(id, true);
    setVisualizando(true);
  };

  const getContextValues = () => ({
    ...props,
    criteriosFiltro,
    idSelecionado,
    fimPaginacao,
    handlerPesquisar: filtros => pesquisar(filtros),
    handlerAdicionar: () => {setOperacaoUi(OPERACOES_UI.ADICIONANDO); setVisualizando(false); },
    handlerVisualizar: visualizar,
    handlerDeletar: deletar,
    handlerEditar: editar,
    handlerSalvar: salvar,
    handlerRestaurar: restaurar,
    handlerFecharModal: fecharModal,
    formModalAberto: uiEstaEditandoOuAdicionando(operacaoUi),
    handlerFecharVisualizacao: () => setVisualizando(false),
    handlerLimparCriteriosFiltro: () => {
    setCriteriosFiltro(JSON.parse(JSON.stringify(CRITERIOS_FILTRO)));
    },
    apiRecuperando: apiEstaRecuperando(operacaoApi),
    apiSalvando: apiEstaSalvando(operacaoApi),
    apiPesquisando,
    uiEditando,
  });

  const contextValues = getContextValues();
  return (
  <<SamplePlural>Context.Provider value={contextValues}>
    <ActionBar />
    <Panel
      customClass="panel-scroll"
      onEndReached={() => pesquisarProximaPagina()}
      onEndReachedThreshold={0.1}
      permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.PESQUISAR, onDenied: 'hideContent' }}>
      <PanelContent customClass="panelcontentscroll">
        <Lista />
      </PanelContent>
    </Panel>
    {uiEstaEditandoOuAdicionando(operacaoUi) && <Form />}
    {visualizando && <View {...contextValues} t={t} />}
    <DialogQuestion
      width="600px"
      title={t('commons:mensagensExclusao.dialogExclusaoTitulo')}
      text={t('commons:mensagensExclusao.perguntaExclusao')}
      visible={uiEstaDeletando(operacaoUi) || apiEstaDeletando(operacaoApi)}
      isWaiting={apiEstaDeletando(operacaoApi)}
      onConfirmClick={() => {
        deletando<SampleSingle>();
        setOperacaoUi(null);
      }}
      onUnconfirmClick={() => { setOperacaoUi(null); }} />
    <DialogQuestion
      width="600px"
      title={t('commons:mensagensRestauracao.dialogTitulo')}
      text={t('commons:mensagensRestauracao.pergunta')}
      visible={uiEstaRestaurando(operacaoUi) || apiEstaRestaurando(operacaoApi)}
      isWaiting={apiEstaRestaurando(operacaoApi)}
      onConfirmClick={() => {
        restaurando<SampleSingle>();
        setOperacaoUi(null);
      }}
      onUnconfirmClick={() => { setOperacaoUi(null); }} />
  </<SamplePlural>Context.Provider>
  );
};

  const mapStateToProps = state => ({
    <samplePlural>: selectors.obter<SamplePlural>(state),
    <samplePlural>Paginacao: selectors.obter<SamplePlural>Paginacao(state),
    <sampleSingle>Corrente: selectors.obter<SampleSingle>Corrente(state),
    operacaoApi: selectors.obterOperacaoApi(state),
    errosCampos: selectors.obterErrosCampos(state),
  });

  Container.propTypes = {
    pesquisar<SamplePlural>: PropTypes.func.isRequired,
    recuperar<SampleSingle>: PropTypes.func.isRequired,
    criar<SampleSingle>: PropTypes.func.isRequired,
    atualizar<SampleSingle>: PropTypes.func.isRequired,
    deletar<SampleSingle>: PropTypes.func.isRequired,
    restaurar<SampleSingle>: PropTypes.func.isRequired,
    limparInconsistencias<SamplePlural>: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    <samplePlural>Paginacao: PropTypes.object.isRequired,
    <sampleSingle>Corrente: PropTypes.object.isRequired,
    operacaoApi: PropTypes.string,
  };

  Container.defaultProps = {
  operacaoApi: null,
};

  const connectRedux = connect(mapStateToProps, {...actions});
  export default connectRedux(translate(['common', '<i18nNamespace>'])(Container));
