import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import LittleManLogin from '../../assets/little-man-login.svg';
import FacebookIcon from '../../assets/icons/facebook-icon.svg';
import GmailIcon from '../../assets/icons/gmail-icon.svg';
import AppleIcon from '../../assets/icons/apple-icon.svg';
import Login from '../Auth/Login';

const IntroductionLogin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack('IntroductionLogin')}>
          <ArrowLeftIcon width={50} height={50} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Central */}
      <View style={styles.content}>
        <LittleManLogin width="50%" height="50%" style={styles.image} />
        <Text style={styles.connectText}>Conecte-se já</Text>

        {/* Botões */}
        <TouchableOpacity style={styles.button}>
          <FacebookIcon width={20} height={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Continue com o Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <GmailIcon width={20} height={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Continue com o Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <AppleIcon width={20} height={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Continue com a Apple</Text>
        </TouchableOpacity>

        {/* Separador 'ou' */}
        <View style={styles.separator}>
          <Text style={styles.separatorText}>ou</Text>
        </View>

        {/* Botão de Login */}
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Entre com sua conta</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Não tem uma conta?{' '}
          <Text onPress={() => navigation.navigate('Signup')} style={styles.registerText}>
            Registre-se
          </Text>{' '}
          aqui
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  backIcon: {
    marginRight: 10,
    marginTop: 70,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 130,
    marginTop: -120,
  },
  connectText: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: -150,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#F5F5F5',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separatorText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginHorizontal: 10,
    color: '#1E1B1B',
  },
  loginButton: {
    backgroundColor: '#2ecc71',
    width: '90%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  registerText: {
    fontWeight: 'bold',
    color: '#2ecc71',
    flexDirection: 'row',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default IntroductionLogin;
