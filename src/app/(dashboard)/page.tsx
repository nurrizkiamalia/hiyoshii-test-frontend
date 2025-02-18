import Image from "next/image";
import SummaryHeader from "./components/SummaryHeader";
import Charts from "./components/Charts";

export default function Home() {
  return (
    <div className="flex flex-col gap-3">
      <div className="mt-2 p-3">
        <h2 className="font-semibold text-2xl text-dspPrimary">
          Dashboard
        </h2>
        <p className="text-gray-500">
          Informasi mengenai statistik inventory dengan grafik.
        </p>
      </div>
      <hr />
      <div>
        <Charts />
      </div>
    </div>
  );
}
