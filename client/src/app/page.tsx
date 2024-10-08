import Header from "@/components/elements/Header";

export default async function Home() {
  const res = await fetch("http://localhost:3001");
  const data = await res.text();
  console.log(data);

  return (
    <>
      {" "}
      <Header />
      {data}
    </>
  );
}
