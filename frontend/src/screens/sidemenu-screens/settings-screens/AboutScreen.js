import React from 'react';
import { Text, ScrollView, StyleSheet} from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
            <Text style={styles.title}>Política de Privacidade</Text>
      <Text style={styles.text}>
        Sua privacidade é muito importante para nós. Este aplicativo
        coleta informações pessoais, como seu nome, matrícula, curso e foto de
        perfil, para permitir que você se conecte com colegas, professores e
        outros membros da comunidade universitária.
      </Text>
      <Text style={styles.text}>
        As informações coletadas são utilizadas para proporcionar uma experiência
        personalizada, como sugerir grupos de estudo, eventos e outras
        interações que possam ser relevantes para você dentro da universidade.
      </Text>
      <Text style={styles.text}>
        Nós respeitamos sua privacidade e garantimos que seus dados não serão
        compartilhados com terceiros sem o seu consentimento expresso. Você tem o
        direito de acessar, corrigir e excluir seus dados a qualquer momento
        por meio das configurações do aplicativo ou entrando em contato com
        nosso suporte.
      </Text>

      <Text style={styles.title}>Termos de Uso</Text>
      <Text style={styles.text}>
        Ao utilizar este aplicativo, você concorda em respeitar as regras e
        políticas do aplicativo, bem como os seguintes Termos de Uso:
      </Text>
      <Text style={styles.text}>
        1. **Uso adequado**: O aplicativo deve ser utilizado para fins educacionais,
        acadêmicos e sociais dentro da comunidade Unifil. Não é permitido o uso
        para disseminação de conteúdo ofensivo, discriminatório ou ilegal.
      </Text>
      <Text style={styles.text}>
        2. **Propriedade intelectual**: Todo o conteúdo gerado no aplicativo,
        incluindo postagens, fotos, vídeos e mensagens, é de responsabilidade do
        usuário. O uso de conteúdo protegido por direitos autorais sem permissão
        é proibido.
      </Text>
      <Text style={styles.text}>
        3. **Interações sociais**: Ao interagir com outros membros da comunidade, você se compromete a agir com respeito e de acordo com as
        normas de convivência da universidade.
      </Text>
      <Text style={styles.text}>
        4. **Segurança**: Não nos responsabilizados por interações ou
        conteúdos compartilhados fora do controle do aplicativo. Mantenha suas
        informações pessoais seguras e evite compartilhar dados sensíveis com
        outros usuários.
      </Text>
      <Text style={styles.text}>
        5. **Alterações nos Termos**: Estes Termos de Uso podem ser atualizados
        periodicamente. Quaisquer alterações serão notificadas a você por meio do
        aplicativo.
      </Text>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#555',
  },
});
