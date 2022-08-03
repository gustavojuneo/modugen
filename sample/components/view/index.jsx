import React from 'react';
import PropTypes from 'prop-types';
import SpinnerLoading from 'linear-react-components-ui/lib/spinner';
import Drawer, { DrawerHeader, DrawerContent } from 'linear-react-components-ui/lib/drawer';
import Panel, { PanelHeader, PanelContent } from 'linear-react-components-ui/lib/panel';
import _ from 'lodash';
import TabBasicos from './TabBasicos';
import ActionBar from './ActionBar';
import { TAB_PAGE_<SAMPLE_PLURAL_CONST>, PERMISSAO_<SAMPLE_PLURAL_CONST> } from '../../constants';

const View = ({
  handlerFecharVisualizacao,
  t,
  apiRecuperando,
  <sampleSingle>Corrente,
  formModalAberto,
}) => (
  <Drawer
    position="right"
    style={{ width: '70%' }}
    closeOnEsc={!formModalAberto}
    handlerClose={() => { handlerFecharVisualizacao(); }}
    targetId={TAB_PAGE_<SAMPLE_PLURAL_CONST>}
    skeletonize={apiRecuperando}
    permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.VISUALIZAR, onDenied: 'hideContent' }}>
    <DrawerHeader
      title={`${<sampleSingle>Corrente.<campoDescritivo>}`}
      closeOnEsc={!formModalAberto}
      handlerClose={() => { handlerFecharVisualizacao(); }} />
    <DrawerContent>
      <Panel style={{ height: 'auto' }}>
        <PanelHeader title={t('commons:labels.dadosBasicos')}>
          <ActionBar />
        </PanelHeader>
        <PanelContent>
          {TabBasicos(apiRecuperando, <sampleSingle>Corrente, t)}
        </PanelContent>
      </Panel>
    </DrawerContent>
  </Drawer>
);

View.propTypes = {
  handlerFecharVisualizacao: PropTypes.func.isRequired,
  apiRecuperando: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  <sampleSingle>Corrente: PropTypes.object.isRequired,
  formModalAberto: PropTypes.bool,
};

View.defaultProps = {
  formModalAberto: false,
};

export default View;
