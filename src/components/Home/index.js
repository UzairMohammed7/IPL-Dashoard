import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {getAllTeams: [], isLoading: true}

  componentDidMount() {
    this.getAllTeamsCard()
  }

  getAllTeamsCard = async () => {
    const response = await fetch(`https://apis.ccbp.in/ipl`)
    const data = await response.json()

    const formattedTeamData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({getAllTeams: formattedTeamData, isLoading: false})
  }

  renderTeamCard = () => {
    const {getAllTeams} = this.state

    return (
      <ul className="team-lists">
        {getAllTeams.map(eachTeam => (
          <TeamCard key={eachTeam.id} eachTeamData={eachTeam} />
        ))}
      </ul>
    )
  }

  renderSpin = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )
  //

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="logo-and-title">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1 className="title">IPL Dashboard</h1>
        </div>
        <div className="page">
          {isLoading ? this.renderSpin() : this.renderTeamCard()}
        </div>
      </div>
    )
  }
}
export default Home
