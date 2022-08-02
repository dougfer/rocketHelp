import React, { useState } from 'react'
import { Header, Input, Button } from '../../components'
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { Text, VStack, Alert as NBAlert } from 'native-base'

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  const handleNewOrder = () => {
    if(!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos')
    }

    setIsLoading(true)

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        createdAt: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
        navigation.goBack()
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        Alert.alert('Solicitação', 'Não foi possível registrar o pedido.')
      })

  }

  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Nova solicitação' />
      <Input 
        placeholder='Número do patrimônio'
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input 
        placeholder='Descrição do problema'
        mt={5}
        flex={1}
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
      />
      <Button isLoading={isLoading} onPress={handleNewOrder} title='Cadastrar' mt={5} />
    </VStack>
  );
}