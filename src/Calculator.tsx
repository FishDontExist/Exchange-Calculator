import { useState, useEffect } from "react";
import api from './assets/list.json';
import './Calculator.css';

type Rate = {
    id: string;
    lastAvg: number | null;
    baseName: string;
    targetName: string;
    baseLocalizedName: string;
    targetLocalizedName: string;
    basePrecision: number;
    targetPrecision: number;
};

export function Calculator() {
    const [ask, setAsk] = useState<string>("");
    const [selectedCurrency, setSelectedCurrency] = useState<Rate | null>(api.items[0]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // useEffect(() => {
    //     // Set the initial selected currency to the first item in the API response
    //     setSelectedCurrency(selectedCurrency === null ? api.items[0] : selectedCurrency);
    // }, [selectedCurrency]);

    const handleSelectCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = api.items.find(item => item.id === event.target.value);
        if (selected) {
            setSelectedCurrency(selected);
        }
        setShowDropdown(false);
    };

    return (
        <div className="container">
            <form className="whole-card" name="card">
                <div className="pay">
                    <label className="form-label" htmlFor="ask-amount">پرداخت میکنم</label>
                    <div className="user-input">
                        <input defaultValue={ask} onChange={(e) => setAsk(e.target.value)} type="number" id="ask-amount" name="ask-amount" maxLength={18} />
                        <button type="button" className="btn" onClick={() => setShowDropdown(!showDropdown)}>
                            <span>{selectedCurrency?.baseLocalizedName}</span>
                        </button>
                        {showDropdown && (
                            <select onChange={handleSelectCurrency}>
                                {api.items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.baseName} to {item.targetName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="get">
                        <label className="form-label" htmlFor="you-get">دریافت میکنم</label>
                        <div className="user-output">
                            <input type="text" readOnly defaultValue='' value={selectedCurrency?.lastAvg && !isNaN(parseInt(ask)) ? (parseInt(ask) * selectedCurrency.lastAvg).toFixed(selectedCurrency?.targetPrecision) : ''} maxLength={18} />
                            <button className="btn" type="button">
                                <span>{selectedCurrency?.targetLocalizedName}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
