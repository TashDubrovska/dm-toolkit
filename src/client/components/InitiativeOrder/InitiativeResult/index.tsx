import React, { useState, useEffect, StatelessComponent } from 'react'

import { Participant } from '..'

const InitiativeResult: StatelessComponent<{ participants: Participant[] }> = ({
  participants,
}) => {
  const [renderedParticipants, setRenderedParticipants] = useState<
    Participant[]
  >([])

  useEffect(() => {
    const cleanParticipants = participants.filter(
      ({ name, initiative }) => name && (initiative || initiative === 0)
    )
    const sortedParticipants = cleanParticipants.sort(
      ({ initiative: initiative1 }, { initiative: initiative2 }) =>
        initiative2 - initiative1
    )

    setRenderedParticipants(sortedParticipants)
  }, [])

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

export default InitiativeResult
