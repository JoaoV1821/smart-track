import React from 'react';
import { SafeAreaView, View , Text, Image, TextInput, } from 'react-native';
import { AppButton } from '../components/AppButtons';
    
const Cadastro = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#FFF', height: '100%', flex: 1, flexDirection: 'column', alignItems: 'center'}}>

            <Image source={require('../../assets/logo.png')} style={{width: 400, height: 130, top: 100 }}/>

       <View style={{top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: '35%', left: 10 }}>
                    
                  <View>
                      <TextInput placeholder='Nome' style={{width: 300, height: 70, fontSize: 20, paddingLeft: 10,  }}/>
                      <View style={{ borderBottomWidth: 1, width: 350, borderBottomColor: '#CC5803', marginBottom: 65}}></View>
                  </View>

                  <View>
                      <TextInput placeholder='Email'  style={{width: 300, height: 70, fontSize: 20, paddingLeft: 10 }}/>
                      <View style={{ borderBottomWidth: 1, width: 350, borderBottomColor: '#CC5803', marginBottom: 65}}></View>
                  </View>

                  <View>
                      <TextInput placeholder='Senha'  style={{width: 300, height: 70, fontSize: 20, paddingLeft: 10 }} secureTextEntry={true}/>
                      <View style={{ borderBottomWidth: 1, width: 350, borderBottomColor: '#CC5803', marginBottom: 65 }}></View>
                  </View>

                  <View>
                      <TextInput placeholder='Confirme a senha'  style={{width: 300, height: 70, fontSize: 20, paddingLeft: 10 }} secureTextEntry={true}/>
                      <View style={{ borderBottomWidth: 1, width: 350, borderBottomColor: '#CC5803', marginBottom: 65 }}></View>
                  </View>

                  <View>
                      <TextInput placeholder='Perfil'  style={{width: 300, height: 70, fontSize: 20, paddingLeft: 10 }}/>
                      <View style={{ borderBottomWidth: 1, width: 350, borderBottomColor: '#CC5803',}}></View>
                  </View>

                  <AppButton title={'Cadastrar'}  top={120}/>    
       </View>

       <View style={{ top: 360}}> 
          <View style={{ borderBottomWidth: 1, width: 500, borderBottomColor: '#CC5803',}}></View>
          <Text style={{left: 50, fontSize: 18, top: 30}}>Já possui uma conta? <Text style={{color: '#CC5803'}} onPress={() => navigation.navigate('Login')}>Toque Aqui</Text> para fazer login</Text>
       </View>
                
    </SafeAreaView>
    
  )
}

export default Cadastro