import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { WebView } from 'react-native-webview';
export default class App extends React.Component {
  state = {
    showModal: false,
    ORDER_ID: "ORDER_ID143",
    TXN_AMOUNT: "1500",
    CUST_ID: "Kush",
    MID: "bMYLkb94342902372687",
    PAYTM_MERCHANT_KEY: "b0#T#%Cl9&EjGuI6",
    INDUSTRY_TYPE_ID: "Retail",
    ack: ''
  };

  handelResponse = (data) => {
    console.log(data);
    if (data === 'true') {
      this.setState({ showModal: false, ack: 'Transaction was sucessfull' })
    }
    else if (data === 'false') {
      this.setState({ showModal: false, ack: 'Oop\'s Something went wrong' });
    }
    else return;
  };
  render() {
    const { ORDER_ID, TXN_AMOUNT, CUST_ID, MID, PAYTM_MERCHANT_KEY, INDUSTRY_TYPE_ID, showModal, ack } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
          <Text>Pay with Paytm</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <Text>
            {ack}
          </Text>
        </View>
        <Modal        
          visible={showModal}
          animationType={"slide"}
          onRequestClose={() => this.setState({ showModal: true })}
        >
          <WebView     
          style={{height:80}}     
          source={{ uri: 'https://paytmgateway.herokuapp.com/api/paytm/request' }}
            //source={{ uri: 'http://172.30.13.176:3002/api/paytm/request' }}
            injectedJavaScript={`document.getElementById("ORDER_ID").value = "${ORDER_ID}";
            document.getElementById("CUST_ID").value = "${CUST_ID}";
            document.getElementById("TXN_AMOUNT").value = "${TXN_AMOUNT}";
            document.getElementById("MID").value = "${MID}";
            document.getElementById("PAYTM_MERCHANT_KEY").value = "${PAYTM_MERCHANT_KEY}";
            document.getElementById("INDUSTRY_TYPE_ID").value = "${INDUSTRY_TYPE_ID}";
            document.f1.submit();`
            }
            onNavigationStateChange={data => this.handelResponse(data.title)}
          />
          <View style={{justifyContent:"center", alignItems:'center'}}>
          <TouchableOpacity onPress={() => this.setState({ showModal: false })}>
          <Text style={{fontSize:25}}>Close the Payment</Text>
        </TouchableOpacity>        
         </View>
        </Modal>
      </View>
    );
  }
}