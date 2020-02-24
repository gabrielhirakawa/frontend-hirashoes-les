import styled from 'styled-components';

export const Container = styled.div`
  /* margin-top: 50px; */
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

export const Product = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    border-radius: 4px;
    background-color: #fff;
    width: 750px;

    img{
        height: 400px;
        border: solid 1px #c1c1c1;
        margin-right: 15px;
    }
`;

export const ProductOptions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #1b262c;

    button{
        margin-top: 20px;
        padding: 10px;
        border: none;
        border-radius: 4px;
        color: #fff;
        background-color: #27496d;

    }

    span{
        margin-top: 20px;
        font-size: 24px;
    }
`; 

export const Tamanho = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border: 1px solid #c1c1c1;
    margin-top: 20px;

    label{
        margin: 10px;
        font-size: 20px;
        padding: 5px;
        color: #fff;
        background-color: #c1c1c1;
        border-radius: 4px;
    }
`;