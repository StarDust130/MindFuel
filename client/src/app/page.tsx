export default async function Home() {
  const res = await fetch("http://localhost:3001");
  const data = await res.text();
  console.log(data);
  

  return <div>{data}</div>;
}
