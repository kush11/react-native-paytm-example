import React from "react";
import { View, Text, TouchableOpacity, Modal, Image , WebView} from "react-native";
// import { WebView } from 'react-native-webview';
export default class App extends React.Component {
  state = {
    showPaypalModal: false,
    showPaytmModal: false,
    ORDER_ID: "ORDER_ID14",
    TXN_AMOUNT: "15",
    CUST_ID: "Kush",
    MID: "bMYLkb94342902372687",
    PAYTM_MERCHANT_KEY: "b0#T#%Cl9&EjGuI6",
    INDUSTRY_TYPE_ID: "Retail",
    ackPaytm: '',
    ackPayPAl: '',
    merchant_id: 'P_01',
    item_name: 'Product',
    item_price: '32',
    currency: 'USD',
    item_quantity: '2',
    item_description: 'Desc'
  };

  handelResponsePaytm = (data) => {
    let objData = [];
    if (data[0] === "{") {
      objData = JSON.parse(data);
    }
    console.log(data);

    if (objData.RESPCODE === '01') {
      this.setState({ showPaytmModal: false, ackPaytm: 'Transaction was successfully' })
    }
    else if (data === 'false') {
      this.setState({ showPaytmModal: false, ackPaytm: 'Oop\'s Something went wrong' });
    }
    else return;
  };
  handelResponsePayPal = (data) => {
    let objData = [];
    if (data[0] === "{") {
      objData = JSON.parse(data);
    }
    console.log(data);

    if (objData.state === 'approved') {
      this.setState({ showPaypalModal: false, ackPayPAl: 'Transaction was successfully' })
    }
    else if (data === 'false') {
      this.setState({ showPaypalModal: false, ackPayPAl: 'Oop\'s Something went wrong' });
    }
    else return;
  };
  render() {
    const {
      ORDER_ID, TXN_AMOUNT, CUST_ID, MID, PAYTM_MERCHANT_KEY, INDUSTRY_TYPE_ID, showPaytmModal, showPaypalModal, ackPayPAl, ackPaytm,
      merchant_id, item_name, item_price, currency, item_description, item_quantity
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: 'black' }}>
          <Text>Pay with Paytm</Text>
          <TouchableOpacity onPress={() => this.setState({ showPaytmModal: true })}>
            <Image
              resizeMode='center'
              style={{ height: 150, width: 150 }}
              source={require('./images/paytm-wallet.png')}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Text>
              {ackPaytm}
            </Text>
          </View>
          <Modal
            visible={showPaytmModal}
            animationType={"slide"}
            onRequestClose={() => this.setState({ showPaytmModal: true })}
          >
            <WebView
              style={{ height: 20 }}
              source={{ uri: 'https://pratiangateway.herokuapp.com/api/paytm/request' }}
              //source={{ uri: 'http://172.30.13.176:3002/api/paytm/request' }}
              injectedJavaScript={`document.getElementById("ORDER_ID").value = "${ORDER_ID}";
            document.getElementById("CUST_ID").value = "${CUST_ID}";
            document.getElementById("TXN_AMOUNT").value = "${TXN_AMOUNT}";
            document.getElementById("MID").value = "${MID}";
            document.getElementById("PAYTM_MERCHANT_KEY").value = "${PAYTM_MERCHANT_KEY}";
            document.getElementById("INDUSTRY_TYPE_ID").value = "${INDUSTRY_TYPE_ID}";`
                // document.f1.submit();
              }
              onNavigationStateChange={data => this.handelResponsePaytm(data.title)}
            />
            <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor: '#f2f2f2' }}>
              <TouchableOpacity onPress={() => this.setState({ showPaytmModal: false })}>
                <Text style={{ fontSize: 25 }}>Close the Payment</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        {/* Paypal */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Pay with Paypal</Text>
          <TouchableOpacity onPress={() => this.setState({ showPaypalModal: true })}>
            <Image
              resizeMode='center'
              style={{ height: 150, width: 150 }}
              source={require('./images/paypal.png')}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Text>
              {ackPayPAl}
            </Text>
          </View>
          <Modal
            visible={showPaypalModal}
            animationType={"slide"}
            onRequestClose={() => this.setState({ showPaypalModal: true })}
          >
            <WebView
              style={{ height: 20 }}
              //https://pratiangateway.herokuapp.com/
              source={{ uri: 'https://pratiangateway.herokuapp.com/api/index' }}
              //source={{ uri: 'http://172.30.13.176:3002/api/paytm/request' }}
            //   injectedJavaScript={`document.getElementById("merchant_id").value ="${merchant_id}";
            // document.getElementById("item_name").value = "${item_name}";
            // document.getElementById("item_price").value = "${item_price}";
            // document.getElementById("currency").value = "${currency}";
            // document.getElementById("item_quantity").value = "${item_quantity}";
            // document.getElementById("item_description").value = "${item_description}";
            // document.f1.submit();`
            //   }
              onNavigationStateChange={data => this.handelResponsePayPal(data.title)}
            />
            <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor: '#f2f2f2' }}>
              <TouchableOpacity onPress={() => this.setState({ showPaypalModal: false })}>
                <Text style={{ fontSize: 25 }}>Close the Payment</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}