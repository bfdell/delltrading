import {AdjustmentsVerticalIcon} from "@heroicons/react/24/outline";
import {USDollar} from "../../shared/UseStockAPI";
import {Bars3Icon} from "@heroicons/react/24/outline";
import {EllipsisHorizontalCircleIcon} from "@heroicons/react/24/solid";
import React from "react";

export const StockChart = () => {
    return (
        <div className={"basis-4/5"}>

            <div id={"title&buy"} className={"mb-4 flex flex-row items-center justify-between"}>
                <div className={"text-4xl mb-2 font-bold"}>Your Stock:</div>
                <button
                    className={"basis-1/6 text-black text-lg transition-all ease-in-out hover:bg-green-300 bg-green-600 btn btn-wide mr-4"}>Buy
                </button>
            </div>
            <div className="overflow-x-auto rounded-xl bg-gray-600
                ">
                <table className="table text-black font-bold">
                    {/* head */}
                    <thead>
                    <tr className={"hover:bg-gray-500 text-gray-300 text-lg"}>
                        <th></th>
                        <th className={"w-1/5"}>Ticker</th>
                        <th className={"w-2/5"}>Company Name</th>
                        <th className={"w-1/5"}>Price</th>
                        <th className={"w-1/5"}>Shares</th>
                        <th className={"w-1/5"}>Total Value</th>
                        <th className={""}></th>
                    </tr>
                    </thead>

                    <tbody>
                    <StonkRow index={0} ticker={"GOOG"} name={"Alphabet"} shares={23} price={420.69}/>
                    {/* row 1 */}
                    <tr className={"hover:bg-gray-500"}>
                        <th className={"text-lg text-gray-300"}>
                            <div className={"flex flex-row items-center justify-start"}>
                                <div>1</div>
                            </div>
                        </th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr className="hover:bg-gray-500">
                        <th className={"text-lg text-gray-300"}>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr className={"hover:bg-gray-500"}>
                        <th className={"text-lg text-gray-300"}>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
};

//for buy and sell make a seelct box that you can search in

const StonkRow = ({index, ticker, name, shares, price}: any) => {
    return (
        <tr className={"hover:bg-gray-500"}>
            <th className={"text-lg text-gray-300"}>
                <div>{index}</div>
            </th>
            <td>{ticker}</td>
            <td>{name}</td>
            <td>{USDollar.format(price)}</td>
            <td>{shares}</td>
            <td>{USDollar.format(shares * price)}</td>
            <td className={"dropdown dropdown-bottom dropdown-end"}><Bars3Icon tabIndex={0} role="button"
                                                                               className={"size-6"}/>
                <ul tabIndex={0}
                    className="cursor-pointer w-36 bg-gray-800 transition-all ease-in-out dropdown-content z-[1] menu p-2 shadow rounded-xl">
                    <li className={"py-3 mb-1 rounded-xl text-center w-full hover:bg-green-300 bg-green-600 font-bold"}>Buy</li>
                    <li className={"py-3 rounded-xl text-center w-full hover:bg-red-300 bg-red-600 font-bold"}>Sell</li>
                </ul>

            </td>

        </tr>
    );
}
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAgCAMAAABw3UvaAAAAn1BMVEX///+VlZX5+fno6OiKioqQkJDf39/j4+OkpKSfn5+ZmZnDw8O8vLx7e3vc3Nxvb2/JyckAnu7/twD/79P4qZrwKQDxNgDpqINmtQBwswCCuyX5saLyRgvyUCLzRxTrsJB2uwB/ugCOwT/7VBn7XCp6wSKRxlGzs7O54vxlw/nD4O3/0Gr/0HX/1Yea0/enz+H/vzliYmIBpO/o9P3R6vtO9W2ZAAAA00lEQVQ4je3QW0/CQBCG4TnsYWh3t9MqKhVFRKhVxAP9/7/NXuiNNCa9MTHpez1PvmQApqb+Wefzi/nl1WJRj4XXy5vb1d16fQ/gPAAnzyc3osNw+QWzAiAa9j9P3IxwAG4eNqttXe96mCVGVM2jNCYYixyFommyaIv8BD62bfv0vN+/AKBHSTbXfliSBsA8siQokgwtHsqP8rWqqjcAS9aQ6SGReJ1BZHpvAhROyPwKA7lEITnGoAzBJo8Kgsw69J5DWX7DcR27rjue9Y2FU1N/0ycFpQ50nRvlWQAAAABJRU5ErkJggg==
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAgCAMAAABw3UvaAAAAn1BMVEX///+VlZX5+fno6OiKioqQkJDf39/j4+OkpKSfn5+ZmZnDw8O8vLx7e3vc3Nxvb2/JyckAnu7/twD/79P4qZrwKQDxNgDpqINmtQBwswCCuyX5saLyRgvyUCLzRxTrsJB2uwB/ugCOwT/7VBn7XCp6wSKRxlGzs7O54vxlw/nD4O3/0Gr/0HX/1Yea0/enz+H/vzliYmIBpO/o9P3R6vtO9W2ZAAAA00lEQVQ4je3QW0/CQBCG4TnsYWh3t9MqKhVFRKhVxAP9/7/NXuiNNCa9MTHpez1PvmQApqb+Wefzi/nl1WJRj4XXy5vb1d16fQ/gPAAnzyc3osNw+QWzAiAa9j9P3IxwAG4eNqttXe96mCVGVM2jNCYYixyFommyaIv8BD62bfv0vN+/AKBHSTbXfliSBsA8siQokgwtHsqP8rWqqjcAS9aQ6SGReJ1BZHpvAhROyPwKA7lEITnGoAzBJo8Kgsw69J5DWX7DcR27rjue9Y2FU1N/0ycFpQ50nRvlWQAAAABJRU5ErkJggg==
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAUVBMVEX///9mZmZeXl5iYmJXV1daWlqlpaXBwcH8/Py0tLRubm6rq6vw8PCIiIiBgYHc3Nz29vbQ0NCfn590dHTj4+OQkJDq6upSUlKWlpbHx8e6urpx1ZffAAABmElEQVRIib2W65KDIAyFIQQvULRg1db3f9AFu91tazTQmd38ZOabE5KTgBB/GX3dfECdg9bzuZyrUUkJ5YoVyhimmLM6cepayvlVT2pfyDVq5coztbByWCoo7noQSrnLekNwpZy4pUz1WMyJBUHLupwTfbD5ZTnVYXTXZfo5aHrrBjM42x9hF4egYgAae0kHfgQNqZvqMGuL3x1PxURTBaV/D2Kdup0hcVq+hFLy7UCeKG4EyYUyxHy1muViDtsSTchz4AhB934hQo8y3zTzguR0WV4QSQsYPtGO4k58aYA0jud7gRMF1nzzgeJEy4PyU5BedRmg+hREcqZyikOukZ5vhyLXXYYBdhrJW3XHcxlTJXVLgEuGAyQSds1ZAJGstiQ/VynAbJqS49ZEbl71c1au1Bq4ZtSVtHpWefSN6MiYI0lwObYjBTMKS5suxsAki+RjlZI9Hi6kE03hj6657f3zNZ9JBc9PK+xd8B4WHxAOwYYOH485w6VfUdSBuavvhWh8iN8HgJmYiw0aKv/ygPaLbcm18b/xBf8tD08u8Xy+AAAAAElFTkSuQmCC