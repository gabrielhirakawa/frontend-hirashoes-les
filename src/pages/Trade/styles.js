import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    
    a {
      margin-top: 30px;
      color: #fff;
  }
    
`

export const FormTrade = styled.form`
    display: flex;
    flex-direction: column; 
    width: 100%;

  

    select, textarea, input, button{
        padding: 10px;
        margin: 10px 0;
        border-radius: 4px;
        border: none;
    }

    button{
        background-color: #27496d;
        color: #fff;
        font-weight: bold;

        &:hover{
            background-color: #0c7b93;
        }
    }
`;

