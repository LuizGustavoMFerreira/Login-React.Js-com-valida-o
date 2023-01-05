import React, { useRef } from 'react';
import { Form } from '@unform/web';
import Logo from './assets/logo.png'
import * as Yup from 'yup';
import './App.css';
import Input from './components/Form/input';
import Select from './components/Select';

function App() {

  const selectOptions = [
    { value: '', label: 'Escolha um nível de acesso'},
    { value: 'nivel1', label: 'Nivel 1' },
    { value: 'nivel2', label: 'Nivel 2' },
    { value: 'nivel3', label: 'Nivel 3' },
  ]

  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {

    try {
      const schema = Yup.object().shape({
        
        name: Yup.string().required("O nome é obrigatório"),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        senha: Yup.string()
          .min(6, 'Digite uma senha de 6 caracteres')
          .required('A senha é obrigatória'),
        select: Yup.string().required("O campo para escolher o nível é obrigatório")
      });

      await schema.validate(data, {
        abortEarly: false,
      })
      console.log(data);

      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }
 
  return (
    <div className="App">

      <div>
        <img src={Logo}/>
      </div>
      
      <h1>Cadastro</h1>
      
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo"/>
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="senha" placeholder="Senha" />

        <Select className='selecao' name="select" options={selectOptions}>
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <button className='enviar' type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
