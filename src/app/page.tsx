import { getPortfolioData } from "@/lib/portfolioData";
import ClientHome from "@/components/ClientHome";

export default function Home() {
  const data = getPortfolioData();

  return <ClientHome data={data} />;
}
