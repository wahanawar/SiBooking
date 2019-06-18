import React from "react";
import {  View,Alert,AsyncStorage} from 'react-native';
import {Button, Container, Content, Footer, Form, Header, Input, Item, Label, ListItem, Text} from "native-base";
import {StatusBar, TouchableOpacity} from "react-native";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = { 
            Username: '',
            Password: '',
            user: [],
            };
    }
    
    login = () => {
        this.setState({ loading_process: true }, () => {
            fetch("http://sibooking.wahanawar.com/login.php", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                Username: this.state.Username,
                Password: this.state.Password
              })
            })
              .then(response => response.json())
              .then(responseJson => {
                if (this.state.nim == responseJson.nim) {
                  this.props.navigation.navigate("Home", {
                    Id_Custemer: responseJson.Id_Custemer,
                  });
                } else {
                  Alert.alert(responseJson.pesan);
                }
              })
              .catch(error => {
                console.error(error);
      
                this.setState({ loading_process: false });
              });
          });
        };
    render() {
        return (
            <Container>
                <Header noShadow style={{backgroundColor:'white'}}>
                    <StatusBar backgroundColor="white" barStyle="dark-content" />
                </Header>
                <Content padder>
                    <Text style={{alignSelf:'center',marginBottom:70,marginTop: 100,fontSize: 20}}>
                        Selamat Datang di SiBooking
                    </Text>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input
                                onChangeText={(Username) => this.setState({Username})}
                                value={this.state.Username}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(password_user) => this.setState({password_user})}
                                value={this.state.password_user}
                                secureTextEntry={true}
                            />
                        </Item>
                        <Button
                            success
                            style={{margin: 10, alignSelf:'center'}}
                            onPress={this.login}
                        >
                            <Text> Login </Text>
                        </Button>
                    </Form>
                </Content>
                <Footer style={{backgroundColor:'white',alignItems:'center'}}>
                    <Text>
                        Belum Memiliki Akun Silahkan    
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Daftar')}
                    >
                        <Text style={{color: 'green'}}>Daftar</Text>
                    </TouchableOpacity>
                </Footer>
            </Container>
        );
    }
}
