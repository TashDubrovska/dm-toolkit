import React, { useState, StatelessComponent, ChangeEvent } from 'react'

interface Participant {
  name: string
  initiative: number
}

const Result: StatelessComponent<{ participants: Participant[] }> = ({
  participants,
}) => {
  const cleanParticipants = participants.filter(
    ({ name, initiative }) => name && (initiative || initiative === 0)
  )
  const sortedParticipants = cleanParticipants.sort(
    ({ initiative: initiative1 }, { initiative: initiative2 }) =>
      initiative2 - initiative1
  )

  const [renderedParticipants, setRenderedParticipants] = useState<
    Participant[]
  >(sortedParticipants)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Initiative</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {renderedParticipants.map(({ name, initiative }, index) => (
          <tr key={index}>
            <th>{name}</th>
            <td>{initiative}</td>
            <td>
              <button
                onClick={(): void => {
                  const newRenderedParticipants: Participant[] = JSON.parse(
                    JSON.stringify(renderedParticipants)
                  )
                  newRenderedParticipants.splice(index, 1)

                  setRenderedParticipants(newRenderedParticipants)
                }}
              >
                Kill!
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const ParticipantInput: StatelessComponent<{
  name: string
  initiative: number
  index: number
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}> = ({ name, initiative, index, onInputChange }) => {
  const sharedId = `${index}-participant`

  return (
    <div className="participant">
      <label className="participant__label" htmlFor={`${sharedId}-name`}>
        Name
      </label>
      <input
        className="participant__input"
        type="text"
        name={`${sharedId}-name`}
        id={`${sharedId}-name`}
        onInput={onInputChange}
        value={name}
      />

      <label className="participant__label" htmlFor={`${sharedId}-initiative`}>
        Initiative
      </label>
      <input
        className="participant__input"
        type="text"
        name={`${sharedId}-initiative`}
        id={`${sharedId}-initiative`}
        onInput={onInputChange}
        value={initiative || ''}
      />
    </div>
  )
}

export default () => {
  const newParticipantObject = {
    name: '',
    initiative: NaN,
  }

  const [participants, setParticipants] = useState<Participant[]>([
    newParticipantObject,
  ])
  const [isSubmitted, setIsSubmitted] = useState<Boolean>(false)

  const addParticipant = () => {
    const newParticipants = JSON.parse(JSON.stringify(participants))

    newParticipants.push(newParticipantObject)

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

  return (
    <div className="participants">
      {!isSubmitted ? (
        <>
          {participants.map(({ name, initiative }, index) => (
            <ParticipantInput
              name={name}
              initiative={initiative}
              index={index}
              onInputChange={handleInputChange}
              key={index}
            />
          ))}
          <button onClick={addParticipant}>Another!</button>
          <button onClick={() => setIsSubmitted(true)}>To battle</button>
        </>
      ) : (
        <Result participants={participants} />
      )}
    </div>
  )
}
