import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;

  background-color: #003399;
`;

export const Title = styled.Text`
  color: white;
  font-size: 20px;
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: "white",
}))``;
