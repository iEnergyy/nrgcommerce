import bankAccountsConfig from './bank-accounts.config.json'

export interface BankAccount {
  id: string
  bankName: string
  accountName: string
  accountNumber: string
  routingNumber: string
  swiftCode: string
  currency: string
  address: string
}

export interface BankTransferConfig {
  bankAccounts: BankAccount[]
}

export const getBankTransferConfig = (): BankTransferConfig => {
  return bankAccountsConfig as BankTransferConfig
}

export const getBankAccountById = (id: string): BankAccount | undefined => {
  const config = getBankTransferConfig()
  return config.bankAccounts.find(account => account.id === id)
}

export const getBankAccountsByCurrency = (currency: string): BankAccount[] => {
  const config = getBankTransferConfig()
  return config.bankAccounts.filter(account => account.currency === currency)
}
