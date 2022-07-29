import { Home, Register, Details } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}>
      <Screen 
        name='home'
        component={Home}
      />
      <Screen 
        name='new'
        component={Register}
      />
      <Screen 
        name='details'
        component={Details}
      />
    </Navigator>
  )
}