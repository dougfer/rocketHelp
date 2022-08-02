import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { HStack, Text, VStack, useTheme, ScrollView, Box } from 'native-base'
import { Header, OrderProps, Loading, CardDetails, Input, Button } from '../../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../../DTOs/OrderDTO'
import { dateFormat } from '../../utils/firestoreDateFormat'
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native'

type RouteParams = {
  orderId: string
}

type OrderDetails = {
  description: string
  solution: string
  closed: string
} & OrderProps

export const Details: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState('')
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)

  const { colors } = useTheme()

  const navigation = useNavigation()

  const route = useRoute()

  const { orderId } = route.params as RouteParams

  const handleOrderClose = () => {
    if(!solution) {
      return Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação')
    }

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closedAt: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada')
        navigation.goBack()
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação')
      })

  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, createdAt, closedAt, solution } = doc.data()

        const closed = closedAt ? dateFormat(closedAt) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          closed,
          solution,
          status,
          when: dateFormat(createdAt)
        })

        setIsLoading(false)
      })
  }, [])


  if(isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg='gray.700'>
      <Box px={6} bg='gray.600'>
        <Header title='Solicitação' />
      </Box>
      <HStack bg='gray.500' justifyContent='center' p={4}>
        { order.status === 'closed'
          ? <CircleWavyCheck size={22} color={colors.green[300]} />
          : <Hourglass size={22} color={colors.secondary[700]} /> 
        }
        <Text
          fontSize='sm'
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform='uppercase'
        >
          {order.status === 'closed' ? 'Finalizado' : 'Em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails 
          title='Equipamentos'
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails 
          title='Descrição do problema'
          description={order.description}
          icon={Clipboard}
        />
        <CardDetails 
          title='Solução'
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === 'open' ? <Input 
            type='text'
            bg='gray.600'
            placeholder='Descrição da solução'
            onChangeText={setSolution}
            h={24}
            textAlignVertical='top'
            multiline
          /> : <Text color='white'>{order.solution}</Text>}
        </CardDetails>
      </ScrollView>
      {
        order.status === 'open' && <Button onPress={handleOrderClose} title='Encerrar solicitação' m={5} />
      }
    </VStack>
  );
}
