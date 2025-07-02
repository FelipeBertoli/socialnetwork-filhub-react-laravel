# Filhub - Rede Social Acadêmica

Filhub é uma rede social desenvolvida como projeto acadêmico, voltada para a comunidade universitária de uma instituição de ensino. A plataforma permite que estudantes compartilhem conteúdos, publiquem ideias, e interajam com colegas por meio de posts, comentários e curtidas. O backend foi construído com Laravel e o frontend com React Native.

## 🚀 Tecnologias utilizadas

- Laravel
- PHP
- MySQL
- React Native
- Axios
- NGINX (deploy)

## ✨ Funcionalidades

- Cadastro e login de usuários
- Criação e exclusão de posts
- Comentários e curtidas em publicações
- Visualização de perfil de usuário
- Integração completa via API REST
- Backend em Laravel
- Frontend mobile em React Native

## 📦 Como executar localmente

### Backend (Laravel)

1. Clone o repositório:
```bash
git clone https://github.com/FelipeBertoli/socialnetwork-filhub-react-laravel.git
cd backend
```

2. Instale as dependências:
```bash
composer install
```

3. Copie o arquivo `.env.example` para `.env` e configure as variáveis:
```bash
cp .env.example .env
php artisan key:generate
```

4. Crie o banco e execute as migrações:
```bash
php artisan migrate
```

5. Inicie o servidor:
```bash
php artisan serve
```

### Frontend (React Native)

> A pasta `mobile/` contém o app React Native. Certifique-se de atualizar o endereço base da API nas requisições do Axios.

## 📁 Estrutura esperada

```
socialnetwork-filhub-react-laravel/
├── backend/ (Laravel)
│   ├── app/
│   ├── database/
│   └── routes/
└── mobile/ (React Native)
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.
