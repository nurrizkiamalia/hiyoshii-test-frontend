import ChartFive from "./ChartFive";
import ChartFour from "./ChartFour";
import ChartOne from "./ChartOne";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";

const Charts: React.FC = () => {
    return(
        <div className="flex gap-5 p-5">
            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <ChartTwo />
                    <ChartThree />
                </div>
                <ChartOne />
            </div>
            <div className="flex flex-col gap-3">
                <ChartFour />
                <ChartFive />
            </div>
        </div>
    )
}

export default Charts;