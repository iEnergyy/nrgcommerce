// Currency utility functions for analytics

export function getCurrencySymbol(code: string): string {
  const symbols: Record<string, string> = {
    usd: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    cad: 'C$',
    aud: 'A$',
    chf: 'CHF',
    cny: '¥',
    sek: 'kr',
    nok: 'kr',
    dkk: 'kr',
    pln: 'zł',
    czk: 'Kč',
    huf: 'Ft',
    ron: 'lei',
    bgn: 'лв',
    hrk: 'kn',
    rsd: 'дин',
    mkd: 'ден',
    dop: 'RD$',  // Dominican Peso
    all: 'All'
  }

  return symbols[code.toLowerCase()] || code.toUpperCase()
}

export function formatCurrency(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency)
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)

  return `${symbol}${formattedAmount}`
}

export function aggregateByCurrency<T extends Record<string, any>>(
  items: T[],
  amountField: keyof T,
  currencyField: keyof T = 'currency_code' as keyof T
): Record<string, number> {
  const result: Record<string, number> = {}

  items.forEach(item => {
    const currency = item[currencyField] as string
    const amount = item[amountField] as number

    if (currency && amount) {
      result[currency] = (result[currency] || 0) + amount
    }
  })

  return result
}

export function getCurrencyBreakdown(
  data: Record<string, number>,
  selectedCurrency: string = 'all'
): { currency: string; amount: number; formatted: string }[] {
  if (selectedCurrency === 'all') {
    return Object.entries(data).map(([currency, amount]) => ({
      currency,
      amount,
      formatted: formatCurrency(amount, currency)
    }))
  }

  if (data[selectedCurrency]) {
    return [{
      currency: selectedCurrency,
      amount: data[selectedCurrency],
      formatted: formatCurrency(data[selectedCurrency], selectedCurrency)
    }]
  }

  return []
}

export async function getStoreCurrencies(storeService: any): Promise<string[]> {
  try {
    const stores = await storeService.listStores()
    if (stores.length > 0 && stores[0].supported_currencies) {
      return stores[0].supported_currencies.map((curr: any) => curr.currency_code)
    }
    return ['usd'] // fallback
  } catch (error) {
    console.error('Error fetching store currencies:', error)
    return ['usd'] // fallback
  }
}

export function calculateGrowthRate(
  current: Record<string, number>,
  previous: Record<string, number>
): Record<string, number> {
  const growth: Record<string, number> = {}

  Object.keys(current).forEach(currency => {
    const currentValue = current[currency] || 0
    const previousValue = previous[currency] || 0

    if (previousValue > 0) {
      growth[currency] = ((currentValue - previousValue) / previousValue) * 100
    } else {
      growth[currency] = currentValue > 0 ? 100 : 0
    }
  })

  return growth
}

