import React from 'react';

import { SketchPicker } from 'react-color';
import FontPicker from 'font-picker-react';
import reactCSS from 'reactcss';

export class SettingsText extends React.Component {
  state = {
    displayColorPicker: false,
    chosenColor: {
      r: '31',
      g: '153',
      b: '51',
      a: '1'
    },
    text: 'test txt',
    activeFontFamily: 'Open Sans'
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ chosenColor: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.chosenColor.r}, ${this.state.chosenColor.g}, ${this.state.chosenColor.b}, ${this.state.chosenColor.a})`
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

    return (
      <div style={{ display: 'flex' }}>
        <h4>Choose color: </h4>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.chosenColor}
              onChange={this.handleChange}
            />
          </div>
        ) : null}

        <h4>Choose font: </h4>

        <FontPicker
          apiKey='AIzaSyC_d6J0k3jpYkvZl43Yyb3dugUNbfms4HU'
          activeFontFamily={this.state.activeFontFamily}
          onChange={nextFont =>
            this.setState({
              activeFontFamily: nextFont.family
            })
          }
          limit='80'
        />
      </div>
    );
  }
}
