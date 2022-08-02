import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export const dateFormat = (timesStamp: FirebaseFirestoreTypes.Timestamp) => {
  if(timesStamp) {
    const date = new Date(timesStamp.toDate())

    const day = date.toLocaleDateString('pt-BR')

    const hour = date.toLocaleTimeString('pt-BR')

    return `${day} às ${hour}`
  }
}
