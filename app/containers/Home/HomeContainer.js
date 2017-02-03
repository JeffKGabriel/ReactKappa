import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {Home} from '../../components'
import {incrementAndHandleScore, decrementAndHandleScore} from '../../redux/modules/scores'

function secondsToHMS (secs) {
  const hours = Math.floor(secs / 3600)
  const mins = Math.floor(secs % 3600 / 60)
  const seconds = Math.floor(secs % 3600 % 60)
  return ((hours > 0 ? hours + ":" + (mins < 10 ? "0" : "") : "") + mins + ":" + (seconds < 10 ? "0" : "") + seconds)
}

class HomeContainer extends Component{

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    timerDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }

  state={
    timer: this.props.timerDuration,
    rest: this.props.restDuration,
    activeCountdown: 'timer',
    countdownRunning: false,
  }

  componentWillReceiveProps(nextProps){
    if(this.props.timerDuration !== nextProps.timerDuration){
      this.setState({
        timer: nextProps.timerDuration
      })
    }
    if(this.props.restDuration !== nextProps.restDuration){
      this.setState({
        rest: nextProps.restDuration
      })
    }
  }

  handleToggleCountdown =() =>{
    if(this.state.countdownRunning){
      this.setState({countdownRunning:false})

      this.props.dispatch(decrementAndHandleScore(5))

      return window.clearInterval(this.interval)
    }

    this.setState({
      countdownRunning: true,
    })

    this.interval = setInterval( ()=> {
      const activeCountdown = this.state.activeCountdown
      const nextSecond = this.state[activeCountdown] - 1

      if(nextSecond === 0){
        this.setState({
          [activeCountdown] : activeCountdown === 'timer'
            ? this.props.timerDuration
            : this.props.restDuration,
          activeCountdown : this.state.activeCountdown === 'timer' ? 'rest' : 'timer'
        })

        this.props.dispatch(incrementAndHandleScore(5))

      } else{
        this.setState({
          [activeCountdown] : nextSecond,
          countdownRunning : true
        })
      }

      if(nextSecond % 60 === 0){
        this.props.dispatch(incrementAndHandleScore(1))

      }

    },1000)

  }

  handleReset =() =>{
    window.clearInterval(this.interval)
    this.setState({
      timer: this.props.timerDuration,
      rest: this.props.restDuration,
      activeCountdown: 'timer',
      countdownRunning: false,
    })

    this.props.dispatch(decrementAndHandleScore(5))
  }

  handleSkipRest=()=>{
    this.setState({
      rest: this.props.restDuration,
      activeCountdown: 'timer',
    })
  }


  handleToSettings= () => {
    this.props.navigator.push({
      settings:true
    })
  }

  getProgress = () => {
    return this.state.activeCountdown === 'timer'
      ? 1 - (this.state.timer / this.props.timerDuration)
      : 1 - (this.state.rest / this.props.restDuration)
  }

  render(){
    return(
      <Home
         score={this.props.score}
         countdownRunning={this.state.countdownRunning}
         timer ={ secondsToHMS(this.state.timer) }
         rest = { secondsToHMS(this.state.rest) }
         activeCountdown = {this.state.activeCountdown}
         onReset={this.handleReset}
         onSkipRest={this.handleSkipRest}
         progress={this.getProgress()}
         onToggleCountdown = {this.handleToggleCountdown}
         handleToSettings = {this.handleToSettings} />
    )
  }
}

mapStateToProps = ({settings, scores, authentication}) =>{
  return{
    timerDuration: settings.timerDuration * 60,
    restDuration: settings.restDuration * 60,
    score: scores.usersScores[authentication.authedId],
  }
}

export default connect(
  mapStateToProps
)(HomeContainer)
