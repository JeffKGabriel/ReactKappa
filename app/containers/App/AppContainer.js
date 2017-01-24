import React, {PropTypes, Component} from 'react'
import { View, Text } from 'react-native'
import {connect} from 'react-redux'
import { ReactKappaNavigator } from '../../containers'
import {PreSplash} from '../../components'

class AppContainer extends Component{

  static propTypes ={
    isAuthenticating: PropTypes.bool.isRequired,
  }
  static defaultProps ={
    //isAuthenticating: true
  }

  render(){
    return(
      <View style={{flex:1}}>
      {this.props.isAuthenticating === true
        ? <PreSplash />
        : <ReactKappaNavigator />
      }
      </View>
    )
  }
}


function mapStateToProps({authentication}){
  return {
    isAuthenticating : authentication.isAuthenticating
  }
}



export default connect(
  mapStateToProps,
)(AppContainer)
