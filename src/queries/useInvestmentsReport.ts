import { useQuery } from "@tanstack/react-query";
import { getNeighborhoodSize } from "../getNeighborhoodSize";
import getUpscaledRate from "../getUpscaleRate";
const useInvestmentsReport = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['investmentsReports'],
    queryFn: async () => {
      const response = await fetch('https://data.winnipeg.ca/resource/rwrz-d7hc.json?$select=capital_cost,neighbourhood&$where=capital_cost%20%3E%200%20AND%20neighbourhood%20IS%20NOT%20NULL&$limit=500000');
      const data = await response.json();
      const reportsPerDistrict: any = {};
      data.forEach((item: any) => {
        const district = item.neighbourhood.toUpperCase();
        if (!reportsPerDistrict[district]) {
          reportsPerDistrict[district] = 0;
        }
        reportsPerDistrict[district] += parseInt(item.capital_cost);
      });

      Object.entries(reportsPerDistrict).forEach(([district, investments]: any) => {
        reportsPerDistrict[district] = investments / getNeighborhoodSize(district);
      });

      return getUpscaledRate(reportsPerDistrict);
    }
  })

  return { reportsPerNeighborhood: data as Record<string, number>, isLoading, error };
}

export default useInvestmentsReport;
