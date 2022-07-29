import { useState, useEffect } from 'react'
import { SignIn } from '../screens'
import { AppRoutes } from './app.routes'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import { Loading } from '../components'

export const Routes = () => {

  const [loading, setIsLoading] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User>()

  useEffect(() => {
    const subscriber = auth()
      .onAuthStateChanged((response) => {
        setUser(response)
        setIsLoading(false)
      })
      return subscriber
  }, [])

  if(loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}
