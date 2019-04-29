import React from "react";
import { View, Text, TouchableOpacity, Modal, WebView } from "react-native";

export default class App extends React.Component {
  state = {
    showModa: false,
    ORDER_ID: "KUSH66634",
    TXN_AMOUNT: "500",
    CUST_ID: "Kush",
    ack:''
  };

  handelResponse = (data) => {
    console.log(data);
    if(data === 'true')
    {
      this.setState({showModa:false, ack:'Transaction was sucessfull'})
    }
    else if(data === 'false'){
      this.setState({showModa:false, ack:'Oop\'s Something went wrong'});
    }
    else return;
  };
  render() {
    const { ORDER_ID, TXN_AMOUNT, CUST_ID, showModa, ack } = this.state;
    return (
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => this.setState({ showModa: true })}>
          <Text>Pay with Paytm</Text>
        </TouchableOpacity>
        <View style={{marginTop:10}}>
          <Text>
            {ack}
          </Text>
        </View>
        <Modal
          visible={showModa}
          onRequestClose={() => this.setState({ showModa: true })}
        >
          <WebView
            source={{uri: '192.168.31.1:3001/api/paytm/request'}}            
            injectedJavaScript={`document.getElementById('ORDER_ID).value="${ORDER_ID}";
                document.getElementById('CUST_ID).value="${CUST_ID}";
                document.getElementById('TXN_AMOUNT).value="${TXN_AMOUNT}";
                document.f1.submit()`}
            onNavigationStateChange={data => this.handelResponse(data.title)}
          />          
        </Modal>
      </View>
    );
  }
}
