// DetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';

const ChatInformation = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                // padding: 10,
                backgroundColor: '#149AFD',
                width: '100%',
                height: '7%',
                marginBottom: 20
            }}>
                <IconButton size={30} iconColor='white' icon="arrow-left" onPress={() => { navigation.goBack() }} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Tuỳ chọn</Text>
            </View>
            <Image style={{ width: 150, height: 150, borderRadius: 100 }} source={{ uri: 'https://i.pinimg.com/564x/c1/9a/1d/c19a1d3823b60a19194fe700f0524ae6.jpg' }} />
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Test Chat Group</Text>
            <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'space-around', marginVertical: 20 }}>
                <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 100 }}>
                    <Image style={{ width: 25, height: 25 }} source={require('../Images/ProfileIcon/Message.png')} />
                </Pressable>

                <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 100 }}>
                    <Image style={{ width: 25, height: 25 }} source={require('../Images/ProfileIcon/Video.png')} />
                </Pressable>

                <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 100 }}>
                    <Image style={{ width: 25, height: 25 }} source={require('../Images/ProfileIcon/Call.png')} />
                </Pressable>

                <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 100 }}>
                    <Image style={{ width: 25, height: 25 }} source={require('../Images/ProfileIcon/More.png')} />
                </Pressable>
            </View>
            <View style={{ width: '100%', marginLeft: 70, marginBottom: 10 }}>
                <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Name</Text>
                <Text style={{ color: 'black', fontSize: 20, marginTop: 5 }}>Trương Văn Tuấn</Text>
            </View>

            <View style={{ width: '100%', marginLeft: 70, marginBottom: 10 }}>
                <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Thành viên </Text>
                <Text style={{ color: 'black', fontSize: 20, marginTop: 5 }}>truongvantuanIUH@gmail.com</Text>
            </View>

            <View style={{ width: '100%', marginLeft: 70, marginBottom: 10 }}>
                <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Address</Text>
                <Text style={{ color: 'black', fontSize: 20, marginTop: 5 }}>123 Quang Trung, Phường 11, Gò Vấp, TP.HCM</Text>
            </View>

            <View style={{ width: '100%', marginLeft: 70, marginBottom: 10 }}>
                <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Phone number</Text>
                <Text style={{ color: 'black', fontSize: 20, marginTop: 5 }}>+(84) 345231231</Text>
            </View>
            <View style={{ width: '100%', marginLeft: 70, marginBottom: 10 }}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Media Shared</Text>
                    <Text style={{ color: 'gray', fontSize: 15, fontWeight: '500', marginTop: 10 ,marginRight:60}}>View All</Text>
                </View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: 100, height: 100, backgroundColor: 'white', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ width: 95, height: 95, borderRadius: 10 }} source={{ uri: 'https://i.pinimg.com/564x/c1/9a/1d/c19a1d3823b60a19194fe700f0524ae6.jpg' }} />
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ChatInformation;