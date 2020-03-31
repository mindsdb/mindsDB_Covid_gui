import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Link } from 'gatsby'

import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { mq } from '@/components/layouts/utils/base'
import NavLinks from './NavLinks'
import { Colors } from '@/components/layouts/utils/theme'

const NavBarContainer = styled.header`
  z-index: 10000;
  background-color: ${Colors.white};
  height: 100px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0px -34px 22px 28px #807979;

  ${mq.md(css`
    height: 64px;
  `)}
`
const Container = styled.div`
  margin: 0px auto;
  max-width: 95%;
  padding: 10px 20px;
  padding-bottom: 10px;
  color: ${Colors.mirage};
  height: 100%;
`
const link = css`
  color: ${Colors.white};
  text-decoration: none;
  font-weight: 400;
  text-transform: lowercase;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  ${mq.md(css`
    margin-top: 5px;
    margin-bottom: 0px;
  `)}
`

const ImageContainer = styled.div`
  width: 150px;
`

const LogoImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}

const NavBar = (props) => {
  const {
    isMobPad,
    location,
  } = props

  return (
    <NavBarContainer>
      <Container>
        <Header>
          <ImageContainer>
            <Link to="/" css={link}>
              <LogoImage/>
            </Link>
          </ImageContainer>
          {
            !isMobPad
              ? <NavLinks location={location} />
              : null
          }

        </Header>
        {
          isMobPad 
            ? <NavLinks location={location} />
            : null
        }
      </Container>
    </NavBarContainer>
  )
}

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: ``,
}

const mapStateToProps = state => ({
  isMobPad: get(state, 'ui.isMobPad', false),
})

export default connect(mapStateToProps)(NavBar)