import { json } from "stream/consumers";

export interface PriceData {
    price: number;
    time: string;
}

export interface TradingPair {
    id: string;
    base_currency: string;
    quote_currency: string;
    quote_increment: string;
    base_increment: string;
    display_name: string;
    min_market_funds: string;
    margin_enabled: boolean;
    post_only: boolean;
    limit_only: boolean;
    cancel_only: boolean;
    status: string;
    status_message: string;
    trading_disabled: boolean;
    fx_stablecoin: boolean;
    max_slippage_percentage: string;
    auction_mode: boolean;
    high_bid_limit_percentage: string;
}

class APIService {
    /**
     * 
     * @param numberOfDays range of days to check for price, from today to the past selected day
     * @returns price history data of bitcoin
     */
    async getBTCPrice(product: string, numberOfDays: string): Promise<PriceData[]> {
        const res = await fetch('https://api.coinbase.com/v2/prices/' + product + '/historic?days=' + numberOfDays);
        const jsonData = await res.json();

        // Extract the prices array from the API response
        const pricesArray: any[] = jsonData.data.prices;

        // Map and transform the data to conform to the PriceData interface
        const formattedData: PriceData[] = pricesArray.map((item: any) => ({
            price: parseFloat(item.price), // Convert the price from string to number
            time: this.formatTimestamp(item.time), // Format the timestamp to a readable date
        }));
        //the data received from the API was formatted recent to old.
        formattedData.sort((a, b) => a.time.localeCompare(b.time));

        return formattedData;
    }

    async fetchProducts(): Promise<TradingPair[]> {
        const res = await fetch('https://api.exchange.coinbase.com/products');
        const jsonData = await res.json();

        // Extract the prices array from the API response
        const productsArray: any[] = jsonData;

        return productsArray;
    }

    // Helper function to format Unix timestamp to a readable date
    formatTimestamp(timestamp: string): string {
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleString();
    }


}


export default APIService;