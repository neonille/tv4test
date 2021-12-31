import React from "react";
import "./MovieSlider.css"

interface MovieSliderProps {
    changeMovie: (movieLink: string, id: string) => void
    panel: Panel
}

enum ArrowDirection {
    left = "left",
    right = "right"
}

export interface Panel {
    items: PanelItem[],
    title: string
}

export interface PanelItem {
    id: string,
    title: string,
    description: string,
    image: string,
    video: string
}

interface PosterListProps {
    items: PanelItem[]
}

interface DescriptionProps {
    text: string
    posX: number
    posY: number
    visible: boolean
}

interface ArrowProps {
    direction: ArrowDirection
}

interface MovieSliderStates {
    movieDesc: string;
    movieDescX: number;
    movieDescY: number;
    descVisiblility: boolean;
}


export default class MovieSlider extends React.Component<MovieSliderProps, MovieSliderStates>{
    private listRef = React.createRef<HTMLDivElement>();
    private descRef = React.createRef<HTMLDivElement>();


    state: MovieSliderStates = {
        movieDesc: "",
        movieDescX: 0,
        movieDescY: 0,
        descVisiblility: false
    }

    scroll(direction: ArrowDirection) {
        let scrollDirectionValue: number = 100;
        if (this.listRef.current) {
            scrollDirectionValue = (direction === ArrowDirection.left) ? scrollDirectionValue * -1 : scrollDirectionValue;
            this.listRef.current.scrollLeft += scrollDirectionValue;
        }
    }

    render() {
        return (
            <div className="movieSliderContainer">
                <h6>{this.props.panel.title}</h6>
                <div className="posterRow">
                    <this.Arrow direction={ArrowDirection.right}></this.Arrow>
                    <this.Arrow direction={ArrowDirection.left}></this.Arrow>
                    <this.PosterList items={this.props.panel.items}></this.PosterList>
                </div>
                <this.Description
                    posX={this.state.movieDescX}
                    posY={this.state.movieDescY}
                    text={this.state.movieDesc}
                    visible={this.state.descVisiblility}
                ></this.Description>
            </div >
        );
    }

    private Arrow = (props: ArrowProps) => {
        const direction = props.direction;
        return (
            <div className={`scrollArrow ${direction}`} onClick={() => { this.scroll(props.direction) }}>
                &#10132;
            </div>
        )
    }

    private PosterList = (props: PosterListProps) => {
        const item = props.items;
        const listItems = item.map((item: PanelItem) =>
            <div key={item.id}>
                <img
                    className="poster"
                    src={item.image}
                    onClick={() => { this.props.changeMovie(item.video, item.id) }}
                    onMouseEnter={() => { this.setState({ movieDesc: item.description, descVisiblility: true }) }}
                    onMouseMove={(e) => { this.setState({ movieDescX: e.pageX, movieDescY: e.pageY }) }}
                    onMouseLeave={() => { this.setState({ descVisiblility: false }) }}

                />
                <p className="posterText">{item.title}</p>
            </div>
        );
        return (
            <div ref={this.listRef} className="posterList"> {listItems}</div>
        );
    }

    private Description = (props: DescriptionProps) => {
        const text: string = props.text;
        const descWidth: number = 250;
        const offset: number = 10;
        const [x, y] = this.getDescPos(props.posX, props.posY, offset, descWidth);
        if (this.descRef.current) {
            this.descRef.current.style.left = x + "px"
            this.descRef.current.style.top = y + "px"
        }
        if (this.state.descVisiblility) {
            return (
                <div ref={this.descRef} className="description">
                    <p>{text}</p>
                </div>
            )
        } else {
            return null;
        }
    }

    private getDescPos(mouseX: number, mouseY: number, offset: number, width: number): [number, number] {
        let x: number;
        let y: number;
        if (mouseX >= (window.innerWidth - (width + offset + 20))) {
            x = mouseX - (width + offset)
        } else {
            x = mouseX;
        }
        y = mouseY + offset;
        return [x, y];
    }

}
