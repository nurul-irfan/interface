import React, { useCallback, useEffect, useState } from 'react'
import { RecipientSelect } from 'src/components/RecipientSelect/RecipientSelect'
import { SEND_CONTENT_RENDER_DELAY_MS } from 'src/features/send/constants'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { TransactionModalInnerContainer } from 'uniswap/src/features/transactions/TransactionModal/TransactionModal'
import { useTransactionModalContext } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext'
import { useSendContext } from 'wallet/src/features/transactions/contexts/SendContext'

// We add a short hardcoded delay to allow the sheet to animate quickly both on first render and when going back from Review -> Form.
export function SendRecipientSelectFullScreen(): JSX.Element {
  const [hideContent, setHideContent] = useState(true)
  useEffect(() => {
    setTimeout(() => setHideContent(false), SEND_CONTENT_RENDER_DELAY_MS)
  }, [])

  return <SendRecipientSelectFullScreenContent hideContent={hideContent} />
}

function SendRecipientSelectFullScreenContent({ hideContent }: { hideContent: boolean }): JSX.Element {
  const { bottomSheetViewStyles } = useTransactionModalContext()
  const { showRecipientSelector, recipient, derivedSendInfo, updateSendForm } = useSendContext()

  const onSelectRecipient = useCallback(
    (newRecipient: string) => {
      updateSendForm({ recipient: newRecipient, showRecipientSelector: false })
    },
    [updateSendForm],
  )

  const onHideRecipientSelector = useCallback(() => {
    updateSendForm({ showRecipientSelector: false })
  }, [updateSendForm])

  return (
    <TransactionModalInnerContainer fullscreen bottomSheetViewStyles={[bottomSheetViewStyles]}>
      {!hideContent && (
        <RecipientSelect
          chainId={derivedSendInfo.chainId as UniverseChainId}
          focusInput={showRecipientSelector}
          recipient={recipient}
          onHideRecipientSelector={onHideRecipientSelector}
          onSelectRecipient={onSelectRecipient}
        />
      )}
    </TransactionModalInnerContainer>
  )
}