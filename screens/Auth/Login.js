import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import SmimaLogo from '../../assets/icons/smima-logo.svg';
import ArrobaIcon from '../../assets/icons/arroba-icon.svg';
import CadeadoIcon from '../../assets/icons/cadeado-icon.svg';
import FacebookIcon from '../../assets/icons/facebook-icon.svg';
import GoogleIcon from '../../assets/icons/gmail-icon.svg';
import AppleIcon from '../../assets/icons/apple-icon.svg';
import EyeOpenIcon from '../../assets/icons/eye-open-icon.svg'; // ícone de olho aberto
import EyeClosedIcon from '../../assets/icons/eye-closed-icon.svg'; // ícone de olho fechado

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    // Lógica de login aqui
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup'); // Navega para a tela de registro
  };

  const navigateToFeed = () => {
    navigation.navigate('Feed'); // Verifique se o nome 'Feed' coincide com o nome na Stack.Navigator
  };

  const navigateBack = () => {
    navigation.goBack(); // Volta para a tela anterior
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
        <ArrowLeftIcon width={50} height={50} style={styles.backIcon} />
      </TouchableOpacity>
      <SmimaLogo width={250} height={250} style={styles.logo} />
      <Text style={styles.title}>Entre em sua conta</Text>
      <View style={[styles.inputContainer, emailFocused && styles.inputFocused]}>
        <ArrobaIcon width={20} height={20} style={[styles.inputIcon, emailFocused && styles.iconFocused]} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.inputContainer, styles.passwordContainer, passwordFocused && styles.inputFocused]}>
        <CadeadoIcon width={20} height={20} style={[styles.inputIcon, passwordFocused && styles.iconFocused]} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordToggle}>
          {showPassword ? (
            <EyeClosedIcon width={30} height={30} />
          ) : (
            <EyeOpenIcon width={30} height={30} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToFeed}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.continueWithText}>ou continue com</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FacebookIcon width={20} height={20} style={styles.socialButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <GoogleIcon width={20} height={20} style={styles.socialButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AppleIcon width={20} height={20} style={styles.socialButtonIcon} />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    marginTop: 40,
    top: 40,
    left: 20,
  },
  logo: {
    marginBottom: -20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputFocused: {
    borderColor: '#2ecc71',
    backgroundColor: '#E6F9EE',
  },
  inputIcon: {
    marginRight: 10,
    color: '#ccc', // Cor do ícone padrão
  },
  iconFocused: {
    color: '#2ecc71', // Cor do ícone quando focado
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%', // Altura do input
    paddingVertical: 0,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#2ecc71',
    width: '90%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueWithText: {
    fontSize: 16,
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#E6E6E6',
  },
  socialButtonIcon: {
    color: '#000', // Cor dos ícones Facebook, Google e Apple
  },
  signupText: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 20,
    marginBottom: -70,
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

export default Login;
