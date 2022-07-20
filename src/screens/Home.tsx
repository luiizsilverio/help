import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SignOut, ChatTeardropText } from "phosphor-react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  VStack, HStack, IconButton, useTheme,
  Text, Heading, FlatList, Center
} from "native-base";


import Logo from '../assets/logo_secondary.svg';
import { dateFormat } from "../utils/dateFormat";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

const lista: OrderProps[] = [
  {
    id: '123',
    patrimony: '123456',
    when: '18/07/2022 às 10:00',
    status: 'open'
  },
  {
    id: '124',
    patrimony: '123456',
    when: '15/07/2022 às 12:00',
    status: 'open'
  },
  {
    id: '125',
    patrimony: '123456',
    when: '13/07/2022 às 8:00',
    status: 'open'
  },
  {
    id: '126',
    patrimony: '334633',
    when: '12/07/2022 às 14:00',
    status: 'closed'
  },
  {
    id: '127',
    patrimony: '755312',
    when: '10/07/2022 às 16:00',
    status: 'closed'
  }
]

export function HomeScreen() {
  const { colors } = useTheme();
  const [statusSel, setStatusSel] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  function handleLogout() {
    auth().signOut()
      .catch(err => {
        console.log(err);
        return Alert.alert('Sair', 'Não foi possível sair');
    })
  }


  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSel)
      .onSnapshot(snapshot => {   // atualiza os dados em tempo real
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)
          }
        })

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSel]);


  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full" justifyContent="space-between" alignItems="center"
        bg="gray.600" pt={12} pb={5} px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSel('open')}
            isActive={statusSel === 'open'}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSel('closed')}
            isActive={statusSel === 'closed'}
          />
        </HStack>

        {
          isLoading ? <Loading /> :
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={60} />
                <Text color="gray.300" fontSize="xl" mt={4} textAlign="center">
                  Você ainda não possui {'\n'} solicitações {' '}
                  { statusSel === 'open' ? 'em aberto' : 'finalizados'}
                </Text>
              </Center>
            )}
          />
        }

        <Button title="Nova solicitação" onPress={handleNewOrder} />

      </VStack>

    </VStack>
  );
}