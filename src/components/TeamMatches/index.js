import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {PieChart, Pie, Legend, Cell, Tooltip} from 'recharts'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatches: [], isLoading: true}

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()

    const formattedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        umpires: fetchedData.latest_match_details.umpires,
        result: fetchedData.latest_match_details.result,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        id: fetchedData.latest_match_details.id,
        date: fetchedData.latest_match_details.date,
        venue: fetchedData.latest_match_details.venue,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        firstInnings: fetchedData.latest_match_details.first_innings,
        secondInnings: fetchedData.latest_match_details.second_innings,
        matchStatus: fetchedData.latest_match_details.match_status,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatchTeams => ({
        umpires: recentMatchTeams.umpires,
        result: recentMatchTeams.result,
        manOfTheMatch: recentMatchTeams.man_of_the_match,
        id: recentMatchTeams.id,
        date: recentMatchTeams.date,
        venue: recentMatchTeams.venue,
        competingTeam: recentMatchTeams.competing_team,
        competingTeamLogo: recentMatchTeams.competing_team_logo,
        firstInnings: recentMatchTeams.first_innings,
        secondInnings: recentMatchTeams.second_innings,
        matchStatus: recentMatchTeams.match_status,
      })),
    }
    this.setState({teamMatches: formattedData, isLoading: false})
  }

  renderSpin = () => (
    // eslint-disable-next-line
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderMatchCard = () => {
    const {teamMatches} = this.state
    const {recentMatches} = teamMatches
    return (
      <ul className="match-list">
        {recentMatches.map(eachMatchCard => (
          <MatchCard
            key={eachMatchCard.id}
            eachMatchCardDetails={eachMatchCard}
          />
        ))}
      </ul>
    )
  }

  renderTeamStatistics = () => {
    const {teamMatches} = this.state
    const {recentMatches} = teamMatches

    let wins = 0
    let losses = 0
    let draws = 0

    recentMatches.forEach(match => {
      if (match.matchStatus === 'Won') wins += 1
      else if (match.matchStatus === 'Lost') losses += 1
      else if (match.matchStatus === 'Draw') draws += 1
    })

    const data = [
      {name: 'Won', value: wins},
      {name: 'Lost', value: losses},
      {name: 'Draw', value: draws},
    ]

    const COLORS = ['#18ed66', '#e31a1a', '#FFBB28']
    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5
      const x = cx + radius * Math.cos(-midAngle * RADIAN)
      const y = cy + radius * Math.sin(-midAngle * RADIAN)
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      )
    }
    return (
      <div>
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </div>
    )
  }

  onClickBackBtn = () => {
    const {history} = this.props
    history.push('/')
  }

  renderTeamMatches = () => {
    const {teamMatches} = this.state
    const {latestMatchDetails, teamBannerUrl} = teamMatches
    return (
      <>
        <button
          onClick={this.onClickBackBtn}
          type="button"
          className="back-btn"
        >
          Back
        </button>
        <div className="banner-img-container">
          <img src={teamBannerUrl} alt="team banner" className="banner-img" />
          <LatestMatch eachlatestMatchDetails={latestMatchDetails} />
          {this.renderTeamStatistics()}
          {this.renderMatchCard()}
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`team-match-container ${id}`}>
        {isLoading ? this.renderSpin() : this.renderTeamMatches()}
      </div>
    )
  }
}
export default TeamMatches
