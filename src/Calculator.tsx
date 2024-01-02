import { useState, useEffect } from "react";
import api from './assets/list.json';
import './Calculator.css';

type Rate = {
    id: string;
    lastAvg: number | null;
    targetName: string;
    baseLocalizedName: string;
    targetLocalizedName: string;
    basePrecision: number;
    targetPrecision: number;
};



export function Calculator() {
    const [ask, setAsk] = useState<string>("");
    const [data, setData] = useState<Rate>();

    useEffect(() => setData(api.items[0]), [])
    console.log(data)

    return (
        <div className="centered-form">

            <div className="container">
                <form className="whole-card" name="card">
                    <div className="pay">
                        <label className="form-label" htmlFor="ask-amount">پرداخت میکنم
                        </label>
                        <div className="user-input">
                            <input defaultValue={ask} onChange={(e) => setAsk(e.target.value)} type="text" id="ask-amount" name="ask-amount" maxLength={18} />
                            <button className="ask">
                                <span>{data?.baseLocalizedName}</span>
                            </button>
                        </div>
                        <div className="get">
                            <label className="form-label" htmlFor="you-get">
                                دریافت میکنم
                            </label>
                            <div className="user-output">
                                <input type="text" readOnly defaultValue='' value={data?.lastAvg && !isNaN(parseInt(ask))? (parseInt(ask) * data.lastAvg).toFixed(data?.targetPrecision) : ''} maxLength={18} />
                                <button>
                                    <span>{data?.targetLocalizedName}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}