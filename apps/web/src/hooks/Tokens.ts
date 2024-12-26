import { Currency, Token } from '@uniswap/sdk-core'
import { NATIVE_CHAIN_ID } from 'constants/tokens'
import { useAccount } from 'hooks/useAccount'
import { useMemo } from 'react'
import { COMMON_BASES } from 'uniswap/src/constants/routing'
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo'
import { useSupportedChainId } from 'uniswap/src/features/chains/hooks/useSupportedChainId'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types'
import { useCurrencyInfo as useUniswapCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo'
import { buildCurrencyId } from 'uniswap/src/utils/currencyId'
import { isAddress, isSameAddress } from 'utilities/src/addresses'

type Maybe<T> = T | undefined

export function useCurrency(address?: string, chainId?: UniverseChainId, skip?: boolean): Maybe<Currency> {
  const currencyInfo = useCurrencyInfo(address, chainId, skip)
  return currencyInfo?.currency
}

/**
 * @deprecated useCurrencyInfo from packages/uniswap instead
 * Returns a CurrencyInfo from the tokenAddress+chainId pair.
 */
export function useCurrencyInfo(currency?: Currency, chainId?: UniverseChainId, skip?: boolean): Maybe<CurrencyInfo>
export function useCurrencyInfo(address?: string, chainId?: UniverseChainId, skip?: boolean): Maybe<CurrencyInfo>
export function useCurrencyInfo(
  addressOrCurrency?: string | Currency,
  chainId?: UniverseChainId,
  skip?: boolean,
): Maybe<CurrencyInfo> {
  const { chainId: connectedChainId } = useAccount()
  const chainIdWithFallback =
    (typeof addressOrCurrency === 'string' ? chainId : addressOrCurrency?.chainId) ?? connectedChainId
  const supportedChainId = useSupportedChainId(chainIdWithFallback)
  const nativeAddressWithFallback = getChainInfo(supportedChainId ?? UniverseChainId.Mainnet).nativeCurrency.address

  const isNative = useMemo(() => checkIsNative(addressOrCurrency), [addressOrCurrency])
  const address = useMemo(
    () => getAddress(isNative, nativeAddressWithFallback, addressOrCurrency),
    [isNative, nativeAddressWithFallback, addressOrCurrency],
  )

  const addressWithFallback = isNative || !address ? nativeAddressWithFallback : address

  const currencyId = buildCurrencyId(supportedChainId ?? UniverseChainId.Mainnet, addressWithFallback)
  const currencyInfo = useUniswapCurrencyInfo(currencyId, { skip })

  return useMemo(() => {
    const commonBase = getCommonBase(chainIdWithFallback, isNative, address)

    if (commonBase) {
      // Related to TODO(WEB-5111)
      // Some common base images are broken so this'll ensure we read from uniswap images
      if (currencyInfo?.logoUrl) {
        commonBase.logoUrl = currencyInfo.logoUrl
      }

      return commonBase
    }

    if (!currencyInfo || !addressOrCurrency || skip) {
      return undefined
    }

    return currencyInfo
  }, [addressOrCurrency, currencyInfo, chainIdWithFallback, isNative, address, skip])
}

export const checkIsNative = (addressOrCurrency?: string | Currency): boolean => {
  return typeof addressOrCurrency === 'string'
    ? [NATIVE_CHAIN_ID, 'native', 'eth'].includes(addressOrCurrency.toLowerCase())
    : addressOrCurrency?.isNative ?? false
}

const getCommonBase = (chainId?: number, isNative?: boolean, address?: string): CurrencyInfo | undefined => {
  if (!address || !chainId) {
    return undefined
  }
  return COMMON_BASES[chainId]?.find(
    (base) =>
      (base.currency.isNative && isNative) || (base.currency.isToken && isSameAddress(base.currency.address, address)),
  )
}

const getAddress = (
  isNative: boolean,
  nativeAddressWithFallback: string,
  addressOrCurrency?: string | Currency,
): string | undefined => {
  if (typeof addressOrCurrency === 'string') {
    if (isNative) {
      return nativeAddressWithFallback
    } else {
      return addressOrCurrency
    }
  }

  if (addressOrCurrency) {
    if (addressOrCurrency.isNative) {
      return nativeAddressWithFallback
    } else if (addressOrCurrency) {
      return addressOrCurrency.address
    }
  }

  return undefined
}

export function useToken(tokenAddress?: string, chainId?: UniverseChainId): Maybe<Token> {
  const formattedAddress = isAddress(tokenAddress)
  const { chainId: connectedChainId } = useAccount()
  const currency = useCurrency(formattedAddress ? formattedAddress : undefined, chainId ?? connectedChainId)

  return useMemo(() => {
    if (currency && currency.isToken) {
      return currency
    }
    return undefined
  }, [currency])
}