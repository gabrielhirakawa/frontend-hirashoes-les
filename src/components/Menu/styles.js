import styled from 'styled-components';

export const Container = styled.div`
  /* background-color: #1b262c; */
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  

  ul{
        margin-right: 150px;
        display: flex;
        align-items: center;

        a{
            color: #cc3333;
            text-decoration: none;

            &:hover{
                color: #1b262c; 
            }
        }
        
        li{
            list-style-type: none;
            margin: 0 10px;
            font-weight: bold;
            text-transform: uppercase;
        }
    }
  
    

  img{
      height: 60px;
      margin-left: 150px;
  }
`;
