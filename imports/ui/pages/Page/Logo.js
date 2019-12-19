/* eslint-disable react/prop-types */

// React
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Atoms
import { Input } from '../../components/atoms/forms/Input';
import { BigText } from '../../components/atoms/text/BigText';
import { MediumText } from '../../components/atoms/text/MediumText';
import { SubTitle } from '../../components/atoms/text/SubTitle';

import { Page } from '../../components/atoms/layout/Page';
import { Row } from '../../components/atoms/layout/Row';

// Molecules
import { ButtonBar } from '../../components/molecules/forms/ButtonBar';

// GraphQL
import { CHANGE_LOGO } from '../../graphql/mutations';
import { PAGE } from '../../graphql/queries';

// Mixins
import { withQuery } from '../../mixins/withQuery';

const Logo = ({ page }) => {
  const { t } = useTranslation();
  const { logo } = page || { logo: { text: '' } };

  const [text, setText] = useState(logo.text);

  const dirty = text !== logo.text;

  return (
    <Page>
      <SubTitle>{t('page.subtitle')}</SubTitle>

      <Row>
        <BigText>{t('page.title')}</BigText>
      </Row>

      <Row>
        <MediumText>{t('page.logo.text.label')}</MediumText>
        <Input value={text} onChange={e => setText(e.target.value)} />
      </Row>

      <ButtonBar
        dirty={dirty}
        mutation={CHANGE_LOGO}
        navLink='/content'
        navText='Edit Content'
        onSave={save =>
          save({
            text
          })
        }
        refetchQuery={PAGE}
        saveText={t('page.logo.save')}
      />
    </Page>
  );
};

export default withQuery(PAGE)(Logo);
