import React, { Component } from 'react';import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Item, Label, Input, Form} from 'native-base';import {Alert, Image, View} from "react-native";
export default class RegisterScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state ={ 
            Username: '',
                Password: '',
                Password2: '',
                nama_customer: '',
                No_Telepon: '',
                alamat: '',
                telp_user: '',
                foto: '',
                srcImg: "",
                uri: "",
                fileName: "",
            };
    }

    submitData = () => {
        if (this.state.Password == this.state.Password2){
          this.uploadPicture();
          this.setState({ loading_process: true }, () => {
            fetch(
              "http://sibooking.wahanawar.com/daftar.php",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  Username: this.state.Username,
                    nama_customer: this.state.nama_customer,
                    No_Telepon: this.state.No_Telepon,
                    alamat: this.state.alamat,
                    telp_user: this.state.telp_user,
                    foto: this.state.foto,
                    Password: this.state.Password,
                })
              }
            )
              .then(response => response.json())
              .then(responseJsonFromServer => {
                Alert.alert("SUCESS", responseJsonFromServer);
      
                this.props.navigation.navigate("Login");
              })
              .catch(error => {
                console.error(error);
      
                this.setState({ loading_process: false });
              });
          });
        }else {
            Alert.alert('password tidak sama')
        }

    }

    submitAllData = () => {
      this.submitData();
    };
    choosePicture = () => {
      console.log("upload");
      var ImagePicker = require("react-native-image-picker");
      var options = {
        title: "Pilih Gambar",
        storageOptions: {
          skipBackup: true,
          path: "images"
        }
      };
  
      ImagePicker.showImagePicker(options, response => {
        console.log("Response = ", response);
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          let source = { uri: response.uri };
          console.log(source);
          console.log(response.fileName);
          this.setState({
            srcImg: source,
            uri: response.uri,
            fileName: response.fileName,
            foto: response.fileName
          });
        }
      });
    };
  
    uploadPicture = () => {
      console.log("mulai upload");
      this.setState({ loading: true });
  
      const data = new FormData();
      //data.append('name', 'Fotoku'); // you can append anyone.
      data.append("fileToUpload", {
        uri: this.state.uri,
        type: "image/jpeg", // or photo.type
        name: this.state.fileName
      });
      const url =
        "http://sibooking.wahanawar.com/upload_foto.php";
      fetch(url, {
        method: "post",
        body: data
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.setState({
            loading: false
          });
        });
    };
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Daftar</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                <Body>
            <Item>
              <Label>Foto</Label>
            </Item>
            <View
              style={{
                flex: 1,
                marginBottom: 35,
                marginTop: 45,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                large
                transparent
                onPress={this.choosePicture.bind(this)}
              >
                <View
                  style={{
                    borderRadius: 100,
                    width: 150,
                    height: 150,
                    borderColor: "#000",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {this.state.srcImg === null ? (
                    <Icon name="camera" />
                  ) : (
                    <Image
                      source={this.state.srcImg}
                      style={{
                        borderRadius: 100,
                        width: 150,
                        height: 150,
                        borderColor: "#000",
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    />
                  )}
                </View>
              </Button>
            </View>
          </Body>
                    <Form>
                    <Item floatingLabel>
                            <Label>Nama </Label>
                            <Input
                                onChangeText={(nama_customer) => this.setState({nama_customer})}
                                value={this.state.nama_customer}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input
                                onChangeText={(Username) => this.setState({Username})}
                                value={this.state.Username}
                            />
                        </Item>
                        
                        <Item floatingLabel>
                            <Label>No Telepon</Label>
                            <Input
                                onChangeText={(No_Telepon) => this.setState({No_Telepon})}
                                value={this.state.No_Telepon}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Alamat</Label>
                            <Input
                                onChangeText={(alamat) => this.setState({alamat})}
                                value={this.state.alamat}
                            />
                        </Item>
                       
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(Password) => this.setState({Password})}
                                value={this.state.Password}
                                secureTextEntry={true}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Confirm Password</Label>
                            <Input
                                onChangeText={(Password2) => this.setState({Password2})}
                                value={this.state.Password2}
                                secureTextEntry={true}
                            />
                        </Item>

                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full
                                onPress={this.submitAllData}
                        >
                            <Text>Daftar</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}