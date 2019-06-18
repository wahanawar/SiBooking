import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Label,
    Input,
    Body,
    Left,
    Right,
    Icon,
    Form,
    Text,
    View,
    Thumbnail, 
    Picker,
    Textarea, Footer, List, ListItem, Fab, IconNB
  } from "native-base";
import ImagePicker from "react-native-image-picker";
import { Image, Alert, RefreshControl } from "react-native";
export default class Lapangan extends Component {
  static navigationOptions = {
    header: null
  }
    constructor(props) {
        super(props);
        this.state = {
          active: false,
          data: [],
          refreshing: false,
          ActivityIndicator_Loading: false,
        };
      }
      componentDidMount() {
        this.setState({ ActivityIndicator_Loading: true }, () => {
          this.setState({ refreshing: true });
          const url =
            "http://sibooking.wahanawar.com/booking.php";
          //this.setState({ loading: true });
          fetch(url)
            .then(response => response.json())
            .then(responseJson => {
              console.log("comp");
              console.log(responseJson);
              this.setState({
                data: responseJson,
                error: responseJson.error || null,
                loading: false,
                refreshing: false,
                ActivityIndicator_Loading: false
              });
            });
        });
        /*this.willFocusSubscription = this.props.navigation.addListener(
          'willFocus',
          () => {
            this.componentDidMount.bind(this);
          }
        );*/
      }
      detail = (kode_user) => {
        this.props.navigation.navigate("DetailMahasiswa", {
          kode_user: kode_user
        });
      };
  render() {
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>Data Booking</Title>
          </Body>
          <Right />
        </Header>
        
        <Content padder>
        <List
              dataArray={this.state.data}
              renderRow={item => (
                <ListItem
                  thumbnail
                  onPress={this.detail.bind(
                    this,
                    item.kode_user,
                    
                  )}
                >
                  
                  <Body>
                    <Text>{item.nama_Lapangan}</Text>
                    <Text numberOfLines={1} note>
                      Nama Custemer : {item.nama_customer}
                    </Text>
                    <Text numberOfLines={2} note>
                      Status Booking : {item.status}
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              )}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.componentDidMount.bind(this)}
                />
            }
            />
        </Content>
        <Footer>
        <Text>
            Sibooking @ 2019
        </Text>
        </Footer>
      </Container>
    );
  }
}
