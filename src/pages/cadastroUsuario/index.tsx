import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import api from '../../services/api';

export default function CadastroUsuario() {

  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();

  

  const cadastrarUsuario = async () => {
    setError(''); // Limpa erros anteriores

  if (!name || !email || !password) {
    setError('Preencha todos os campos obrigatórios.');
    return;
  }

  // Adicione uma validação para o formato de email, se necessário

  try {
    const response = await api.post('/cadastrarusuario', { name, email, password, cpf, telefone});
    console.log(response);
    setName('');
    setEmail('');
    setPassoword('');
    setCpf('');
    setTelefone('');
    navigate('/login');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    setError('Erro ao registrar usuário. Tente novamente mais tarde.');
  }
};

  return (
    <Container maxWidth="lg">
      <Box>
        <form>
          <Typography variant="h4" align="center">
            Cadastro
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  variant="outlined"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={event => setPassoword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CPF"
                  name="cpf"
                  variant="outlined"
                  value={cpf}
                  onChange={event => setCpf(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="telefone"
                  variant="outlined"
                  value={telefone}
                  onChange={event => setTelefone(event.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={cadastrarUsuario}
          >
            Cadastrar
          </Button>
        </form>
      </Box>
    </Container>
  );
}
