import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
`;

export const ProductList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 1200px;
  margin-top: 50px;
  margin-bottom: 100px;

  li{
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    list-style: none;
    background-color: #fff;
    margin: 10px 20px;

    a{
      text-decoration: none;
      color: #fff;
      
    }

    img{
      max-width: 250px;
      border-radius: 4px;
      border-bottom: 1px solid #c1c1c1;
      margin-bottom: 5px;
    }
    
    span, strong{
      color: #1b262c;
      align-self: center;
    }


    button{
      width: 100%;
      margin-top: 10px;
      border: none;
      padding: 10px 20px;
      color: #fff;
      background-color: #27496d;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      &:hover{
        background-color: #0c7b93;
    }
    }
  }
`;
