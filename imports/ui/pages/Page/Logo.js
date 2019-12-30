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
import PreviewText from '../../components/atoms/text/PreviewText';

import { Page } from '../../components/atoms/layout/Page';
import { Row } from '../../components/atoms/layout/Row';

// Molecules
import { ButtonBar } from '../../components/molecules/forms/ButtonBar';
import SettingsText from '../../components/molecules/logo/SettingsText';

// Settings
import { SketchPicker } from 'react-color';
import FontPicker from 'font-picker-react';
import reactCSS from 'reactcss';

// GraphQL
import { CHANGE_LOGO } from '../../graphql/mutations';
import { PAGE } from '../../graphql/queries';

// Mixins
import { withQuery } from '../../mixins/withQuery';

const Logo = ({ page }) => {
  const { t } = useTranslation();
  const { logo } = page || { logo: { text: '' } };

  const colors = logo.color.split(',').map(color => color.replace(/\D/g, ''));

  const [text, setText] = useState(logo.text);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [activeFontFamily, setActiveFontFamily] = useState(logo.font);
  const [chosenColor, setChosenColor] = useState({
    r: colors[0],
    g: colors[1],
    b: colors[2],
    a: colors[3]
  });

  const dirty =
    text !== logo.text ||
    activeFontFamily !== logo.font ||
    colors[0] !== chosenColor.r ||
    colors[1] !== chosenColor.g ||
    colors[2] !== chosenColor.b ||
    colors[3] !== chosenColor.a;

  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${chosenColor.r}, ${chosenColor.g}, ${chosenColor.b}, ${chosenColor.a})`
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }
  });

  handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  handleClose = () => {
    setDisplayColorPicker(false);
  };

  handleChange = color => {
    setChosenColor(color.rgb);
  };

  return (
    <Page>
      <SubTitle>{t('page.subtitle')}</SubTitle>

      <Row>
        <BigText>{t('page.title')}</BigText>
      </Row>

      <Row>
        <MediumText>{t('page.logo.text.label')}</MediumText>
        <Input
          value={text}
          onChange={e => {
            console.log(chosenColor);
            setText(e.target.value);
          }}
        />
      </Row>

      <Row>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h4 style={{ marginRight: '15px' }}>Choose color: </h4>
            <div style={styles.swatch} onClick={handleClick}>
              <div style={styles.color} />
            </div>
            {displayColorPicker ? (
              <div style={styles.popover}>
                <div style={styles.cover} onClick={handleClose} />
                <SketchPicker color={chosenColor} onChange={handleChange} />
              </div>
            ) : null}
          </div>
          <div
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h4 style={{ marginRight: '15px' }}>Choose font: </h4>

            <FontPicker
              apiKey='AIzaSyC_d6J0k3jpYkvZl43Yyb3dugUNbfms4HU'
              activeFontFamily={activeFontFamily}
              onChange={nextFont => setActiveFontFamily(nextFont.family)}
              limit='80'
            />
          </div>
        </div>
      </Row>

      <Row>
        <MediumText>Preview</MediumText>
        <PreviewText chosenColor={chosenColor} text={text} />
      </Row>

      <ButtonBar
        dirty={dirty}
        mutation={CHANGE_LOGO}
        navLink='/content'
        navText='Edit Content'
        onSave={save =>
          save({
            text,
            color: `rgba(${chosenColor.r}, ${chosenColor.g}, ${chosenColor.b}, ${chosenColor.a})`,
            font: activeFontFamily
          })
        }
        refetchQuery={PAGE}
        saveText={t('page.logo.save')}
      />
    </Page>
  );
};

export default withQuery(PAGE)(Logo);
