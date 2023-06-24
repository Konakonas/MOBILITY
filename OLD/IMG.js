import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import CustomFilterOptions from './CustomFilterOptions';

import myImg from '../assets/img/img1.jpg';

const ImgWrapperStyles = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ImageContainer = styled.View`
  width: 100%;
  max-width: 80%;
  height: 360px;
  margin: auto;
  margin-bottom: 4rem;
  box-shadow: 0 8px 15px #000;
  border: 1px solid #000;
  border-radius: 6px;
  overflow: hidden;
`;

const ImageWrapper = styled.Image`
  width: 100%;
  height: 100%;
  aspect-ratio: auto;
  border-radius: 6px;
`;

const ImgWrapper = ({ filterClass, openCustom, imgRef }) => {
  return (
    <ImgWrapperStyles>
      <ImageContainer>
        <ImageWrapper
          style={{ resizeMode: 'contain' }}
          source={myImg}
          ref={imgRef}
        />
      </ImageContainer>
      {openCustom && <CustomFilterOptions imgRef={imgRef} />}
    </ImgWrapperStyles>
  );
};

export default ImgWrapper;
