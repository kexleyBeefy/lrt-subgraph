import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import { Token } from "../../generated/schema"
import { EIGHTEEN_BI, ONE_ETH_BD, ONE_ETH_BI, TEN_BI, exponentToBigDecimal, exponentToBigInt } from "./decimal"

export function ppfsToShareRate(ppfs: BigInt, underlyingToken: Token): BigDecimal {
  // fast path for 18 decimals
  if (underlyingToken.decimals.equals(EIGHTEEN_BI)) {
    return ppfs.toBigDecimal().div(ONE_ETH_BD)
  }

  const divisor = exponentToBigDecimal(underlyingToken.decimals.plus(EIGHTEEN_BI))
  return ppfs.toBigDecimal().times(ONE_ETH_BD).div(divisor)
}

export function rawShareBalanceToRawUnderlyingBalance(ppfs: BigInt, rawSharesBalance: BigInt, underlyingToken: Token): BigInt {
  // fast path for 18 decimals
  if (underlyingToken.decimals.equals(EIGHTEEN_BI)) {
    return rawSharesBalance.times(ppfs).div(ONE_ETH_BI)
  }

  const divisor = exponentToBigInt(underlyingToken.decimals)
  return rawSharesBalance.times(ppfs).div(divisor)
}
