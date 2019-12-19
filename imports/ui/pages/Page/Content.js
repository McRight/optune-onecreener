// React
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

// API
import { ContentType } from '/imports/api'

// Styles
import { ColorHarlequin, ColorHaiti } from '../../styles/color'

// Atoms
import { Button } from '../../components/atoms/buttons/Button'
import { Input } from '../../components/atoms/forms/Input'
import { BigText } from '../../components/atoms/text/BigText'
import { MediumText } from '../../components/atoms/text/MediumText'
import { SubTitle } from '../../components/atoms/text/SubTitle'

import { Page } from '../../components/atoms/layout/Page'
import { Row } from '../../components/atoms/layout/Row'

// Molecules
import { ButtonBar } from '../../components/molecules/forms/ButtonBar'

// GraphQL
import { CHANGE_CONTENT } from '../../graphql/mutations'
import { PAGE } from '../../graphql/queries'

import { withQuery } from '../../mixins/withQuery'

const ContentButton = styled(Button)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin: 0.2rem auto;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;

  &:hover:not([disabled]) {
    color: ${ColorHarlequin};
    background-color: ${ColorHaiti};
  }
`
const ContentText = styled.p`
  flex-grow: 1;
  font-size: 1.2rem;
  text-align: left;
`

const ContentTypes = [ContentType.TEXT, ContentType.NONE]

const getContentItems = t => ({
  [ContentType.TEXT]: { text: t('page.content.type.options.text') },
  [ContentType.NONE]: { text: t('page.content.type.options.none') },
})

const Content = ({ page, navigate }) => {
  const { t } = useTranslation()

  const { content } = page || {
    content: { title: '', text: '', type: ContentType.NONE },
  }

  const [text, setText] = useState(content.text || '')
  const [title, setTitle] = useState(content.title || '')
  const [contentType, setContentType] = useState(content.type)

  const dirty =
    text !== content.text ||
    title !== content.title ||
    contentType !== content.type

  const contentItems = getContentItems(t)
  const activeContentItem = contentItems[contentType]

  return (
    <Page>
      <SubTitle>{t('page.subtitle')}</SubTitle>

      <Row>
        <BigText>{t('page.title')}</BigText>
        {ContentTypes.map((type, key) => (
          <ContentButton
            shadow
            secondary={type !== contentType}
            key={key}
            onClick={() => setContentType(type)}
          >
            <ContentText>{contentItems[type].text}</ContentText>
          </ContentButton>
        ))}
      </Row>

      <Row>
        <MediumText>{t('page.content.title.label')}</MediumText>
        <Input value={title} onChange={e => setTitle(e.target.value)} />
      </Row>

      <Row>
        <MediumText>{t('page.content.text.label')}</MediumText>
        <Input value={text} onChange={e => setText(e.target.value)} />
      </Row>

      <ButtonBar
        dirty={dirty}
        mutation={CHANGE_CONTENT}
        navLink="/logo"
        navText="Edit Logo"
        onSave={save =>
          save({
            text,
            title,
            type: contentType,
          })
        }
        refetchQuery={PAGE}
        saveText={t('page.content.save')}
      />
    </Page>
  )
}

export default withQuery(PAGE)(Content)
