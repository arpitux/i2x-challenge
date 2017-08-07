import React from 'react';
import Axios from 'axios';
import HumanizeDuration from 'humanize-duration';

var instance = Axios.create({
    baseURL: 'https://i2x-challenge.herokuapp.com',
    timeout: 10000
});


export class Dashboard extends React.Component {


    constructor() {
        super();
        this.state = { audios: [] };
    }

    componentDidMount() {

        // Get Audio data
        instance.get('/ai/recording/list/', {
            headers: { 'Authorization': 'JWT ' + localStorage.getItem("i2xToken") }
        }).then(res => {

            const audios = res.data.results;
            console.dir(audios);
            this.setState({ audios });

        }).catch(function(error){

            //If API calls fails go to login
          //  document.getElementById("btn-logout").click();

        });

    }

    logoutClick() {

        //Delete token from local storage
        localStorage.removeItem("i2xToken");

        //Reload page to got to login
        window.location.reload();
    }

    formatDate(audiodate) {
        var date = new Date(audiodate);
        var year = date.getFullYear(),
            month = date.getMonth() + 1, // months are zero indexed
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds(),
            hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
            minuteFormatted = minute < 10 ? "0" + minute : minute,
            morning = hour < 12 ? "am" : "pm";

        debugger;
        return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
            minuteFormatted + morning;
    }

    render() {

        return(
            <div>
                <button id="btn-logout" type="button" onClick={this.logoutClick}>Logout</button>


                    {this.state.audios.length ?
                        this.state.audios.map(audio=><div>

                            <div className="audio-item">
                                <div>{audio.final_script}</div>

                                <div>
                                {Array.apply(null, Array(audio.rating)).map(function(item, i){
                                    return (
                                        <img src="star_yellow.png" height="20" width="20"/>
                                    );
                                }, this)}
                                {Array.apply(null, Array(5 - audio.rating)).map(function(item, i){
                                    return (
                                        <img src="star_gray.png" height="20" width="20"/>
                                    );
                                }, this)}
                                </div>


                                <div>Duration: {HumanizeDuration(audio.duration * 1000)}</div>

                                <div>
                                    <audio width="320" height="240" controls>
                                        <source src={audio.url} type="video/mp4" />
                                    </audio>
                                </div>
                                <div>{this.formatDate(audio.created)}</div>

                            </div>

                        </div>)
                        : <div>Loading...</div>
                    }

            </div>

        );
    }
}
