import React from 'react';
import PropTypes from 'prop-types';
import Button from 'linear-react-components-ui/lib/buttons';
import List, { ListItem } from 'linear-react-components-ui/lib/list';
import { statusEhAtivo, statusEhExcluido } from '@linear-front-end/infra/lib/statusHelpers';
import { PERMISSAO_Testando3 } from '../../constants';

const MenuDropdown = ({ t, testando2, handlerEditar, handlerDeletar, handlerRestaurar }) => (
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
        onClick={() => { handlerEditar(testando2.id); }}
        visible={statusEhAtivo({ ...testando2 })}
        permissionAttr={{ ...PERMISSAO_Testando3.ALTERAR, onDenied: 'disabled' }} />
      <ListItem
        text={t('commons:buttons.excluir')}
        leftIconName="bin"
        onClick={() => { handlerDeletar(testando2.id); }}
        visible={statusEhAtivo({ ...testando2 })}
        permissionAttr={{ ...PERMISSAO_Testando3.EXCLUIR, onDenied: 'disabled' }} />
      <ListItem
        text={t('commons:buttons.restaurar')}
        leftIconName="undo"
        onClick={() => { handlerRestaurar(testando2.id); }}
        visible={statusEhExcluido({ ...testando2 })}
        permissionAttr={{ ...PERMISSAO_Testando3.RESTAURAR, onDenied: 'disabled' }} />
    </List>
  </Button>
);

MenuDropdown.propTypes = {
  t: PropTypes.func.isRequired,
  testando2: PropTypes.object.isRequired,
  handlerEditar: PropTypes.func.isRequired,
  handlerDeletar: PropTypes.func.isRequired,
  handlerRestaurar: PropTypes.func.isRequired,
};

export default MenuDropdown;
