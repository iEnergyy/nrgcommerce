import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import BankTransferService from "./service"

const services = [BankTransferService]

export default ModuleProvider(Modules.PAYMENT, {
  services,
})
