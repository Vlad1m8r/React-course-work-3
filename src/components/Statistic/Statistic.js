import React from 'react';
import {BarChart} from "recharts";
import {Bar, Pie, Radar, Doughnut, PolarArea, Bubble, Scatter} from 'react-chartjs-2'
import {useSelector} from "react-redux";

const Statistic = () => {
    const carsStatic = useSelector(state => state.carsData.carsStatic)
    // debugger
    return (
        <div className="main">
            <div className="content">
                <Bar

                    data={
                        {

                            labels: [
                                "Средний",
                                "Бизнес",
                                "Премиум",
                            ],
                            datasets: [
                                {
                                    label: "Типы машин",
                                    data: [carsStatic.Средний, carsStatic.Бизнес, carsStatic.Премиум],
                                    backgroundColor: [
                                        "#FF6384",
                                        "#242240",
                                        "#84FF63",
                                    ]
                                }],


                        }}

                    type={"pie"}
                    height={400}
                    width={600}

                    options={{
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    );
};

export default Statistic;