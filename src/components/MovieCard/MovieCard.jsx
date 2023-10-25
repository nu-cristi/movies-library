export default function MovieCard({props}) {
  console.log(props)
  return (
    <div>
      <div>
        <img />
      </div>
      <div>
        <h1>{props.title}</h1>
        <h3>{props.release_date}</h3>
        <div>+</div>
      </div>
    </div>
  );
}
