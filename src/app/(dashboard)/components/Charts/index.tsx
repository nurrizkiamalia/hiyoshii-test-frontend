import ChartFive from "./ChartFive";
import ChartFour from "./ChartFour";
import ChartOne from "./ChartOne";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";

const Charts: React.FC = () => {
    return(
        <div className="flex flex-col lg:flex-row gap-5 p-5 w-full">
            <div className="flex flex-col gap-3 w-full lg:w-[65%]">
                <ChartOne />
                <div className="flex flex-col md:flex-row gap-3 w-full h-full">
                    <div className="w-full">
                        <ChartTwo />
                    </div>
                    <div className="w-full">
                        <ChartThree />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-[35%]">
                <ChartFour />
                <ChartFive />
            </div>
        </div>
    )
}

export default Charts;