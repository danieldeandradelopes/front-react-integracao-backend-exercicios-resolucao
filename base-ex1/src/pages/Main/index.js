import { useEffect, useState } from 'react';
import './styles.css';
import api from '../../services/api';

function Main() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  async function loadUsers() {

    try {
      const response = await api.get('/users');

      setUsers(response.data);
    } catch (error) {
      console.log(error.response.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!email || !name) {
        console.log('Preencha todos os campos!');
        return;
      }

      const response = await api.post('/users', {
        email,
        name
      });

      setEmail('');
      setName('');
      loadUsers();
    } catch (error) {
      console.log(error.response.message);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>

      <div className='container-users'>
        <h2>Users</h2>

        <div>
          {users.map((user) => (
            <h4 key={user.id}>{user.name}</h4>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
