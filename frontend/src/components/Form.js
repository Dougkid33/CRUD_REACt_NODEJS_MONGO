import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getPeople, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const person = ref.current;

      person.name.value = onEdit.name;
      person.salary.value = onEdit.salary;
      person.approved.value = onEdit.approved;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const person = ref.current;

    if (
      !person.name.value ||
      !person.salary.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
      .patch("http://localhost:3000/person/" + onEdit._id  , {
          name: person.name.value,
          salary: person.salary.value,
          approved: person.approved.checked,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:3000/person/", {
          name: person.name.value,
          salary: person.salary.value,
          approved: person.approved.checked,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    person.name.value = "";
    person.salary.value = "";
    person.approved.value = false;

    setOnEdit(null);
    getPeople();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Salário</Label>
        <Input name="salary" type="number" />
      </InputArea>
      <InputArea>
        <Label>Aprovado: </Label>
        <Input name="approved" type="checkbox" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
