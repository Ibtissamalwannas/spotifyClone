import LottieView from 'lottie-react-native';
import { Text, View } from 'react-native'
export const Loading = () => {
    return (
        <LottieView
            ref={animation => {
                animation = animation
            }}
            style={{
                width: 210,
                height: 210,
                alignSelf: 'center'
            }}
            source={require('../../assets/gif/loading.json')}
            autoPlay
            loop
        />
    )
}
export const NotFound = () => {
    return (
        <LottieView
            ref={animation => {
                animation = animation
            }}
            style={{
                width: 240,
                height: 240,
                alignSelf: 'center'
            }}
            source={require('../../assets/gif/result-not-found.json')}
            autoPlay
            loop
        />
    )
}

export const EmptyData = () => {
    return (
        <View style={{}}>
            {NotFound()}
            <Text style={{ alignSelf: 'center', fontSize: 18 }}>no result found</Text>
        </View>
    )
}