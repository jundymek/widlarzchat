import React, { ReactElement } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const LoadingSpinnerWrapper = styled.View`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingSpinner = (): ReactElement => {
  return (
    <LoadingSpinnerWrapper>
      <ActivityIndicator size="large" />
    </LoadingSpinnerWrapper>
  );
};
