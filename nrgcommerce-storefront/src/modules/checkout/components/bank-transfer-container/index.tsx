"use client"

import { RadioGroupOption } from "@headlessui/react"
import { paymentInfoMap } from "@lib/constants"
import { Text, clx } from "@medusajs/ui"
import Radio from "@modules/common/components/radio"
import { useState } from "react"

type BankAccount = {
  id: string
  bankName: string
  accountName: string
  accountNumber: string
  routingNumber: string
  swiftCode: string
  currency: string
  address: string
}

type BankTransferContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string
  paymentInfoMap: Record<string, { title: string; icon: React.JSX.Element }>
  disabled?: boolean
  onBankAccountSelect?: (bankAccountId: string) => void
}

// Mock bank accounts - in a real implementation, this would come from the backend
const mockBankAccounts: BankAccount[] = [
  {
    id: "bank-1",
    bankName: "First National Bank",
    accountName: "NRG Commerce LLC",
    accountNumber: "1234567890",
    routingNumber: "123456789",
    swiftCode: "FNBKUS33",
    currency: "USD",
    address: "123 Main Street, New York, NY 10001"
  },
  {
    id: "bank-2", 
    bankName: "Chase Bank",
    accountName: "NRG Commerce LLC",
    accountNumber: "9876543210",
    routingNumber: "987654321",
    swiftCode: "CHASUS33",
    currency: "USD",
    address: "456 Business Ave, Los Angeles, CA 90210"
  },
  {
    id: "bank-3",
    bankName: "Wells Fargo",
    accountName: "NRG Commerce LLC", 
    accountNumber: "5555666677",
    routingNumber: "555566667",
    swiftCode: "WFBIUS6S",
    currency: "USD",
    address: "789 Corporate Blvd, Chicago, IL 60601"
  }
]

const BankTransferContainer: React.FC<BankTransferContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  onBankAccountSelect,
}) => {
  const [selectedBankAccount, setSelectedBankAccount] = useState<string>("")

  const isSelected = selectedPaymentOptionId === paymentProviderId

  const handleBankAccountChange = (bankAccountId: string) => {
    setSelectedBankAccount(bankAccountId)
    if (onBankAccountSelect) {
      onBankAccountSelect(bankAccountId)
    }
  }

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "flex flex-col gap-y-4 text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
        {
          "border-ui-border-interactive": isSelected,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Radio checked={isSelected} />
          <Text className="text-base-regular">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </Text>
        </div>
        <span className="justify-self-end text-ui-fg-base">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>

      {isSelected && (
        <div className="ml-6 space-y-4">
          <div>
            <Text className="text-small-regular text-ui-fg-subtle mb-2">
              Select Bank Account:
            </Text>
            <select
              value={selectedBankAccount}
              onChange={(e) => handleBankAccountChange(e.target.value)}
              className="w-full p-2 border border-ui-border-base rounded-rounded"
            >
              <option value="">Choose a bank account</option>
              {mockBankAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.bankName} - {account.accountNumber}
                </option>
              ))}
            </select>
          </div>

          {selectedBankAccount && (
            <div className="bg-ui-bg-subtle p-4 rounded-rounded">
              <Text className="text-small-regular font-medium mb-2">
                Bank Transfer Details:
              </Text>
              {(() => {
                const account = mockBankAccounts.find(acc => acc.id === selectedBankAccount)
                if (!account) return null
                
                return (
                  <div className="space-y-1 text-small-regular">
                    <div><strong>Bank:</strong> {account.bankName}</div>
                    <div><strong>Account Name:</strong> {account.accountName}</div>
                    <div><strong>Account Number:</strong> {account.accountNumber}</div>
                    <div><strong>Routing Number:</strong> {account.routingNumber}</div>
                    <div><strong>SWIFT Code:</strong> {account.swiftCode}</div>
                    <div><strong>Address:</strong> {account.address}</div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      )}
    </RadioGroupOption>
  )
}

export default BankTransferContainer
