import { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos');
    }

    setIsLoading(true);

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert("Registrar", "Solicitação registrada com sucesso");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        return Alert.alert("Registrar", "Erro ao registrar sua solicitação");
      })
  }

  return (
    <VStack flex={1} px={6} bg="gray.600">
      <Header title="Nova solicitação" />
      <Input
        placeholder="Número do patrimônio"
        onChangeText={setPatrimony}
        mt={2}
      />
      <Input
        placeholder="Descrição do problema"
        onChangeText={setDescription}
        flex={1} mt={5}
        textAlignVertical="top"
        multiline
      />
      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}