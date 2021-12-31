import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer"
import MovieSlider from './Components/MovieSlider/MovieSlider';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';
import { Panel } from "./Components/MovieSlider/MovieSlider"

ReactDOM.render(
    <React.StrictMode>
        <MoviesApp></MoviesApp>
    </React.StrictMode>,
    document.getElementById('root')
);



export function MoviesApp() {
    const [loading, setLoading] = useState(true);
    const [panels, setPanels] = React.useState<Panel[]>();
    const [videoSrc, setVideoSrc] = React.useState("");
    const [videoId, setVideoId] = React.useState("");

    const changeMovie = (movieLink: string, id: string) => {
        setVideoSrc(movieLink);
        setVideoId(id);
    }

    useEffect(() => {
        fetch("https://gist.githubusercontent.com/jocke138/056a510a33af4d87f1b39d88a6f9dc67/raw/6fe88083f996162a5c335bd4ec7278cdcf2eef78/movies.json")
            .then(response => response.json())
            .then((response) => {
                setTimeout(() => {  //Fake a loading time to fetch list of movies
                    setPanels(response.panels);
                    setLoading(false);
                }, 2000);

            }).catch((e) => {
                console.error("Could not get movie file", e);
            });
    }, []); //[] makes sure it only runs once

    if (!loading && panels) {
        const movieSliders = panels.map((panel) => {
            return (
                <div key={panel.title} className='movieSlider'>
                    <MovieSlider changeMovie={changeMovie} panel={panel}></MovieSlider>
                </div>
            )
        });
        return (
            <div className='movieApp'>
                <VideoPlayer videoSource={videoSrc} id={videoId} />
                {movieSliders}
            </div>
        )
    } else {
        return <LoadingSpinner msg="Loading movies.."></LoadingSpinner>
    }
}