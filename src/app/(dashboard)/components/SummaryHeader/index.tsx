import { Weight, ReceiptText, Package } from "lucide-react";

const summaryData = [
    {
        name: "Total Gross Weight",
        icon: <Weight />,
        value: 25,
    },
    {
        name: "Total Reject Weight",
        icon: <ReceiptText />,
        value: 1,
    },
    {
        name: "Total Packed Quantity",
        icon: <Package />,
        value: 24,
    },
]

const SummaryHeader: React.FC = () => {
    return(
        <div className="w-full flex flex-col md:flex-row md:items-center gap-3 p-3">
            {summaryData.map((item, index) => (
                <div className="w-full md:max-w-sm p-3 border rounded-xl" key={index}>
                    <div className="flex items-center justify-between">
                        <h3>{item.name}</h3>
                        {item.icon}
                    </div>
                    <p className="font-bold text-xl">{item.value}kg</p>
                </div>
            ))}
        </div>
    )
}

export default SummaryHeader;