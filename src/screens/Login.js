import { StyleSheet, Text, View, Animated, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import LottieView from 'lottie-react-native';


const discovery = {
    authorizationEndpoint:
        "https://accounts.spotify.com/authorize",
    tokenEndpoint:
        "https://accounts.spotify.com/api/token",
};


const Login = () => {
    const navigation = useNavigation();

    const [token, setToken] = useState("");
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: "04ad42be19f941f3b1234c4047e57b12",
            scopes: [
                "user-read-currently-playing",
                "user-read-recently-played",
                "user-read-playback-state",
                "user-top-read",
                "user-modify-playback-state",
                "streaming",
                "user-read-email",
                "user-read-private",
            ],
            usePKCE: false,
            redirectUri: "exp://192.168.43.30:19000",
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { access_token } = response.params;
            setToken(access_token);
            navigation.navigate('ArtistSearch', { token: token })
        }
    }, [response]);

    const animatedValue = useRef(new Animated.Value(1)).current
    const animatedStyle = { transform: [{ scale: animatedValue }] }

    const pressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 0.8,
            useNativeDriver: true
        }).start()
    }

    const pressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={styles.container}>
            <LottieView
                ref={animation => {
                    animation = animation
                }}
                style={{
                    width: 210,
                    height: 210,
                    alignSelf: 'center',
                    marginBottom: 20
                }}
                source={require('../../assets/gif/logo.json')}
                autoPlay
                loop
            />
            <Animated.View
                style={[
                    { width: '90%', alignItems: 'center', justifyContent: 'center' },
                    animatedStyle
                ]}
            >
                <Pressable
                    style={styles.button}
                    unstable_pressDelay={500}
                    onPressIn={pressIn}
                    onPressOut={() => {
                        pressOut()
                        setTimeout(() => promptAsync(), 200)
                    }}
                >
                    <Text style={styles.text}>Login With Spotify</Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%'
    },
    image: {
        width: 90,
        height: 90,
        alignItems: 'center',
        marginBottom: 50
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18
    }
})