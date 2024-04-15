import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

const ChatInformation = ({ navigation, route }) => {
    console.log(route.params.item.members);
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
            <View style={{ alignItems:'center',width:'100%', backgroundColor:'white', marginBottom:10}} >
                <Image style={{ width: 150, height: 150, borderRadius: 100 }} source={{ uri: route.params.item.avatar }} />
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{route.params.item.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '70%',
                }}>
                    <IconButton
                        icon="message"
                        color="white"
                        size={25}
                        style={styles.actionButton}
                        onPress={() => {
                            // Xử lý sự kiện khi nhấn vào nút tin nhắn
                        }}
                    />

                    <IconButton
                        icon="account-multiple-plus"
                        color="white"
                        size={30}
                        style={styles.actionButton}
                        onPress={() => {
                            navigation.navigate('AddMembersGroup', {item : route.params.item})
                        }}
                    />

                    <IconButton
                        icon="phone"
                        color="white"
                        size={25}
                        style={styles.actionButton}
                        onPress={() => {
                            // Xử lý sự kiện khi nhấn vào nút cuộc gọi
                        }}
                    />

                    <IconButton
                        icon="dots-vertical"
                        color="white"
                        size={25}
                        style={styles.actionButton}
                        onPress={() => {
                            // Xử lý sự kiện khi nhấn vào nút tùy chọn
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity 
                onPress={() => { navigation.navigate('MediaMessage', {roomId: route.params.roomId}) }}
                style={{ width: '100%', marginBottom: 10, backgroundColor: 'white', height: '6%', justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="folder-multiple-image" color="black" size={25} />
                    <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold' }}>Ảnh, File, Video ...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => { navigation.navigate('MembersChat', {roomId: route.params.roomId, item: route.params.item}) }}
                style={{ width: '100%', marginBottom: 10, backgroundColor: 'white', height: '6%', justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="account-group" color="black" size={25} />
                    <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold' }}>Thành viên</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%', marginBottom: 10, backgroundColor: 'white', height: '6%', justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="delete-sweep-outline" color="black" size={25} />
                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Giản tán nhóm</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%', marginBottom: 10, backgroundColor: 'white', height: '6%', justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="exit-to-app" color="black" size={25} />
                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Rời nhóm</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ChatInformation;