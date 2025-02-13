const Course = ({course}) => {
    return (
        <>
        <Header>{course.name}</Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
        </>
    );
}

const Header = (props) => <h2>{props.children}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map(p => <Part key={p.id} part={p} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, cur) => sum + cur.exercises, 0);

  console.log(total)
  return (
    <>
      <p><b>total of { total } excercies</b></p>
    </>
  )
}

export default Course;