import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;
export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ people, setPeople, setOnEdit }) => {
  const handleEdit = async (person) => {
    try {
      const response = await axios.get(`http://localhost:3000/person/${person._id}`);
      const fullPerson = response.data;
      setOnEdit(fullPerson);
    } catch (error) {
      // Tratar erros ao buscar o usuário completo
      console.error(error);
    }
  };
  const handleDelete = async (_id) => {
    await axios
      .delete("http://localhost:3000/person/" + _id)
      .then(({ data }) => {
        const newArray = people.filter((person) => person.id !== _id);

        setPeople(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };
  return (
    <Table>
      <Thead>
        <Th>Id</Th>
        <Th>Nome</Th>
        <Th>Salário</Th>
        <Th>Aprovado</Th>
        <Th></Th>
        <Th></Th>
      </Thead>
      <Tbody>
        {people.map((person) => (
          <Tr key={person._id}>

            <Td width="30%">{person.name}</Td>
            <Td width="30%">{person.salary}</Td>
            <Td width="30%">{person.approved ? <FaCheck /> : <FaTimes />}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(person)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(person._id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>

  );
};

export default Grid;