import { getPortfolioData } from "@/lib/portfolioData";
import ClientHome from "@/components/ClientHome";

export default async function Home() {
  const data = await getPortfolioData();

  return <ClientHome data={data} />;
}
