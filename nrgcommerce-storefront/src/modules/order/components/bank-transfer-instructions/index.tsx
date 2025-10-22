"use client"

import { Text, Heading, Container } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

type BankTransferInstructionsProps = {
  order: HttpTypes.StoreOrder
}

// Mock bank accounts - in a real implementation, this would come from the backend
const mockBankAccounts = [
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

const BankTransferInstructions: React.FC<BankTransferInstructionsProps> = ({ order }) => {
  // In a real implementation, you would get the selected bank account from the order's payment data
  // For now, we'll use the first bank account as an example
  const selectedBankAccount = mockBankAccounts[0]

  return (
    <Container className="bg-ui-bg-subtle p-6 rounded-rounded">
      <Heading level="h3" className="text-lg font-semibold mb-4">
        Bank Transfer Payment Instructions
      </Heading>
      
      <div className="space-y-4">
        <div>
          <Text className="text-small-regular text-ui-fg-subtle mb-2">
            Please complete your payment by transferring the order amount to the following bank account:
          </Text>
        </div>

        <div className="bg-white p-4 rounded-rounded border">
          <Heading level="h4" className="text-base font-medium mb-3">
            Bank Account Details
          </Heading>
          <div className="space-y-2 text-small-regular">
            <div><strong>Bank Name:</strong> {selectedBankAccount.bankName}</div>
            <div><strong>Account Name:</strong> {selectedBankAccount.accountName}</div>
            <div><strong>Account Number:</strong> {selectedBankAccount.accountNumber}</div>
            <div><strong>Routing Number:</strong> {selectedBankAccount.routingNumber}</div>
            <div><strong>SWIFT Code:</strong> {selectedBankAccount.swiftCode}</div>
            <div><strong>Bank Address:</strong> {selectedBankAccount.address}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-rounded border">
          <Heading level="h4" className="text-base font-medium mb-3">
            Payment Details
          </Heading>
          <div className="space-y-2 text-small-regular">
            <div><strong>Order Number:</strong> {order.display_id}</div>
            <div><strong>Amount:</strong> {order.total && order.currency_code ? 
              `${order.currency_code.toUpperCase()} ${(order.total / 100).toFixed(2)}` : 
              'Amount not available'
            }</div>
            <div><strong>Reference:</strong> Order #{order.display_id}</div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-rounded">
          <Text className="text-small-regular text-amber-800">
            <strong>Important:</strong> Please include the order number ({order.display_id}) as a reference 
            in your bank transfer. This will help us identify your payment quickly.
          </Text>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-rounded">
          <Text className="text-small-regular text-blue-800">
            <strong>Processing Time:</strong> Your order will be processed within 1-2 business days 
            after we receive your bank transfer. You will receive an email confirmation once the payment 
            is verified and your order is being prepared for shipment.
          </Text>
        </div>

        <div>
          <Text className="text-small-regular text-ui-fg-subtle">
            If you have any questions about this payment method, please contact our customer service team.
          </Text>
        </div>
      </div>
    </Container>
  )
}

export default BankTransferInstructions
