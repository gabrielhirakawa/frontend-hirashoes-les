import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;

    h1{
        margin-bottom: 20px;
    }
`;

export const MyCart = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    width: 750px;
    border-radius: 4px;
    color: #1b262c;

    a{
        align-self: flex-end;
    }
`;

export const Item = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    li{
        width: 100%;
        padding: 10px;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        border-bottom: 1px solid #c1c1c1;

        input{
            width: 60px;
        }
        img{
            height: 80px;
        }

    }
    
`;

export const Total = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonFinalizar = styled.button`
    border: none;
    color: #fff;
    padding: 10px 20px;
    background-color: #27496d;
    margin: 30px;

    &:hover{
        background-color:  #0c7b93;
    }
`;