import React, { StatelessComponent, ChangeEvent } from 'react'
import classNames from 'classnames'

import plusSvg from '../../../common/icons/plus.svg'

import './_style.scss'

interface ParticipantInputProps {
  name: string
  initiative: number
  index: number
  isLast: boolean
  isPreview: boolean
  isActive: boolean
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onAddClick: () => void
  onRemoveClick: (index: number) => void
}

const ParticipantInput: StatelessComponent<ParticipantInputProps> = ({
  name,
  initiative,
  index,
  isLast,
  isPreview,
  isActive,
  onInputChange,
  onAddClick,
  onRemoveClick,
}) => {
  const sharedId = `${index}-participant`
  const initiativeValue = initiative || initiative === 0 ? initiative : ''
  const isOdd = (index + 1) % 2
  const isLastNonPreview = !isPreview && isLast

  return (
    <div
      className={classNames({
        participant: true,
        'participant--odd': isOdd && (!isActive || !isPreview),
        'participant--active': isActive && isPreview,
      })}
    >
      <input
        className={classNames('participant__input', 'participant__input--name')}
        type="text"
        name={`${sharedId}-name`}
        onInput={onInputChange}
        value={name}
        aria-label="Name"
        autoComplete="false"
        readOnly={isPreview}
        placeholder="Name"
      />

      <input
        className={classNames(
          'participant__input',
          'participant__input--initiative'
        )}
        type="text"
        name={`${sharedId}-initiative`}
        onInput={onInputChange}
        value={initiativeValue}
        aria-label="Initiative"
        autoComplete="false"
        readOnly={isPreview}
        placeholder="0"
      />

      <button
        onClick={() => (isLastNonPreview ? onAddClick() : onRemoveClick(index))}
        className={classNames({
          participant__button: true,
          'participant__button--remove': !isLastNonPreview,
        })}
        aria-label={isLastNonPreview ? 'Add' : `Remove ${name}`}
      >
        <img src={plusSvg} alt="" />
      </button>
    </div>
  )
}

export default ParticipantInput
