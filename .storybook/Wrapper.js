import React, { Fragment } from 'react'
import { compose, withState } from 'recompose'
import PropTypes from 'prop-types'
import StoryRouter from 'storybook-router'
import styled, { ThemeProvider } from 'styled-components'
import { palette } from 'styled-theme'

import '../shared/components/globalStyles'
import theme from '../shared/components/theme'
import Button from '../shared/components/atoms/Button'

const Baseline = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: 1px 24px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 119, 179, 0.4) 0px,
    rgba(0, 119, 179, 0.4) 1px,
    transparent 1px
  );
  z-index: 9999;
  pointer-events: none;

  &:before {
    position: absolute;
    top: 16px;
    left: 0;
    content: '24px';
    font-size: 8px;
    line-height: 8px;
    color: ${palette('grayscale', 3)};
  }
`

const OneThirdBaseline = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 8px;
  left: 0;
  background-size: 1px 24px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 119, 179, 0.15) 0px,
    rgba(0, 119, 179, 0.15) 1px,
    transparent 1px
  );
  z-index: 9999;
  pointer-events: none;

  &:before {
    position: absolute;
    top: -8px;
    left: 0;
    content: '8px';
    font-size: 8px;
    line-height: 8px;
    color: ${palette('grayscale', 3)};
  }
`

const TwoThirdsBaseline = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 16px;
  left: 0;
  background-size: 1px 24px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 119, 179, 0.15) 0px,
    rgba(0, 119, 179, 0.15) 1px,
    transparent 1px
  );
  z-index: 9999;
  pointer-events: none;

  &:before {
    position: absolute;
    top: -8px;
    left: 0;
    content: '16px';
    font-size: 8px;
    line-height: 8px;
    color: ${palette('grayscale', 3)};
  }
`

const BaselineButton = styled(Button)`
  line-height: 22px;
  padding: 0 16px;
  margin: 0 24px 24px;
  font-size: 12px;
  color: #212121;
  background-color: #bdbdbd;

  &:hover,
  &:focus {
    background-color: #9e9e9e;
  }
`

const Wrapper = ({ showBaseline, setBaselineVisibility, children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <BaselineButton onClick={() => setBaselineVisibility(!showBaseline)}>
        Toggle Baseline
      </BaselineButton>

      {showBaseline && (
        <Fragment>
          <Baseline />
          <OneThirdBaseline />
          <TwoThirdsBaseline />
        </Fragment>
      )}

      <div style={{ marginLeft: '24px' }}>{children}</div>
    </Fragment>
  </ThemeProvider>
)

Wrapper.propTypes = {
  children: PropTypes.any.isRequired,
}

const enhance = compose(
  withState('showBaseline', 'setBaselineVisibility', true),
)

export default enhance(Wrapper)
