import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Message = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', alignItems:'center',marginTop:30}}>
             <View style={{flexDirection:'row', alignItems:'center', marginLeft:25}}>
                <Pressable 
                onPress={() => { navigation.goBack() }}
                >
                    <Image source={require('../Images/IconViewMessage/Left.png')} />
                </Pressable>
                <Image style={{ width: 45, height: 45, borderRadius: 100, marginLeft:15, marginRight:10 }} source={{ uri: 'https://shopbanphim.com/wp-content/uploads/2023/12/anh-gai-xinh-tiktok.jpg' }} />
                <View>
                    <Text style={{ color: 'black', fontSize: 16 }}>Trương Văn Tuấn</Text>
                    <Text style={{ color: 'gray', fontSize: 12, fontWeight:'bold' }}>Active now</Text>
                </View>
             </View>
             <View style={{flexDirection:'row', alignItems:'center', marginRight:-80}}>
                <Image source={require('../Images/IconViewMessage/Call.png')} />
                <Image style={{marginLeft:15}} source={require('../Images/IconViewMessage/Video.png')} /> 
             </View>
             <SafeAreaView>
                

             </SafeAreaView>
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

export default Message;