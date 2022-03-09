import React, { Component } from 'react'
import TeamsAPI from "../../config/TeamsAPI"
import { Link } from 'react-router-dom'

export class Teams extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      Response: '',
      display: 'none'
    };
  }

  componentDidMount(){
    TeamsAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        teams: res.data
      })
    })

    console.log(this.state.teams)
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Daftar Team</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Teams</a></li>
              <li className="breadcrumb-item active" aria-current="page">Team Lists</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Striped Table</h4>
                <div className="row">
                  <div className="col-lg-10">
                    <p className="card-description"> Add className <code>.table-striped</code>
                    </p>
                  </div>
                  <div className="col-lg-2">
                    <Link className="btn btn-success pl-4 pr-4" to="/teams/add">
                      Add Team
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Photo </th>
                        <th> Name </th>
                        <th> Description </th>
                        <th> Place and Date Birth </th>
                        <th> Position </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.teams.map(team =>
                        <tr>
                          <td className="py-1">
                            <img src={require("../../assets/images/faces/face4.jpg")} alt="user icon" />
                          </td>
                          <td> {team.name} </td>
                          <td> {team.desc} </td>
                          <td> {team.placeBirth}, {team.dateBirth} </td>
                          <td> {team.position} </td>
                          <td> 
                              <a href="#" className="btn btn-outline-warning mr-2"> Edit </a> 
                              <a href="#" className="btn btn-outline-danger ml-2"> Delete </a> 
                          </td>                        
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Teams
