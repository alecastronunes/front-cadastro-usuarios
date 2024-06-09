import { useEffect, useState, useRef} from "react";
import "./style.css";
import Trash from "../../assets/Trash.jpg";
import api from "../../service/api";

function Home() {
  const [users, setUsers] = useState([])

  //Criando as referências
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  //Cria os novos usuários
  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }



  useEffect(()=>{
    getUsers()
  }, [])

  return (
    <div className="container">
      {/*Obtendo os dados do usuário*/}
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="name" placeholder="Name" ref={inputName}/>
        <input type="number" name="age" placeholder="Age" ref={inputAge}/>
        <input type="email" name="e-mail" placeholder="E-mail" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {/*Percorrendo o array de objetos*/}
      {users.map((user) => (
        <div key={user.id} className="cards">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}> 
            <img src={Trash} alt="Trash image" id="trash" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
