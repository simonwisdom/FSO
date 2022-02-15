import React from 'react';

const Course = ({course}) => {

    const exerciseSum = course.parts.reduce(function(sum, part) {
      return sum + part.exercises
    }, 0)

    return (
    <>
    <h1>{course.name}</h1>
    {course.parts.map(part =>
      <p key={part.id}>{part.name} {part.exercises}</p>
    )}

    <span style={{fontWeight: "bold"}}>total of {exerciseSum} exercises</span>
    </>
    )
  }

  export default Course
