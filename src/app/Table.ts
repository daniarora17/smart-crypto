export interface Table {
    name: string;
    position: number;
    buy: number;
    sell: number;
}

export const coinUrl: any = {
    buyucoin: 'https://www.buyucoin.com/api/v1/crypto',
    coinDelta: 'https://coindelta.com/api/v1/public/getticker/',
    zebPay: 'https://live.zebapi.com/api/v1/ticker?currencyCode=inr',
    unoCoin: 'https://www.unocoin.com/trade?all',
    koinex: 'https://koinex.in/api/ticker'
};
