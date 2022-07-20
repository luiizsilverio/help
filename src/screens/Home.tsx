import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import {
    VStack, HStack, IconButton, useTheme,
    Text, Heading, FlatList, Center
} from "native-base";


import Logo from '../assets/logo_secondary.svg';
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";

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
  const [orders, setOrders] = useState<OrderProps[]>(lista);
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full" justifyContent="space-between" alignItems="center"
        bg="gray.600" pt={12} pb={5} px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Meus chamados
          </Heading>
          <Text color="gray.200">
            3
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

        <Button title="Nova solicitação" onPress={handleNewOrder} />

      </VStack>

    </VStack>
  );
}