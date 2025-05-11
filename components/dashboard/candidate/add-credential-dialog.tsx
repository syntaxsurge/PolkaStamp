'use client'

import * as React from 'react'

import { KeyRound } from 'lucide-react'

import AddCredentialForm from '@/app/(dashboard)/candidate/credentials/add/add-credential-form'
import { AppModal } from '@/components/ui/app-modal'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { AddCredentialDialogProps } from '@/lib/types/components'

/**
 * Renders an "Add Credential” button that opens a modal with the full
 * AddCredentialForm. If the user lacks a team DID, a blocking modal
 * prompts them to create one instead of showing the form.
 */
export default function AddCredentialDialog({
  addCredentialAction,
  hasDid,
}: AddCredentialDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [showDidModal, setShowDidModal] = React.useState(false)

  function handleClick() {
    if (hasDid) {
      setOpen(true)
    } else {
      setShowDidModal(true)
    }
  }

  return (
    <>
      <Button size='sm' onClick={handleClick}>
        Add Credential
      </Button>

      {/* Credential form dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-xl'>
          <DialogHeader>
            <DialogTitle>New Credential</DialogTitle>
          </DialogHeader>
          <AddCredentialForm addCredentialAction={addCredentialAction} />
        </DialogContent>
      </Dialog>

      {/* DID requirement modal */}
      {showDidModal && !hasDid && (
        <AppModal
          icon={KeyRound}
          title='DID Required'
          description='You need to create a Decentralised Identifier (DID) for your team before adding credentials.'
          buttonText='Create DID'
          redirectTo='/candidate/create-did'
          required
        />
      )}
    </>
  )
}
