import React,{Component} from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,FlatList,ActivityIndicator ,Image,ToastAndroid,TouchableOpacity} from 'react-native';
import {createStackNavigator, createAppContainer,createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { Audio} from 'expo-av';
import { Icon } from 'react-native-elements';

class Nepali extends Component {
  
  constructor() {
    super();
    this.state = {
      datasource: [],
      link:[],

    };
  }

  componentDidMount() {
    axios.get('http://51.75.23.214/tv/public/api/v1/fms', {
         
    })
    .then(async response => {
      // console.log(response,'Success');
      item=response.data[0].fms
      // console.log(item)
      this.setState({
        datasource: response.data[0].fms
      })
     
      
    })
    .catch(function (error) {
      console.log(error);
      this.setState({ error, loading: false });
    });
  }

  handleGetPlayingUrl = async (id) => {
    Audio.setIsEnabledAsync(true);
    const link = await axios.get(`http://51.75.23.214/tv/public/api/v1/fms/${id}/playable`)
      .then(res => res.data)
      .then(res => res.link);
    console.log(link);
    if (!this.soundObject) this.soundObject = new Audio.Sound();
    else {
      await this.soundObject.unloadAsync()
    }
    this.soundObject.loadAsync(
        { uri: link },
        { shouldPlay: true },
        {staysActiveInBackground:true}
    );
   
  }
  
  renderItem=({ item })=>{
    return(
      <View style={{flex:1, flexDirection:"row", margin:2,borderColor:'black',borderWidth:0.5}}>
      <Image style={{width:100, height:100}}
      source={{uri:item.image}}
      />
      <View style={{flex:1, justifyContent:'space-evenly',marginLeft:20}}>
        <Text style={{fontWeight:'bold', fontSize:15,color:'#007AB9'}}>
          {item.name}
        </Text>

      </View>
      <View style={{justifyContent:"center", margin:10}}>
      <TouchableOpacity onPress={() => this.handleGetPlayingUrl(item.id)}>  
      <Image style={{width:30,height:30}}
        source={require('./assets/play.png')}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>Audio.setIsEnabledAsync(false)}>  
      <Image style={{width:30,height:30}}
        source={require('./assets/pause.png')}
      />
      </TouchableOpacity>
      </View>

    </View>
    )
   
  }
  render() {
    return (
      <View style={styles.container}>
        
        <FlatList
          data={this.state.datasource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) =>`${index}`}
        />
        <ActivityIndicator/>
      </View>
    )
  }
}



//New class
class Dominican extends Component {
  constructor() {
    super();
    this.state = {
      datasource: [],
      link:[],

    };
  }

  componentDidMount() {
    axios.get('http://51.75.23.214/tv/public/api/v1/fms', {
         
    })
    .then(async response => {
      // console.log(response,'Success');
      item=response.data[0].fms
      // console.log(item)
      this.setState({
        datasource: response.data[1].fms
      })
     
      
    })
    .catch(function (error) {
      console.log(error);
      this.setState({ error, loading: false });
    });
  }

  handleGetPlayingUrl = async (id) => {
    Audio.setIsEnabledAsync(true);
    const link = await axios.get(`http://51.75.23.214/tv/public/api/v1/fms/${id}/playable`)
      .then(res => res.data)
      .then(res => res.link);
    console.log(link);
    if (!this.soundObject) this.soundObject = new Audio.Sound();
    else {
      await this.soundObject.unloadAsync()
    }
    this.soundObject.loadAsync(
        { uri: link },
        { shouldPlay: true },
        {staysActiveInBackground:true}
    );
   
  }
  
  renderItem=({ item })=>{
    return(
      <View style={{flex:1, flexDirection:"row", margin:2,borderColor:'black',borderWidth:0.5}}>
      <Image style={{width:100, height:100}}
      source={{uri:item.image}}
      />
      <View style={{flex:1, justifyContent:'space-evenly',marginLeft:20}}>
        <Text style={{fontWeight:'bold', fontSize:15,color:'#007AB9'}}>
          {item.name}
        </Text>

      </View>
      <View style={{justifyContent:"center", margin:10}}>
      <TouchableOpacity onPress={() => this.handleGetPlayingUrl(item.id)}>  
      <Image style={{width:30,height:30}}
        source={require('./assets/play.png')}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>Audio.setIsEnabledAsync(false)}>  
      <Image style={{width:30,height:30}}
        source={require('./assets/pause.png')}
      />
      </TouchableOpacity>
      </View>

    </View>
    )
   
  }
  render() {
    return (
      <View style={styles.container}>
        
        <FlatList
          data={this.state.datasource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) =>`${index}`}
        />
        <ActivityIndicator/>
      </View>
    )
  }
}

const tabNavigator=createBottomTabNavigator({
  Nepali:{
    screen:Nepali,
    navigationOptions:{
      tabBarIcon:({activeTintColor})=>{
        <Icon name='ios-home' color={activeTintColor} size={24}/>
      }
    }
  },
  Dominican
},
{
  
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: '#4267B2',
    labelStyle: {
      fontSize: 15,
      fontWeight:'bold',
      margin:5,  
    },
  }, 
}
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

const RootStack = createStackNavigator(
  {
    
    Home:{
      screen:tabNavigator,
      navigationOptions:{
        title:'Free Radio',
        headerStyle: {
          backgroundColor: '#4267B2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }
    },
    
  }, 
);



const AppContainer = createAppContainer(RootStack);

export default AppContainer;
