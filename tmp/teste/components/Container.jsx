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
  gruposFamiliasContext, CRITERIOS_FILTRO, PERMISSAO_Testando3,
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
      pesquisargruposFamilias,
      TestePaginacao,
      testando2Corrente,
      recuperarTestand,
      criarTestand,
      atualizarTestand,
      deletarTestand,
      restaurarTestand,
      limparInconsistenciasgruposFamilias,
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
        pageIndex: proximaPagina ? TestePaginacao.pageIndex + 1 : 0,
      },
    };
    setFimPaginacao(false);
    pesquisargruposFamilias(condicoes);
  };

  const pesquisarProximaPagina = () => {
    const {hasNextPage, pageIndex} = gruposFamiliasPaginacao;

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
    limparInconsistenciasgruposFamilias();
  };

  const fecharDrawer = () => {
    setVisualizando(false);
  };

  const editar = (id) => {
    recuperargruposFamilias(id);
    setOperacaoUi(OPERACOES_UI.EDITANDO);
  };

  const salvar = (data) => {
    const action = uiEditando ? atualizarTestand : criarTestand;
    action(data, testando2Corrente.id).then(() => {
      fecharModal();
    });
  };

  const deletar = (id) => {
    setIdSelecionado(id);
    setOperacaoUi(OPERACOES_UI.DELETANDO);
  };

  const deletandogruposFamilias = () => {
    const action = uiDeletando && deletarTestand;
    action(idSelecionado).then(() => {
      fecharDrawer();
    });
  };

  const restaurar = (id) => {
    setIdSelecionado(id);
    setOperacaoUi(OPERACOES_UI.RESTAURANDO);
  };

  const restaurandogruposFamilias = () => {
    const action = uiRestaurando && restaurarTestand;
    action(idSelecionado, criteriosFiltro).then(() => {
      fecharDrawer();
    });
  };

  const visualizar = (event, id) => {
    recuperarTestand(id, true);
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
  <gruposFamiliasContext.Provider value={contextValues}>
    <ActionBar />
    <Panel
      customClass="panel-scroll"
      onEndReached={() => pesquisarProximaPagina()}
      onEndReachedThreshold={0.1}
      permissionAttr={{ ...PERMISSAO_Testando3.PESQUISAR, onDenied: 'hideContent' }}>
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
        deletandoTestand();
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
        restaurandoTestand();
        setOperacaoUi(null);
      }}
      onUnconfirmClick={() => { setOperacaoUi(null); }} />
  </gruposFamiliasContext.Provider>
  );
};

  const mapStateToProps = state => ({
    Teste: selectors.obtergruposFamilias(state),
    TestePaginacao: selectors.obtergruposFamiliasPaginacao(state),
    testando2Corrente: selectors.obterTestandCorrente(state),
    operacaoApi: selectors.obterOperacaoApi(state),
    errosCampos: selectors.obterErrosCampos(state),
  });

  Container.propTypes = {
    pesquisargruposFamilias: PropTypes.func.isRequired,
    recuperarTestand: PropTypes.func.isRequired,
    criarTestand: PropTypes.func.isRequired,
    atualizarTestand: PropTypes.func.isRequired,
    deletarTestand: PropTypes.func.isRequired,
    restaurarTestand: PropTypes.func.isRequired,
    limparInconsistenciasgruposFamilias: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    TestePaginacao: PropTypes.object.isRequired,
    testando2Corrente: PropTypes.object.isRequired,
    operacaoApi: PropTypes.string,
  };

  Container.defaultProps = {
  operacaoApi: null,
};

  const connectRedux = connect(mapStateToProps, {...actions});
  export default connectRedux(translate(['common', 'Testando7'])(Container));
