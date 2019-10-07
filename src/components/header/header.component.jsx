import React from 'react';
import { connect } from 'react-redux'

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/football.svg';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = ({ currentUser }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/about'>
        ABOUT
      </OptionLink>
      <OptionLink to='/results'>
        RESULTS
      </OptionLink>
      {currentUser && (
      <OptionLink to='/my-predictions'>
        MY PREDICTIONS
      </OptionLink> )}
      {currentUser && (
      <OptionLink to='/profile'>
        PROFILE
      </OptionLink> )}
      {currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink className='option' to='/signin'>
          SIGN IN
        </OptionLink>
      )}
    </OptionsContainer>
  </HeaderContainer>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);