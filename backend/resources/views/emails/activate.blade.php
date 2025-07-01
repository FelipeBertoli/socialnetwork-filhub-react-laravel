<!DOCTYPE html>
<html>
<head>
    <title>Ativação de Conta</title>
    <style>
        * {
            font-family: Arial, Helvetica, sans-serif;
        }
        .container {
            background: rgb(236, 236, 236);
            padding: 1.5rem;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 10px;
            color: white !important;
            background-color: #FF7600;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bolder;
            text-transform: uppercase;
        }
        .button:hover {
            background-color: #d86704;
        }
        .content {
            background: white;
            padding: 1rem;
            margin: 0 auto;
            max-width: 600px;
        }
    </style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="container">
        <tr>
            <td align="center">
                <img src="{{ $message->embed(public_path('images/logo.png'))}}" style="width: 50%; padding-bottom:1rem" alt="logo">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="content">
                    <tr>
                        <td>
                            <h2>Olá, {{ $user->name }}</h2>
                            <p>Seja bem-vindo(a) ao Filhub. Para que você consiga entrar no aplicativo, clique no botão abaixo para ativar sua conta:</p>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $activationUrl }}" class="button">Ativar Conta</a>
                                    </td>
                                </tr>
                            </table>
                            <p>Se você não criou esta conta, ignore este email.</p>
                            <p>Atenciosamente,<br>Filhub</p>
                        </td>
                    </tr>
                </table>
                <p style="color: rgb(131, 131, 131); font-size: .8rem; padding-top:1rem">© 2024 Unifil, todos os direitos reservados</p>
            </td>
        </tr>
    </table>
</body>
</html>
