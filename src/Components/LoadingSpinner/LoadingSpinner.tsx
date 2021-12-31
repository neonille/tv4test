import ClipLoader from "react-spinners/ClipLoader";
import "./LoadingSpinner.css"

interface SpinnerProps {
    msg: string
}

const override = `
  display: block;
  margin: 0 auto;
`;

const LoadingSpinner = ({ msg }: SpinnerProps) => {
    return (
        <div className="spinnerContainer">
            <ClipLoader color={"#ffffff"} css={override} loading={true} size={150} />
            <h3 className="loadingText">{msg}</h3>
        </div>
    )
}

export default LoadingSpinner;