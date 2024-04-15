import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getMessagesByChatId } from '../../api/Message';
import { useSelector } from 'react-redux';
import Video from 'react-native-video';
const MediaMessage = ({ navigation, route }) => {
    const user = useSelector(state => state.auth.user.avatar);
    const id = useSelector(state => state.auth.user._id);
    const users = useSelector(state => state.auth.users);

    const getFileExtensionFromUrl = (url) => {
        // Tách phần mở rộng từ URL và chuyển đổi thành chữ thường
        const parts = url.split('.');
        const extension = parts[parts.length - 1].toLowerCase();
        return extension;
    };
    const convertMessageToGiftedChatMessage = (message) => {
        const { _id, content, sender, createdAt, views } = message;
        let messageType = 'text';
        let messageContent = content.text;
        let imageContent = '';
        let videoContent = '';
        let fileContent = '';
        if (views.includes(id)) {
            if (content.files.length > 0) {
                const fileExtension = getFileExtensionFromUrl(content.files[0]);
                console.log('fileExtension', fileExtension);
                if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                    messageType = 'image';
                    messageContent = '';
                    imageContent = content.files[0];
                } else if (['mp4', 'mov', 'avi'].includes(fileExtension)) {
                    messageType = 'video';
                    messageContent = '';
                    videoContent = content.files[0];
                }
                else {
                    messageType = 'file';
                    messageContent = '';
                    fileContent = content.files[0];
                }
            }

            console.log('messageContent', messageContent);
            console.log('imageContent', imageContent);
            console.log('videoContent', videoContent);
            console.log('fileContent', fileContent);
            return {
                _id,
                text: messageContent,
                image: imageContent,
                video: videoContent,
                file: fileContent,
                user: {
                    _id: sender,
                    avatar: 'users.find((user) => user._id === id).avatar',
                },
                createdAt: new Date(createdAt),
            };
        }
        return {
            _id,
            text: '',
            image: '',
            video: '',
            file: '',
            user: {
                _id: sender,
                avatar: '',
            },
            createdAt: '',
        }
    };
    const [media, setMedia] = useState([]);
    useEffect(() => {
        getMessagesByChatId(route.params.roomId).then((data) => {
            const convertedMessages = data.map(convertMessageToGiftedChatMessage);
            setMedia(convertedMessages);
        });
    }, []);
    console.log('media', media);
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
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Ảnh, File, Video ...</Text>
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <FlatList
                    style={{ width: '100%', }}
                    data={media}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={{
                            width: '100%',
                            padding: 5,
                            alignItems: 'center',

                        }} >
                            {item.image && <Image style={{ width: '100%', height: 500, resizeMode: "contain", alignItems: 'center' }} source={{ uri: item.image }} />}
                            {item.video && <Video
                                source={{ uri: item.video }}
                                style={{
                                    width: '100%',
                                    height: 500,

                                    borderRadius: 10, // Làm tròn góc của video
                                }}
                                resizeMode="cover" // Chế độ co dãn hình ảnh để phù hợp với kích thước của video
                                paused={true} // Tạm dừng video khi nó được hiển thị
                                controls={true} // Hiển thị controls cho video
                            />}
                            {item.file &&
                                <TouchableOpacity onPress={() => Linking.openURL(item.file)}  >
                                    <IconButton icon="file" size={200} color="black"/>
                                    
                                </TouchableOpacity>}
                        </View>
                    )}
                />
            </View>
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

export default MediaMessage;