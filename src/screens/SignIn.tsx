import React, { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import auth from '@react-native-firebase/auth';
import { Envelope, Key } from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha.');
    }

    setLoading(true);

    auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        //...
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        if (err.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválido');
        }
        if (err.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'E-mail ou senha inválida');
        }
        if (err.code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'E-mail ou senha inválida');
        }
        return Alert.alert('Entrar', `Erro de autenticação (${err.code})`);
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        secureTextEntry
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        onChangeText={setPassword}
 />

      <Button
        title='Entrar'
        w="full"
        onPress={handleSignIn}
        isLoading={loading}
      />
    </VStack>
  );
}