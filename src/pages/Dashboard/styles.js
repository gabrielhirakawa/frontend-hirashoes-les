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

    button{
        margin-top: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
    }

    h1{
        margin-bottom: 20px;
    }
    
`

export const Cards = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    a{
        text-decoration: none;
    }
`;

export const CardItem = styled.div`
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    height: 180px;
    width: 180px;
    border-radius: 4px;
    color: #1b262c;
    cursor: pointer;

    span{
        margin-top: 10px;
        font-weight: bold;
    }

    &:hover{
        background-color:  #27496d;
        svg{
            color: #fff;
        }
        span{
            color: #fff;
        }
    }
`;
