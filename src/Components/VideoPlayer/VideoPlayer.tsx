import React from "react";
import "./VideoPlayer.css"

interface VideoProps {
    videoSource: string | undefined
    id: string
}

interface VideoStates {
    hideControls: boolean
    idOfVideo: string;
}

export default class VideoPlayer extends React.Component<VideoProps, VideoStates> {
    private videoRef = React.createRef<HTMLVideoElement>();
    state: VideoStates = {
        hideControls: false,
        idOfVideo: ""
    };
    render() {
        return (
            <div
                className="videoContainer"
                onMouseLeave={() => this.showControls(false)}
                onMouseEnter={() => this.showControls(true)}
            >
                <video controls ref={this.videoRef} className="videoPlayer">
                </video>
                <div className={`videoControls ${this.state.hideControls ? "" : "hide"}`}>
                    <button type="button" className="videoButton" onClick={(e) => { this.PlayOrPause(e) }}> &#x23F5; </button>
                    <input type="range" min="0" max="1" step="0.1"></input>
                </div>
            </div>
        );
    }
    componentDidUpdate(props: VideoProps) {
        const video = this.videoRef.current;
        if (props.id != this.props.id && video) {
            video.src = this.props.videoSource as string;
            video.load();
            this.setState({ idOfVideo: props.id })
        }
    }

    private showControls(state: boolean) {
        this.setState({ hideControls: false });
    }
    private PlayOrPause(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (this.videoRef.current?.paused) {
            this.videoRef.current.play();
            e.currentTarget.textContent = "⏸︎";
        } else {
            this.videoRef.current?.pause();
            e.currentTarget.textContent = "⏵︎";
        }
    }
}