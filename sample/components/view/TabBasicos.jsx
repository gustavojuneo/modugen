import React from 'react';
import { formatDateTime } from 'linear-react-commons/lib/utils/datetime_format';
import Table, { TRow, TBody, Th, Td } from 'linear-react-components-ui/lib/table';

const fieldNameColumn = { width: '150px' };
const TabBasicos = (apiRecuperando, <sampleSingle>Corrente, t) => (
  <Table vertical condensed skeletonize={apiRecuperando}>
    <TBody>
      <TRow>
        <Th style={fieldNameColumn}>{t('commons:labels.<campoDescritivo>')}</Th>
        <Td>{<sampleSingle>Corrente.<campoDescritivo>}</Td>
      </TRow>
      <TRow>
        <Th style={fieldNameColumn}>{t('commons:labels.status')}</Th>
        <Td>{<sampleSingle>Corrente.statusEnum && <sampleSingle>Corrente.statusEnum.name}</Td>
      </TRow>
      <TRow>
        <Th style={fieldNameColumn}>{t('commons:labels.criadoEm')}</Th>
        <Td>{formatDateTime(<sampleSingle>Corrente.criadoEm)}</Td>
      </TRow>
      <TRow>
        <Th style={fieldNameColumn}>{t('commons:labels.alteradoEm')}</Th>
        <Td>{formatDateTime(<sampleSingle>Corrente.alteradoEm)}</Td>
      </TRow>
    </TBody>
  </Table>
);

export default TabBasicos;
