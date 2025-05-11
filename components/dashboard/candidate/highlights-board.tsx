'use client'

import { useState, useTransition } from 'react'

import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { GripVertical, Loader2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

import { saveHighlightsAction } from '@/app/(dashboard)/candidate/highlights/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { HighlightCredential, HighlightsBoardProps } from '@/lib/types/components'

/* -------------------------------------------------------------------------- */
/*                         Utility - reorder helper                           */
/* -------------------------------------------------------------------------- */

function reorder<T>(list: T[], startIdx: number, endIdx: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIdx, 1)
  result.splice(endIdx, 0, removed)
  return result
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function HighlightsBoard({
  selectedExperience,
  selectedProject,
  available,
}: HighlightsBoardProps) {
  const [exp, setExp] = useState<HighlightCredential[]>(selectedExperience)
  const [proj, setProj] = useState<HighlightCredential[]>(selectedProject)
  const [pool, setPool] = useState<HighlightCredential[]>(available)

  const [isPending, startTransition] = useTransition()

  /* ---------------------------------------------------------------------- */
  /*                        Drag-and-drop handlers                           */
  /* ---------------------------------------------------------------------- */
  function onDragEnd(result: DropResult) {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    /* Helpers to get state & setter by droppableId */
    const getList = (id: string) => (id === 'experience' ? exp : id === 'project' ? proj : pool)
    const setList = (id: string) =>
      id === 'experience' ? setExp : id === 'project' ? setProj : setPool

    const srcList = getList(source.droppableId)
    const destList = getList(destination.droppableId)
    const moved = srcList[source.index]

    /* ------------------ Category validation ------------------- */
    const destIsExperience = destination.droppableId === 'experience'
    const destIsProject = destination.droppableId === 'project'

    const categoryMismatch =
      (destIsExperience && moved.category !== 'EXPERIENCE') ||
      (destIsProject && moved.category !== 'PROJECT')

    if (categoryMismatch) {
      toast.error(
        `Only ${destIsExperience ? 'Experience' : 'Project'} credentials can be placed here.`,
      )
      return // keep original lists so the item snaps back
    }

    /* ------------------- Same column reorder ------------------ */
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(srcList, source.index, destination.index)
      setList(source.droppableId)(reordered)
      return
    }

    /* -------------------- Cross-column move -------------------- */
    const nextSrc = Array.from(srcList)
    const [removed] = nextSrc.splice(source.index, 1)
    const nextDest = Array.from(destList)
    nextDest.splice(destination.index, 0, removed)

    setList(source.droppableId)(nextSrc)
    setList(destination.droppableId)(nextDest)
  }

  /* ---------------------------------------------------------------------- */
  /*                           Save to server                               */
  /* ---------------------------------------------------------------------- */
  function handleSave() {
    startTransition(async () => {
      const fd = new FormData()
      fd.append(
        'experience',
        exp
          .slice(0, 5)
          .map((c) => c.id)
          .join(','),
      )
      fd.append(
        'project',
        proj
          .slice(0, 5)
          .map((c) => c.id)
          .join(','),
      )
      const res = await saveHighlightsAction({}, fd)
      if (res?.error) toast.error(res.error)
      else toast.success(res?.success ?? 'Highlights saved.')
    })
  }

  /* ---------------------------------------------------------------------- */
  /*                              Renderer                                  */
  /* ---------------------------------------------------------------------- */

  function renderColumn(
    id: 'experience' | 'project' | 'pool',
    title: string,
    items: HighlightCredential[],
    max = 5,
  ) {
    const isPool = id === 'pool'
    return (
      <div className='space-y-3'>
        <h3 className='text-muted-foreground flex items-center gap-2 text-sm font-semibold uppercase'>
          {title}
          {!isPool && (
            <Badge variant='secondary' className='px-1.5 py-0.5'>
              {items.length}/{max}
            </Badge>
          )}
        </h3>

        <Droppable droppableId={id}>
          {(prov, snapshot) => (
            <div
              ref={prov.innerRef}
              {...prov.droppableProps}
              className={`flex min-h-[120px] flex-col gap-2 rounded-lg border p-3 ${
                snapshot.isDraggingOver ? 'bg-primary/10 ring-primary ring-2' : 'bg-muted/40'
              }`}
            >
              {items.length === 0 && (
                <p className='text-muted-foreground text-center text-xs'>
                  {isPool ? 'No more credentials.' : 'Drag items here.'}
                </p>
              )}

              {items.map((cred, idx) => (
                <Draggable
                  key={`${id}-${cred.id}`}
                  draggableId={`${id}-${cred.id}`}
                  index={idx}
                  isDragDisabled={!isPool && idx >= max}
                >
                  {(dragProv, dragSnap) => (
                    <Card
                      ref={dragProv.innerRef}
                      {...dragProv.draggableProps}
                      {...dragProv.dragHandleProps}
                      className={`bg-background flex gap-3 rounded-md border px-3 py-2 shadow-sm ${
                        dragSnap.isDragging ? 'opacity-80' : ''
                      }`}
                    >
                      {/* Drag handle */}
                      <GripVertical className='text-muted-foreground h-4 w-4 flex-shrink-0' />

                      {/* Content */}
                      <div className='min-w-0 flex-1 space-y-1'>
                        {/* Title row */}
                        <div className='flex items-center gap-2'>
                          <span className='truncate font-medium'>{cred.title}</span>

                          {/* File link icon next to title */}
                          {cred.fileUrl && (
                            <a
                              href={cred.fileUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex-shrink-0'
                            >
                              <ExternalLink className='text-muted-foreground hover:text-primary h-4 w-4' />
                            </a>
                          )}
                        </div>

                        {/* Category badge + type underneath */}
                        <div className='flex items-center gap-2'>
                          <Badge
                            variant='secondary'
                            className='flex-shrink-0 text-[10px] capitalize'
                          >
                            {cred.category.toLowerCase()}
                          </Badge>
                          <span className='text-muted-foreground truncate text-xs capitalize'>
                            {cred.type}
                          </span>
                        </div>
                      </div>

                      {/* "Extra” badge if over max items in selected column */}
                      {!isPool && idx >= max && (
                        <Badge variant='destructive' className='ml-2 h-4 flex-shrink-0 text-[10px]'>
                          Extra
                        </Badge>
                      )}
                    </Card>
                  )}
                </Draggable>
              ))}

              {prov.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid gap-6 md:grid-cols-3'>
          {renderColumn('experience', 'Experience', exp)}
          {renderColumn('project', 'Projects', proj)}
          {renderColumn('pool', 'Available', pool, Infinity)}
        </div>
      </DragDropContext>

      <div className='flex justify-start'>
        <Button onClick={handleSave} disabled={isPending} className='w-full md:w-max'>
          {isPending ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving…
            </>
          ) : (
            'Save Highlights'
          )}
        </Button>
      </div>
    </div>
  )
}
