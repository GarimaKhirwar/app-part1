const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Content = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => 
    sum + part.exercises, 0);
  return (
    <div>
      <Header course={course}/>
      {course.parts.map((singlePart) => (
        <Content key={singlePart.id} part={singlePart} />
      ))}
      <p><strong>total of {totalExercises} exercises</strong></p>
    </div>
  );
};

export default Course
