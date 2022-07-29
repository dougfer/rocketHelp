import { Text, VStack } from 'native-base';
import { Header, Input, Button } from '../../components'

export const Register = () => {
  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Nova solicitação' />
      <Input 
        placeholder='Número do patrimônio'
        mt={4}
      />
      <Input 
        placeholder='Descrição do problema'
        mt={5}
        flex={1}
        multiline
        textAlignVertical='top'
      />
      <Button title='Cadastrar' mt={5} />
    </VStack>
  );
}