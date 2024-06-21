import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import DefaultUserIcon from '../../assets/icons/default-user-icon.svg';
import PencilIcon from '../../assets/icons/pencil-icon.svg';
import CalendarIcon from '../../assets/icons/calendar-icon.svg';
import ArrobaIcon from '../../assets/icons/arroba-icon.svg';
import PhoneIcon from '../../assets/icons/phone-icon.svg';
import GenderIcon from '../../assets/icons/gender-icon.svg';
import EyeOpenIcon from '../../assets/icons/eye-open-icon.svg';
import EyeClosedIcon from '../../assets/icons/eye-closed-icon.svg';
import CadeadoIcon from '../../assets/icons/cadeado-icon.svg';

const Signup = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [focusedInput, setFocusedInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false); // Adicionando estado para controlar o foco da senha
  const [repeatPasswordFocused, setRepeatPasswordFocused] = useState(false); // Adicionando estado para controlar o foco da senha

  const navigateBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    if (password !== repeatPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // Lógica de registro aqui
  };

  const formatBirthDate = (input) => {
    // Remove caracteres não numéricos
    const cleaned = input.replace(/\D/g, '');
    // Adiciona as barras conforme o formato desejado
    const formatted = cleaned.replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2');
    return formatted;
  };

  const handleBirthDateChange = (text) => {
    const formattedDate = formatBirthDate(text);
    setBirthDate(formattedDate);
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    javascript

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a escolha da foto');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleFullNameChange = (text) => {
    const formattedFullName = text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    setFullName(formattedFullName);
  };

  const handleUsernameChange = (text) => {
    const formattedUsername = text.replace(/[^a-zA-Z0-9. ]/g, '');
    setUsername(formattedUsername);
  };

  const validateEmail = (email) => {
    // Regex padrão para validação de e-mail
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
  };

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
        <ArrowLeftIcon width={50} height={50} style={styles.backIcon} />
        <Text style={styles.title}>Registre sua conta</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.profileContainer}>
          {profileImage ? (
            <Image source={profileImage} style={styles.profileImage} />
          ) : (
            <DefaultUserIcon width={130} height={130} style={styles.profileImage} />
          )}
          <TouchableOpacity style={styles.editIconContainer} onPress={handleImagePicker}>
            <PencilIcon width={40} height={40} />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainer, focusedInput === 'fullName' && styles.inputFocused]}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={fullName}
            onChangeText={handleFullNameChange}
            onFocus={() => setFocusedInput('fullName')}
            onBlur={() => setFocusedInput('')}
          />
        </View>

        <View style={[styles.inputContainer, focusedInput === 'username' && styles.inputFocused]}>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={username}
            onChangeText={handleUsernameChange}
            onFocus={() => setFocusedInput('username')}
            onBlur={() => setFocusedInput('')}
          />
        </View>

        <View style={[styles.inputContainer, focusedInput === 'birthDate' && styles.inputFocused]}>
          <TextInput
            style={[styles.input, styles.inputWithIcon]}
            placeholder="Data de nascimento"
            value={birthDate}
            onChangeText={handleBirthDateChange}
            maxLength={10}
            onFocus={() => setFocusedInput('birthDate')}
            onBlur={() => setFocusedInput('')}
          />
          <CalendarIcon width={25} height={25} style={[styles.inputIcon, focusedInput === 'birthDate' && styles.iconFocused]} />
        </View>

        <View style={[styles.inputContainer, focusedInput === 'email' && styles.inputFocused]}>
          <ArrobaIcon width={30} height={30} style={[styles.inputIcon, focusedInput === 'email' && styles.iconFocused]} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput('')}
          />
        </View>

        <View style={[styles.inputContainer, focusedInput === 'phone' && styles.inputFocused]}>
          <PhoneIcon
            width={30}
            height={30}
            style={[styles.inputIcon, focusedInput === 'phone' && styles.iconFocused]}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone}
            maxLength={15}
            onChangeText={(text) => setPhone(formatPhoneNumber(text))}
            onFocus={() => setFocusedInput('phone')}
            onBlur={() => setFocusedInput('')}
          />
        </View>

        <View style={[styles.inputContainer, styles.passwordContainer, passwordFocused && styles.inputFocused]}>
          <CadeadoIcon width={25} height={25} style={[styles.inputIcon, passwordFocused && styles.iconFocused]} />
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

        <View style={[styles.inputContainer, styles.passwordContainer, repeatPasswordFocused && styles.inputFocused]}>
          <CadeadoIcon width={25} height={25} style={[styles.inputIcon, repeatPasswordFocused && styles.iconFocused]} />
          <TextInput
            style={styles.input}
            placeholder="Repita a senha"
            secureTextEntry={!showRepeatPassword}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            onFocus={() => setRepeatPasswordFocused(true)}
            onBlur={() => setRepeatPasswordFocused(false)}
          />
          <TouchableOpacity onPress={toggleRepeatPasswordVisibility} style={styles.passwordToggle}>
            {showRepeatPassword ? (
              <EyeClosedIcon width={30} height={30} />
            ) : (
              <EyeOpenIcon width={30} height={30} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 90,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: 'absolute',
    top: -10,
    right: 120,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputFocused: {
    borderColor: '#2ecc71',
    backgroundColor: '#E6F9EE',
    color: '#000000',
  },
  inputIcon: {
    marginRight: 10,
    color: '#ccc',
  },
  iconFocused: {
    color: '#2ecc71',
    backgroundColor: '#E6F9EE',
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingVertical: 0,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    top: 0,
    right: 10,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2ecc71',
    width: '90%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Signup;
