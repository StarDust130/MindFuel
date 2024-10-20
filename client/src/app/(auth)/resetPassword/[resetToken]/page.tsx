export default function Page({ params }: { params: { resetToken: string } }) {
  return <div>resetToken: {params.resetToken}</div>;
}


