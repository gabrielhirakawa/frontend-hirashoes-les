import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body{
        /* background: linear-gradient(185deg, rgba(204,51,51,1) 0%, rgba(153,51,51,1) 100%); */
        background: #cc3333;
        -webkit-font-smoothing: antialiased;
        color: #fff;
    }
    body, input, button{
        font: 14px Roboto, sans-serif;
    }
    /* #root{
        max-width: 1020px;
        margin: 0 auto;
        padding: 0 20px 50px;
    } */
    button{
        cursor: pointer;
    }
`;
