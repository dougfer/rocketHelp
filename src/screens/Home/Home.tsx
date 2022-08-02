import React, { useState, useEffect } from 'react'
import Logo from '../../assets/logo_secondary.svg'
import { useNavigation } from '@react-navigation/native'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'
import { Filter, Order, OrderProps, Button, Loading } from '../../components'
import { Heading, HStack, IconButton, VStack, useTheme, Text, FlatList, Center } from 'native-base'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { dateFormat } from '../../utils/firestoreDateFormat'

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([])
  const navigation = useNavigation()

  const { colors } = useTheme()

  const handleNewOrder = () => {
    navigation.navigate('new')
  }

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate('details', { orderId })
  }

  const handleLogout = () => {
    auth().signOut().catch((err) => {
      console.log(err)
      Alert.alert('Sair', 'Não foi possível sair')
    })
  }



  useEffect(() => {
    setIsLoading(true)
    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, status, createdAt } = doc.data()

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(createdAt)
          }
        })
        setOrders(data)
        setIsLoading(false)
      })

      return subscriber
  }, [statusSelected])

  return (
    <VStack 
      flex={1}
      pb={6}
      bg='gray.700'
    >
      <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          onPress={handleLogout}
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
          <Heading color='gray.100'>Solicitações</Heading>
          <Text color='gray.200'> 
            {orders.length}
          </Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter 
            type='open' 
            title='em andamento'
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter 
            type='closed' 
            title='Finalizados'
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {isLoading ? <Loading /> : <FlatList 
          data={orders}
          keyExtractor={({id}) => id}
          renderItem={({item}) => <Order onPress={() => handleOpenDetails(item.id)} data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                Você ainda não possui {'\n'}
                solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />}
        <Button title='Nova solicitação' onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
