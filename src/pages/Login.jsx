import React from 'react';
import { SafeAreaView, View , Text, Image, TextInput, } from 'react-native';
import { AppButton } from '../components/AppButtons';
    
const Login = ({navigation}) => {
  return (

    <SafeAreaView style={{backgroundColor: '#FFF', height: '100%', flex: 1, flexDirection: 'column', alignItems: 'center'}}>

        
            <Image source={require('../../assets/logo.png')} style={{width: 400, height: 130, top: 155 }}/>

       
       <View style={{top: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: '35%', left: 15 }}>

                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Image source={require('../../assets/email.png')}/>
                  <View>
                      <TextInput placeholder='Digite seu email' style={{width: 300, height: 70, fontSize: 20, paddingLeft: 40 }}/>
                      <View style={{ borderBottomWidth: 1, width: 350, borderBottomColor: '#CC5803', right: 50}}></View>
                  </View>
                </View>
                
 
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Image source={require('../../assets/password.png')}/>
                  <View>
                      <TextInput placeholder='Digite sua senha'  style={{width: 300, height: 70, fontSize: 20, paddingLeft: 40 }}/>
                      <View style={{ borderBottomWidth: 1, width: 350, borderBottomColor: '#CC5803', right: 50}}></View>
                  </View>
                </View>
             
                <AppButton title={'Acessar'} onPress={() => navigation.navigate('MainScreens')}/>    
       </View>

       <View style={{ top: 360}}> 
          <View style={{ borderBottomWidth: 1, width: 500, borderBottomColor: '#CC5803',}}></View>
          <Text style={{left: 55, fontSize: 18, top: 30}}>Não tem uma conta? <Text style={{color: '#CC5803'}} onPress={() => navigation.navigate('Cadastro')}>Toque Aqui</Text> para criar uma</Text>
       </View>
                
    </SafeAreaView>
    
  )
}

export default Login