'use client'

import { useState, useTransition } from 'react'

import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { toast } from 'sonner'

import { updateCandidateStageAction } from '@/app/(dashboard)/recruiter/pipelines/actions'
import { STAGES } from '@/lib/constants/recruiter'
import type { PipelineCandidateCard, PipelineBoardProps } from '@/lib/types/components'
import { Stage } from '@/lib/types/recruiter'

import CandidateCard from './candidate-card'

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

/**
 * Responsive drag-and-drop Kanban board for recruiter pipelines.
 */
export default function PipelineBoard({
  pipelineId: _pipelineId,
  initialData,
}: PipelineBoardProps) {
  const [columns, setColumns] = useState<Record<Stage, PipelineCandidateCard[]>>(initialData)
  const [_isPending, startTransition] = useTransition()

  /* --------------------------- Persist move --------------------------- */
  function persistMove(id: number, newStage: Stage) {
    startTransition(async () => {
      const fd = new FormData()
      fd.append('pipelineCandidateId', String(id))
      fd.append('stage', newStage)
      const res = await updateCandidateStageAction({}, fd)
      if (res?.error) toast.error(res.error)
    })
  }

  /* --------------------------- Drag handler --------------------------- */
  function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result
    if (!destination) return

    const from = source.droppableId as Stage
    const to = destination.droppableId as Stage
    if (from === to && destination.index === source.index) return

    const moving = columns[from].find((c) => String(c.id) === draggableId)
    if (!moving) return

    /* Update UI */
    setColumns((prev) => {
      const next: Record<Stage, PipelineCandidateCard[]> = { ...prev }
      next[from] = [...next[from]]
      next[to] = [...next[to]]
      next[from].splice(source.index, 1)
      next[to].splice(destination.index, 0, { ...moving, stage: to })
      return next
    })

    /* Persist */
    persistMove(moving.id, to)
  }

  /* ------------------------------ View ------------------------------ */
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='grid gap-6 md:grid-cols-4'>
        {STAGES.map((stage) => {
          const items = columns[stage]
          return (
            <Droppable key={stage} droppableId={stage}>
              {(prov, snapshot) => (
                <div
                  ref={prov.innerRef}
                  {...prov.droppableProps}
                  className={`flex max-h-[80vh] flex-col gap-3 overflow-y-auto rounded-lg border p-3 transition-colors ${
                    snapshot.isDraggingOver ? 'bg-primary/10 ring-primary ring-2' : 'bg-muted/30'
                  }`}
                >
                  {/* Column header */}
                  <h3 className='mb-1 flex items-center justify-between text-sm font-semibold capitalize'>
                    {stage}
                    <span className='bg-background rounded-full px-2 py-0.5 text-xs'>
                      {items.length}
                    </span>
                  </h3>

                  {/* Cards */}
                  {items.length === 0 ? (
                    <p className='text-muted-foreground text-xs'>Empty</p>
                  ) : (
                    items.map((cand, idx) => (
                      <Draggable key={cand.id} draggableId={String(cand.id)} index={idx}>
                        {(dragProv, dragSnap) => (
                          <div
                            ref={dragProv.innerRef}
                            {...dragProv.draggableProps}
                            {...dragProv.dragHandleProps}
                            className={dragSnap.isDragging ? 'opacity-80' : ''}
                          >
                            <CandidateCard candidate={cand} />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {prov.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
    </DragDropContext>
  )
}
