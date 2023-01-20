import React from 'react'

const JournalImages = ({props}) => {
    const image = props
    console.log(image)
    return (
        <div>
            {image.map((elem) => {
                return (
                    <img src={elem}/>
                )
            })}
        </div>
  )
}

export default JournalImages