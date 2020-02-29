import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1b262c;
  
  height: 100vh;
  a{
      text-decoration: none;
  }
  
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: #fff;
  font-weight: bold;
  margin: 20px;

  &:hover{
      color: #0c7b93;
  }
`;
