import React from "react";
import {View} from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,List,ListItem } from 'native-base';

export default class AdminScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                    <Title>Menu</Title>
                    </Body>
                    <Right>
                        <Icon
                            onPress={() => this.props.navigation.navigate('Profil')}
                            name='person' style={{fontSize: 20, color: 'white'}}
                        />
                    </Right>
                </Header>
                <Content>
                    <List>
                        <ListItem
                            onPress={() => this.props.navigation.navigate('Lapangan')}
                        >
                            <Text>Lapangan</Text>
                        </ListItem>
                        <ListItem
                            onPress={() => this.props.navigation.navigate('Booking')}
                        >
                            <Text>Booking Status</Text>
                        </ListItem>
                       
                    </List>
                </Content>
            </Container>
        );
    }
}
