import { useState, useEffect } from "react";
import "./Calculator.css";

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

type Data = {
	items: Rate[];
};

export function Calculator() {
	const [ask, setAsk] = useState<string>("");
	const [data, setData] = useState<Data | null>(null);
	const [selectedCurrency, setSelectedCurrency] = useState<Rate | null>(null);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	useEffect(() => {
		fetch("https://api-v2.sarafi.io/api/market/list")
			.then((response) => response.json())
			.then((data) => {
				if (data?.items && data.items.length > 0) {
					setSelectedCurrency(data.items[0]);
					setData(data);
				}
			});
		console.log("done!");
	}, []);

	const handleSelectCurrency = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const selected = data
			? data.items.find((item) => item.id === event.target.value)
			: null;
		if (selected) {
			setSelectedCurrency(selected);
		}
		setShowDropdown(false);
	};

	return (
		<div className="container">
			<form className="whole-card" name="card">
				<div className="pay">
					<label className="form-label" htmlFor="ask-amount">
						پرداخت میکنم
					</label>
					<div className="user-input">
						<input
							defaultValue={ask}
							onChange={(e) => setAsk(e.target.value)}
							type="number"
							id="ask-amount"
							name="ask-amount"
							maxLength={18}
						/>
						<button
							type="button"
							className="btn"
							onClick={() => setShowDropdown(!showDropdown)}
						>
							<span>{selectedCurrency?.baseLocalizedName}</span>
						</button>
						{showDropdown && data && (
							<select onChange={handleSelectCurrency}>
								{data.items.map((item) => (
									<option key={item.id} value={item.id}>
										{item.baseName} to {item.targetName}
									</option>
								))}
							</select>
						)}
					</div>
				</div>
				<div className="get">
					<label className="form-label" htmlFor="you-get">
						دریافت میکنم
					</label>
					<div className="user-output">
						<input
							type="text"
							readOnly
							defaultValue=""
							value={
								selectedCurrency?.lastAvg && !Number.isNaN(parseFloat(ask))
									? (parseFloat(ask) * selectedCurrency.lastAvg).toFixed(
											selectedCurrency?.targetPrecision,
									  )
									: ""
							}
							maxLength={18}
						/>
						<button className="btn" type="button">
							<span>{selectedCurrency?.targetLocalizedName}</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
