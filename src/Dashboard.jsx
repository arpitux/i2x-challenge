import React from 'react';
import Axios from 'axios';
import Moment from 'moment';

var instance = Axios.create({
    baseURL: 'https://i2x-challenge.herokuapp.com',
    timeout: 5000
});


export class Dashboard extends React.Component {


    constructor() {
        super();
        this.state = { audios: [] };
    }

    componentDidMount() {

        instance.get('/ai/recording/list/', {
            headers: { 'Authorization': 'JWT ' + localStorage.getItem("i2xToken6") }
        }).then(res => {

            const audios = res.data.results;
            console.dir(audios);
            this.setState({ audios });
        });

    }

    logoutClick() {

        localStorage.removeItem("i2xToken6");
        window.location.reload();
    }

    render() {

        return(
            <div>
                <button type="button" onClick={this.logoutClick}>Logout</button>


                    {this.state.audios.length ?
                        this.state.audios.map(audio=><div>

                            <div className="audio-item">
                                <div>{audio.final_script}</div>

                                <div>
                                {Array.apply(null, Array(audio.rating)).map(function(item, i){
                                    return (
                                        <img src="image/star_yellow.png" height="20" width="20"/>
                                    );
                                }, this)}
                                {Array.apply(null, Array(5 - audio.rating)).map(function(item, i){
                                    return (
                                        <img src="image/star_gray.png" height="20" width="20"/>
                                    );
                                }, this)}
                                </div>


                                <div>Duration: {Moment.duration(audio.duration,'seconds').humanize()}</div>

                                <div>
                                    <audio width="320" height="240" controls>
                                        <source src={audio.url} type="video/mp4" />
                                    </audio>
                                </div>
                                <div>{Moment(audio.created).format("LLLL")}</div>

                            </div>

                        </div>)
                        : <div>Loading...</div>
                    }

            </div>

        );
    }
}
