import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter();
  return <div>Produto {JSON.stringify(query)}</div>;
}
