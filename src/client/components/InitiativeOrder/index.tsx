import React, {
  useState,
  useEffect,
  StatelessComponent,
  ChangeEvent,
} from 'react'

import classNames from 'classnames'

import ParticipantInput from './ParticipantInput'

import './_style.scss'

export interface Participant {
  name: string
  initiative: number
}

export const InitiativeOrder: StatelessComponent = () => {
  const newParticipantObject = {
    name: '',
    initiative: NaN,
  }

  const [participants, setParticipants] = useState<Participant[]>([
    newParticipantObject,
  ])
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [activeParticipant, setActiveParticipant] = useState<number>(0)

  const addParticipant = (): void => {
    // Deep copy array to avoid unwanted mutations
    const newParticipants = JSON.parse(JSON.stringify(participants))

    newParticipants.push(newParticipantObject)

    setParticipants(newParticipants)
  }

  const removeParticipant = (index: number): void => {
    // Deep copy array to avoid unwanted mutations
    const newParticipants = JSON.parse(JSON.stringify(participants))
    newParticipants.splice(index, 1)

    setParticipants(newParticipants)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { name, value },
    } = event
    // Deep copy array to avoid unwanted mutations
    const newParticipants = JSON.parse(JSON.stringify(participants))

    const nameParts = name.split('-')
    const index = nameParts[0]
    const key = nameParts[2]

    if (index && key) {
      const participantObject = newParticipants[index]

      participantObject[key] = key === 'initiative' ? parseInt(value) : value
      newParticipants[index] = participantObject

      setParticipants(newParticipants)
    }
  }

  const handleBattleStart = (): void => {
    // Deep copy array to avoid unwanted mutations
    const newParticipants: Participant[] = JSON.parse(
      JSON.stringify(participants)
    )
    const validParticipants = newParticipants.filter(
      ({ name, initiative }) => name && (initiative || initiative === 0)
    )
    const sortedParticipants = validParticipants.sort(
      ({ initiative: initiative1 }, { initiative: initiative2 }) =>
        initiative2 - initiative1
    )

    if (sortedParticipants.length >= 2) {
      setParticipants(sortedParticipants)
      setActiveParticipant(0)
      setIsSubmitted(true)
    }
  }

  const setNextParticipantAsActive = (): void => {
    const proposedNextParticipant = activeParticipant + 1
    const nextActiveParticipant =
      proposedNextParticipant === participants.length
        ? 0
        : proposedNextParticipant

    setActiveParticipant(nextActiveParticipant)
  }

  return (
    <div className="participants">
      <div className="participants__controls">
        {!isSubmitted ? (
          <button
            onClick={handleBattleStart}
            className={classNames('participants__controls__button')}
          >
            To battle!
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsSubmitted(false)}
              className={classNames('participants__controls__button')}
            >
              Edit
            </button>
            <button
              onClick={setNextParticipantAsActive}
              className={classNames(
                'participants__controls__button',
                'participants__controls__button--next'
              )}
            >
              Next
            </button>
          </>
        )}
      </div>
      <div className="participants__list">
        {participants.map(({ name, initiative }, index) => (
          <ParticipantInput
            name={name}
            initiative={initiative}
            index={index}
            isLast={participants.length === index + 1}
            isPreview={isSubmitted}
            isActive={index === activeParticipant}
            onInputChange={handleInputChange}
            onAddClick={addParticipant}
            onRemoveClick={removeParticipant}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
