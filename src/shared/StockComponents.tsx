import {ArrowUpIcon} from "@heroicons/react/24/outline";
import {ArrowDownIcon} from "@heroicons/react/24/outline";

export const PercentChangeFormatter = ({percentChange}: { percentChange: string }) => {
    const rawNum = parseFloat(percentChange)
    const parsedNumber = rawNum.toFixed(2)
    const isNegative = rawNum < 0;

    const plus = isNegative ? "" : "+";
    const style = isNegative ? "text-red-500" : "text-green-500";
    return (
        <div className={`${style} flex flex-row items-center gap-1`}>
            <div>{plus}{parsedNumber}%</div>
            {isNegative ? <ArrowDownIcon className={"size-6"}/> : <ArrowUpIcon className={"size-6"}/>}
        </div>
    )
}