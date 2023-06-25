import{toast, ToastContainer} from "react-toastify";
import styled from "styled-components";
import Form from "./components/Form";
import GlobalStyle from "./styles/global"
import "react-toastify/dist/ReactToastify.css";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;
function App() { 
  
  //const[onEdit,setOnEdit] = useState(null);//variavel para edicao


  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/person");
        setPeople(response.data);
        console.log("dADOS: ",response.data);
        
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Container>
        <Title>Usuários</Title>
        <Form></Form>
        <Grid people = {people}></Grid>
      </Container>
     <ToastContainer autoClose={3001} position={toast.POSITION.BOTTOM_LEFT}/>
     <GlobalStyle/>
    </div>
  );
}

export default App;
