import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native'
import { Heading, HStack, IconButton, useTheme, StyledProps } from 'native-base';

type HeaderProps = {
  title: string
} & StyledProps

export const Header: React.FC<HeaderProps> = ({ title, ...rest }) => {

  const { colors } = useTheme()

  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <HStack
      w='full'
      justifyContent='space-between'
      alignItems='center'
      bg='gray.600'
      pb={6}
      pt={12}
      {...rest}
    >
      <IconButton onPress={handleGoBack} icon={<CaretLeft color={colors.gray[200]} size={24} />} />
      <Heading color='gray.100' textAlign='center' fontSize='lg' flex={1} pl={-6}>{title}</Heading>
    </HStack>
  );
}