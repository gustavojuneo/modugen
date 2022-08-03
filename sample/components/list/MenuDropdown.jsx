import React from 'react';
import PropTypes from 'prop-types';
import Button from 'linear-react-components-ui/lib/buttons';
import List, { ListItem } from 'linear-react-components-ui/lib/list';
import { statusEhAtivo, statusEhExcluido } from '@linear-front-end/infra/lib/statusHelpers';
import { PERMISSAO_<SAMPLE_PLURAL_CONST> } from '../../constants';

const MenuDropdown = ({ t, <sampleSingle>, handlerEditar, handlerDeletar, handlerRestaurar }) => (
  <Button
    dropdown
    dropdownAlign="right"
    size="mini"
    showIconDropdown={false}
    iconName="menu"
    shadow={false}>
    <List condensed>
      <ListItem
        text={t('commons:buttons.editar')}
        leftIconName="pencil"
        onClick={() => { handlerEditar(<sampleSingle>.id); }}
        visible={statusEhAtivo({ ...<sampleSingle> })}
        permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.ALTERAR, onDenied: 'disabled' }} />
      <ListItem
        text={t('commons:buttons.excluir')}
        leftIconName="bin"
        onClick={() => { handlerDeletar(<sampleSingle>.id); }}
        visible={statusEhAtivo({ ...<sampleSingle> })}
        permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.EXCLUIR, onDenied: 'disabled' }} />
      <ListItem
        text={t('commons:buttons.restaurar')}
        leftIconName="undo"
        onClick={() => { handlerRestaurar(<sampleSingle>.id); }}
        visible={statusEhExcluido({ ...<sampleSingle> })}
        permissionAttr={{ ...PERMISSAO_<SAMPLE_PLURAL_CONST>.RESTAURAR, onDenied: 'disabled' }} />
    </List>
  </Button>
);

MenuDropdown.propTypes = {
  t: PropTypes.func.isRequired,
  <sampleSingle>: PropTypes.object.isRequired,
  handlerEditar: PropTypes.func.isRequired,
  handlerDeletar: PropTypes.func.isRequired,
  handlerRestaurar: PropTypes.func.isRequired,
};

export default MenuDropdown;
